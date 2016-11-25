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
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeaveWeigh;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeaveWeighDetail;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeaveWeigh;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
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

    public TGreenLeaveWeigh getSummary(Integer number) {
        List<TGreenLeaveWeigh> greenLeaveWeighs = greenLeavesWeighRepository.findByBranchAndNumber(branch, number);

        if (greenLeaveWeighs.isEmpty()) {
            throw new EntityNotFoundException("Green leaves receive information is not found for number " + number);
        }

        return greenLeaveWeighs.get(0);
    }

    @Transactional
    public TGreenLeaveWeigh saveSummary(TGreenLeaveWeigh greenLeaveWeigh) {
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
    public TGreenLeaveWeighDetail insertWeigh(Integer weighIndexNo, TGreenLeaveWeighDetail greenLeaveWeighDetail) {
        //read and set weigh
        TGreenLeaveWeigh greenLeaveWeigh = greenLeavesWeighRepository.getOne(weighIndexNo);
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
        TGreenLeaveWeighDetail greenLeaveWeighDetail = greenLeavesWeighDetailRepository.getOne(indexNo);
        TGreenLeaveWeigh greenLeaveWeigh = greenLeaveWeighDetail.getGreenLeavesWeigh();

        greenLeavesWeighDetailRepository.delete(greenLeaveWeighDetail);

        greenLeaveWeigh.getGreenLeaveWeighDetails().remove(greenLeaveWeighDetail);
        validateWeighSummary(greenLeaveWeigh);
        greenLeavesWeighRepository.save(greenLeaveWeigh);
    }

    //validations
    private TGreenLeaveWeighDetail validateWeighDetail(TGreenLeaveWeighDetail greenLeaveWeighDetail) {
        //nothing to do as detail validations
        return greenLeaveWeighDetail;
    }

    private TGreenLeaveWeigh validateWeighSummary(TGreenLeaveWeigh greenLeaveWeigh) {
        double normalTotalWeight = 0.0;
        double superTotalWeight = 0.0;

        int normalCrates = 0;
        int normalBags = 0;
        int normalPolyBags = 0;
        int superCrates = 0;
        int superBags = 0;
        int superPolyBags = 0;
        if (greenLeaveWeigh.getGreenLeaveWeighDetails() != null) {
            for (TGreenLeaveWeighDetail greenLeaveWeighDetail : greenLeaveWeigh.getGreenLeaveWeighDetails()) {
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

    //green leaves get data
    public Object[] getTotalSuperLeavesAndNormalLeaves(Integer branch, Integer route, Date date) {
        List<Object[]> getTotalList = greenLeavesWeighRepository.getTotalLeves(branch, route, date);
        Object total[] = new Object[2];
        total[0] = getTotalList.get(0)[0];
        total[1] = getTotalList.get(0)[1];
        return total;
    }
}
