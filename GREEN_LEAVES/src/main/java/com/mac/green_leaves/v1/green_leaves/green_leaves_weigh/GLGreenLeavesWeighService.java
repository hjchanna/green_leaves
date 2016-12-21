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
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.GLGreenLeavesReceiveService;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceive;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetail;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeighDetail;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeigh;
import java.math.BigDecimal;
import java.util.ArrayList;
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

    private final String PENDING_STATUS = "PENDING";
    private final String APPROVE_STATUS = "APPROVE";
    private final String TYPE_BULK = "BULK";
    private final String TYPE_SUPPLIER = "SUPPLIER";

    @Autowired
    private GLGreenLeavesWeighRepository greenLeavesWeighRepository;

    @Autowired
    private GLGreenLeavesWeighDetailRepository greenLeavesWeighDetailRepository;

    @Autowired
    private GLGreenLeavesReceiveService greenLeavesReceiveService;

    public TGreenLeavesWeigh getSummary(Integer branch, Integer number) {
        List<TGreenLeavesWeigh> greenLeaveWeighs = greenLeavesWeighRepository.findByBranchAndNumber(branch, number);

        if (greenLeaveWeighs.isEmpty()) {
            throw new EntityNotFoundException("Green leaves receive information is not found for number " + number);
        }

        return greenLeaveWeighs.get(0);
    }

    @Transactional
    public TGreenLeavesWeigh saveSummary(TGreenLeavesWeigh greenLeavesWeighRequest) {
        //assume that the green leave weigh does not have weigh details
        TGreenLeavesWeigh greenLeavesWeigh;
        if (greenLeavesWeighRequest.getIndexNo() != null) {
            greenLeavesWeigh = greenLeavesWeighRepository.getOne(greenLeavesWeighRequest.getIndexNo());
            greenLeavesWeigh.setBranch(greenLeavesWeighRequest.getBranch());
            greenLeavesWeigh.setDate(greenLeavesWeighRequest.getDate());
            greenLeavesWeigh.setRouteOfficer(greenLeavesWeighRequest.getRouteOfficer());
            greenLeavesWeigh.setRouteHelper(greenLeavesWeighRequest.getRouteHelper());
            greenLeavesWeigh.setVehicle(greenLeavesWeighRequest.getVehicle());

            greenLeavesWeigh.setNormalTareCalculated(greenLeavesWeighRequest.getNormalTareCalculated());
            greenLeavesWeigh.setNormalGeneralDeductionPercent(greenLeavesWeighRequest.getNormalGeneralDeductionPercent());
            greenLeavesWeigh.setNormalTareDeduction(greenLeavesWeighRequest.getNormalTareDeduction());
            greenLeavesWeigh.setNormalWaterDeduction(greenLeavesWeighRequest.getNormalWaterDeduction());
            greenLeavesWeigh.setNormalCoarseLeaves(greenLeavesWeighRequest.getNormalCoarseLeaves());
            greenLeavesWeigh.setNormalBoiledLeaves(greenLeavesWeighRequest.getNormalBoiledLeaves());

            greenLeavesWeigh.setSuperTareCalculated(greenLeavesWeighRequest.getSuperTareCalculated());
            greenLeavesWeigh.setSuperGeneralDeductionPercent(greenLeavesWeighRequest.getSuperGeneralDeductionPercent());
            greenLeavesWeigh.setSuperTareDeduction(greenLeavesWeighRequest.getSuperTareDeduction());
            greenLeavesWeigh.setSuperWaterDeduction(greenLeavesWeighRequest.getSuperWaterDeduction());
            greenLeavesWeigh.setSuperCoarseLeaves(greenLeavesWeighRequest.getSuperCoarseLeaves());
            greenLeavesWeigh.setSuperBoiledLeaves(greenLeavesWeighRequest.getSuperBoiledLeaves());
        } else {
            //generate new number
            Integer maxNumber = greenLeavesWeighRepository.getMaximumNumberByBranch(greenLeavesWeighRequest.getBranch());
            if (maxNumber == null) {
                maxNumber = 0;
            }
            greenLeavesWeighRequest.setNumber(maxNumber + 1);

            greenLeavesWeighRequest.setStatus(PENDING_STATUS);
            greenLeavesWeigh = validateWeighSummary(greenLeavesWeighRequest);

            if ("SUPPLIER".equals(greenLeavesWeigh.getType())) {
                greenLeavesWeigh.setRoute(null);
            }
            //TODO:transaction
        }
        return greenLeavesWeighRepository.save(greenLeavesWeigh);
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
//        validateWeighSummary(greenLeaveWeigh);
        greenLeavesWeighRepository.save(validateWeighSummary(greenLeaveWeigh));

        if ("SUPPLIER".equals(greenLeaveWeigh.getType()) && greenLeaveWeigh.getClient() != null) {
            TGreenLeavesReceive greenLeavesReceive = new TGreenLeavesReceive();
            greenLeavesReceive.setBranch(greenLeaveWeigh.getBranch());
            greenLeavesReceive.setDate(greenLeaveWeigh.getDate());

            TGreenLeavesReceiveDetail greenLeavesReceiveDetail = new TGreenLeavesReceiveDetail();
            greenLeavesReceiveDetail.setClient(greenLeaveWeigh.getClient());
            greenLeavesReceiveDetail.setNormalLeavesQuantity(greenLeaveWeigh.getNormalNetWeight());
            greenLeavesReceiveDetail.setSuperLeavesQuantity(greenLeaveWeigh.getSuperNetWeight());
            greenLeavesReceiveDetail.setGreenLeavesReceive(greenLeavesReceive);

            List<TGreenLeavesReceiveDetail> greenLeaveReceiveDetailsList = new ArrayList<>();
            greenLeaveReceiveDetailsList.add(greenLeavesReceiveDetail);
            greenLeavesReceive.setGreenLeavesReceiveDetails(greenLeaveReceiveDetailsList);

            //find by brnach and route and date this green leaves receive data is allrady exist
            List<TGreenLeavesReceive> greenLeavesList = greenLeavesReceiveService.findByBranchAndRouteAndDateAndGreenLeavesReceiveDetailsClient(greenLeaveWeigh.getBranch(), greenLeaveWeigh.getDate(), greenLeaveWeigh.getClient());
            if (greenLeavesList.isEmpty()) {
                greenLeavesReceiveService.saveGreenLeaveReceiveDetails(greenLeavesReceive);
                //update green leaves normal total leaves and super total leaves
            } else {
                for (TGreenLeavesReceive tGreenLeavesReceive : greenLeavesList) {
                    greenLeavesReceiveService.updateNormalLeafAndSuperLeaf(tGreenLeavesReceive.getIndexNo(), greenLeaveWeigh.getNormalNetWeight(), greenLeaveWeigh.getSuperNetWeight());
                }
            }
        }

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

    //find by branch get pending bulk green leaves weigh and pending supplier green leaves weight
    public List<TGreenLeavesWeigh> findByBranchAndType(Integer branch, String type) {
        return greenLeavesWeighRepository.findByBranchAndStatusAndType(branch, PENDING_STATUS, type);
    }

    //pending bulk and supplier weigh confirm status update approve
    @Transactional
    public void confirmWeigh(Integer indexNo) {
        greenLeavesWeighRepository.updateConfirmation(indexNo);
    }

    //find bulk green leaves weigh
    public TGreenLeavesWeigh findByBranchAndRouteAndDate(Integer branch, Integer route, Date date) {
        TGreenLeavesWeigh greenLeavesWeigh = greenLeavesWeighRepository.findByBranchAndRouteAndDateAndType(branch, route, date, TYPE_BULK);
        if (greenLeavesWeigh == null) {
            throw new EntityNotFoundException("bulk green leave weight not found branch,route and date" + branch + " , " + route + " and " + date);
        }
        return greenLeavesWeigh;

    }

    //find supplier green leaves weigh
    TGreenLeavesWeigh findByBranchAndDateAndClient(Integer branch, Date date, Integer client) {
        TGreenLeavesWeigh greenLeavesWeigh = greenLeavesWeighRepository.findByBranchAndDateAndClientAndType(branch, date, client, TYPE_SUPPLIER);
        if (greenLeavesWeigh == null) {
            throw new EntityNotFoundException("supplier green leave weight not found branch,date and client" + branch + " , " + date + " and " + client);
        }
        return greenLeavesWeigh;
    }
}
