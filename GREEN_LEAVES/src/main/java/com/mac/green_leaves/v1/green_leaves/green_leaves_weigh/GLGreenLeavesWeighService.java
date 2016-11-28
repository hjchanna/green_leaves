/*
 *  GLGreenLeavesWeighService.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 20, 2016, 10:56:00 AM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_weigh;

import com.mac.green_leaves.v1.exception.EntityNotFoundException;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeighDetail;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeigh;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Mohan
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class GLGreenLeavesWeighService {

    private static final Integer branch = 1;

    @Autowired
    private GLGreenLeavesWeighRepository greenLeavesWeighRepository;

    @Autowired
    private GLGreenLeavesWeighDetailRepository greenLeavesWeighDetailRepository;

    public TGreenLeavesWeigh getSummary(Integer number) {
        List<TGreenLeavesWeigh> greenLeaveWeighs = greenLeavesWeighRepository.findByBranchAndNumber(branch, number);

        if (greenLeaveWeighs.isEmpty()) {
            throw new EntityNotFoundException("Green leaves receive information is not found for number " + number);
        }

        return greenLeaveWeighs.get(0);
    }

    @Transactional
    public TGreenLeavesWeigh saveSummary(TGreenLeavesWeigh greenLeaveWeigh) {
        //assume that the green leave weigh does not have weigh details
        if (greenLeaveWeigh.getIndexNo() != null) {
            greenLeaveWeigh = greenLeavesWeighRepository.getOne(greenLeaveWeigh.getIndexNo());
        } else {
            //branch
            greenLeaveWeigh.setBranch(branch);

            //generate new number
            Integer maxNumber = greenLeavesWeighRepository.getMaximumNumberByBranch(branch);
            if (maxNumber == null) {
                maxNumber = 0;
            }
            greenLeaveWeigh.setNumber(maxNumber + 1);
        }
        greenLeaveWeigh = validateWeighSummary(greenLeaveWeigh);

        //TODO:transaction
        return greenLeavesWeighRepository.save(greenLeaveWeigh);
    }

    @Transactional
    public TGreenLeavesWeighDetail insertWeigh(Integer weighIndexNo, TGreenLeavesWeighDetail greenLeaveWeighDetail) {
        //read and set weigh
        TGreenLeavesWeigh greenLeaveWeigh = greenLeavesWeighRepository.getOne(weighIndexNo);
        if (greenLeaveWeigh == null) {
            throw new EntityNotFoundException("Green leaves receive information is not found for index number " + weighIndexNo);
        }
        greenLeaveWeighDetail.setGreenLeavesWeigh(greenLeaveWeigh);

        //TODO:transaction
        //validate and save detail
        greenLeaveWeighDetail = validateWeighDetail(greenLeaveWeighDetail);
        greenLeaveWeighDetail = greenLeavesWeighDetailRepository.save(greenLeaveWeighDetail);

        //validate and save weigh
        validateWeighSummary(greenLeaveWeigh);
        greenLeavesWeighRepository.save(greenLeaveWeigh);

        return greenLeaveWeighDetail;
    }

    @Transactional
    public void deleteWeigh(Integer indexNo) {
        TGreenLeavesWeighDetail greenLeaveWeighDetail = greenLeavesWeighDetailRepository.getOne(indexNo);
        Integer greenLeaveWeighIndexNo = greenLeaveWeighDetail.getGreenLeavesWeigh().getIndexNo();


        TGreenLeavesWeigh greenLeaveWeigh = greenLeavesWeighRepository.getOne(greenLeaveWeighIndexNo);

        greenLeaveWeigh.getGreenLeaveWeighDetails().remove(greenLeaveWeighDetail);
        greenLeavesWeighDetailRepository.delete(greenLeaveWeighDetail);

        validateWeighSummary(greenLeaveWeigh);
        greenLeavesWeighRepository.save(greenLeaveWeigh);
    }

    //validations
    private TGreenLeavesWeighDetail validateWeighDetail(TGreenLeavesWeighDetail greenLeaveWeighDetail) {
        //nothing to do as detail validations
        return greenLeaveWeighDetail;
    }

    private TGreenLeavesWeigh validateWeighSummary(TGreenLeavesWeigh greenLeaveWeigh) {
        double normalTotalWeight = 0.0;
        double superTotalWeight = 0.0;

        int normalCrates = 0;
        int normalBags = 0;
        int normalPolyBags = 0;
        int superCrates = 0;
        int superBags = 0;
        int superPolyBags = 0;
        if (greenLeaveWeigh.getGreenLeaveWeighDetails() != null) {
            for (TGreenLeavesWeighDetail greenLeaveWeighDetail : greenLeaveWeigh.getGreenLeaveWeighDetails()) {
                if (greenLeaveWeighDetail.getType().equals("NORMAL")) {
                    normalTotalWeight += greenLeaveWeighDetail.getQuantity().doubleValue();

                    normalCrates += greenLeaveWeighDetail.getCrates();
                    normalBags += greenLeaveWeighDetail.getBags();
                    normalPolyBags += greenLeaveWeighDetail.getPolyBags();
                } else if (greenLeaveWeighDetail.getType().equals("SUPER")) {
                    superTotalWeight += greenLeaveWeighDetail.getQuantity().doubleValue();

                    superCrates += greenLeaveWeighDetail.getCrates();
                    superBags += greenLeaveWeighDetail.getBags();
                    superPolyBags += greenLeaveWeighDetail.getPolyBags();
                }
            }
        }
        greenLeaveWeigh.setNormalTotalWeight(BigDecimal.valueOf(normalTotalWeight));
        greenLeaveWeigh.setSuperTotalWeight(BigDecimal.valueOf(superTotalWeight));
        //deductions

        //general deduction
        greenLeaveWeigh.setNormalGeneralDeduction(BigDecimal.valueOf(
                (int) (normalTotalWeight * greenLeaveWeigh.getNormalGeneralDeductionPercent().doubleValue() / 100.0)
        ));
        greenLeaveWeigh.setSuperGeneralDeduction(BigDecimal.valueOf(
                (int) (superTotalWeight * greenLeaveWeigh.getSuperGeneralDeductionPercent().doubleValue() / 100.0)
        ));

        //net weight
        double normalNetValue
                = normalTotalWeight
                //deductions
                - greenLeaveWeigh.getNormalTareDeduction().doubleValue()
                - greenLeaveWeigh.getNormalGeneralDeduction().doubleValue()
                - greenLeaveWeigh.getNormalWaterDeduction().doubleValue()
                //returns
                - greenLeaveWeigh.getNormalBoiledLeaves().doubleValue()
                - greenLeaveWeigh.getNormalCoarseLeaves().doubleValue();
        greenLeaveWeigh.setNormalNetWeight(BigDecimal.valueOf(normalNetValue));

        double superNetValue
                = superTotalWeight
                //deductions
                - greenLeaveWeigh.getSuperTareDeduction().doubleValue()
                - greenLeaveWeigh.getSuperGeneralDeduction().doubleValue()
                - greenLeaveWeigh.getSuperWaterDeduction().doubleValue()
                //returns
                - greenLeaveWeigh.getSuperBoiledLeaves().doubleValue()
                - greenLeaveWeigh.getSuperCoarseLeaves().doubleValue();
        greenLeaveWeigh.setSuperNetWeight(BigDecimal.valueOf(superNetValue));

        //tare count
        greenLeaveWeigh.setNormalCrates(normalCrates);
        greenLeaveWeigh.setNormalBags(normalBags);
        greenLeaveWeigh.setNormalPolyBags(normalPolyBags);

        greenLeaveWeigh.setSuperCrates(superCrates);
        greenLeaveWeigh.setSuperBags(superBags);
        greenLeaveWeigh.setSuperPolyBags(superPolyBags);

        return greenLeaveWeigh;
    }
}
