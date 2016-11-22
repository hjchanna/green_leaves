/*
 *  GreenLeavesWeighService.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 20, 2016, 10:56:00 AM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.green_leaves.v1.transaction.green_leaves_weigh;

import com.mac.green_leaves.v1.exception.EntityNotFoundException;
import com.mac.green_leaves.v1.transaction.green_leaves_weigh.model.TGreenLeaveWeigh;
import com.mac.green_leaves.v1.transaction.green_leaves_weigh.model.TGreenLeaveWeighDetail;
import com.mac.green_leaves.v1.transaction.green_leaves_weigh.GreenLeavesWeighDetailRepository;
import com.mac.green_leaves.v1.transaction.green_leaves_weigh.GreenLeavesWeighRepository;
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
public class GreenLeavesWeighService {

    @Autowired
    private GreenLeavesWeighRepository greenLeavesWeighRepository;

    @Autowired
    private GreenLeavesWeighDetailRepository greenLeavesWeighDetailRepository;

    public TGreenLeaveWeigh getSummary(Integer number) {
        List<TGreenLeaveWeigh> greenLeaveWeighs = greenLeavesWeighRepository.findByBranchAndNumber(0, number);

        if (greenLeaveWeighs.isEmpty()) {
            throw new EntityNotFoundException(TGreenLeaveWeigh.class.getCanonicalName() + " is not found for number " + number);
        }

        return greenLeaveWeighs.isEmpty() ? null : greenLeaveWeighs.get(0);
    }

    @Transactional(readOnly = false)
    public TGreenLeaveWeigh saveSummary(TGreenLeaveWeigh greenLeaveWeigh) {
        if (greenLeaveWeigh.getIndexNo() != null) {
            greenLeaveWeigh = greenLeavesWeighRepository.getOne(greenLeaveWeigh.getIndexNo());
        } else {
            //generate new number
            greenLeaveWeigh.setNumber(greenLeavesWeighRepository.getMaximumNumberByBranch(0) + 1);
        }
        greenLeaveWeigh = validateWeighSummary(greenLeaveWeigh);

        return greenLeavesWeighRepository.save(greenLeaveWeigh);
    }

    @Transactional(readOnly = false)
    public TGreenLeaveWeighDetail insertWeigh(TGreenLeaveWeighDetail greenLeaveWeighDetail) {
        greenLeaveWeighDetail = validateWeighDetail(greenLeaveWeighDetail);
        greenLeavesWeighDetailRepository.save(greenLeaveWeighDetail);

        TGreenLeaveWeigh greenLeaveWeigh = greenLeavesWeighRepository.getOne(greenLeaveWeighDetail.getGreenLeavesWeigh());
        validateWeighSummary(greenLeaveWeigh);
        greenLeavesWeighRepository.save(greenLeaveWeigh);

        return greenLeaveWeighDetail;
    }

    @Transactional(readOnly = false)
    public void deleteWeigh(Integer indexNo) {
        TGreenLeaveWeighDetail greenLeaveWeighDetail = greenLeavesWeighDetailRepository.getOne(indexNo);
        greenLeavesWeighDetailRepository.delete(greenLeaveWeighDetail);

        TGreenLeaveWeigh greenLeaveWeigh = greenLeavesWeighRepository.getOne(greenLeaveWeighDetail.getGreenLeavesWeigh());
        validateWeighSummary(greenLeaveWeigh);
        greenLeavesWeighRepository.save(greenLeaveWeigh);
    }

    //validations
    private TGreenLeaveWeighDetail validateWeighDetail(TGreenLeaveWeighDetail greenLeaveWeighDetail) {

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
        if (greenLeaveWeigh.getGreenLeavesWeighDetails() != null) {
            for (TGreenLeaveWeighDetail greenLeaveWeighDetail : greenLeaveWeigh.getGreenLeavesWeighDetails()) {
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
