/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_supplier_weigh;

import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.GLGreenLeavesReceiveDetailRepository;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.GLGreenLeavesReceiveRepository;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceive;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetail;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.GLGreenLeavesWeighDetailRepository;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.GLGreenLeavesWeighRepository;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeigh;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeighDetail;
import com.mac.green_leaves.v1.zexception.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author hjcha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class GLGreenLeavesSupplierWeighService {

    private final String PENDING_STATUS = "PENDING";
    private final String APPROVE_STATUS = "APPROVE";
    private final String DELETED_STATUS = "DELETED";
    //
    private final String TYPE_BULK = "BULK";
    private final String TYPE_SUPPLIER = "SUPPLIER";

    @Autowired
    private GLGreenLeavesWeighRepository greenLeavesWeighRepository;

    @Autowired
    private GLGreenLeavesWeighDetailRepository greenLeavesWeighDetailRepository;

    @Autowired
    private GLGreenLeavesReceiveRepository greenLeavesReceiveRepository;

    @Autowired
    private GLGreenLeavesReceiveDetailRepository greenLeavesReceiveDetailRepository;

    public TGreenLeavesWeigh getSummary(Integer branch, Integer number, String type) {
        List<TGreenLeavesWeigh> greenLeaveWeighs = greenLeavesWeighRepository.findByBranchAndNumberAndTypeAndStatusNot(branch, number, type, DELETED_STATUS);

        if (greenLeaveWeighs.isEmpty()) {
            throw new EntityNotFoundException("Green leaves weigh information is not found for number " + number);
        }

        return greenLeaveWeighs.get(0);
    }

    //find by branch get pending bulk green leaves weigh
    public List<TGreenLeavesWeigh> findPendingWeighByWeighBranchAndType(Integer branch) {
        return greenLeavesWeighRepository.findByWeighBranchAndStatusAndType(branch, PENDING_STATUS, TYPE_SUPPLIER);
    }

    @Transactional
    public TGreenLeavesWeigh saveSummary(TGreenLeavesWeigh greenLeavesWeighRequest, Integer weighBranch) {
        //assume that the green leave weigh does not have weigh details
        TGreenLeavesWeigh greenLeavesWeigh;
        if (greenLeavesWeighRequest.getIndexNo() != null) {
            greenLeavesWeigh = greenLeavesWeighRepository.getOne(greenLeavesWeighRequest.getIndexNo());

            greenLeavesWeigh.setBranch(greenLeavesWeighRequest.getBranch());
            greenLeavesWeigh.setWeighBranch(weighBranch);
            greenLeavesWeigh.setDate(greenLeavesWeighRequest.getDate());
            greenLeavesWeigh.setRoute(null);//supplier weigh does not have route
            greenLeavesWeigh.setClient(greenLeavesWeighRequest.getClient());
            greenLeavesWeigh.setTempClient(greenLeavesWeighRequest.getTempClient());
            greenLeavesWeigh.setRouteOfficer(greenLeavesWeighRequest.getRouteOfficer());
            greenLeavesWeigh.setRouteHelper(greenLeavesWeighRequest.getRouteHelper());
            greenLeavesWeigh.setVehicle(greenLeavesWeighRequest.getVehicle());

            //normal leaves summary
            greenLeavesWeigh.setNormalTotalWeight(greenLeavesWeighRequest.getNormalTotalWeight());
            greenLeavesWeigh.setNormalTareCalculated(greenLeavesWeighRequest.getNormalTareCalculated());
            greenLeavesWeigh.setNormalTareDeduction(greenLeavesWeighRequest.getNormalTareDeduction());
            greenLeavesWeigh.setNormalGeneralDeductionPercent(greenLeavesWeighRequest.getNormalGeneralDeductionPercent());
            greenLeavesWeigh.setNormalGeneralDeduction(greenLeavesWeighRequest.getNormalGeneralDeduction());
            greenLeavesWeigh.setNormalWaterDeduction(greenLeavesWeighRequest.getNormalWaterDeduction());
            greenLeavesWeigh.setNormalCoarseLeaves(greenLeavesWeighRequest.getNormalCoarseLeaves());
            greenLeavesWeigh.setNormalBoiledLeaves(greenLeavesWeighRequest.getNormalBoiledLeaves());
            greenLeavesWeigh.setNormalNetWeight(greenLeavesWeighRequest.getNormalNetWeight());

            //normal tare summary
            greenLeavesWeigh.setNormalCrates(greenLeavesWeighRequest.getNormalCrates());
            greenLeavesWeigh.setNormalBags(greenLeavesWeighRequest.getNormalBags());
            greenLeavesWeigh.setNormalPolyBags(greenLeavesWeighRequest.getNormalPolyBags());

            //supper leaves summary
            greenLeavesWeigh.setSuperTotalWeight(greenLeavesWeighRequest.getSuperTotalWeight());
            greenLeavesWeigh.setSuperTareCalculated(greenLeavesWeighRequest.getSuperTareCalculated());
            greenLeavesWeigh.setSuperTareDeduction(greenLeavesWeighRequest.getSuperTareDeduction());
            greenLeavesWeigh.setSuperGeneralDeduction(greenLeavesWeighRequest.getSuperGeneralDeduction());
            greenLeavesWeigh.setSuperGeneralDeductionPercent(greenLeavesWeighRequest.getSuperGeneralDeductionPercent());
            greenLeavesWeigh.setSuperWaterDeduction(greenLeavesWeighRequest.getSuperWaterDeduction());
            greenLeavesWeigh.setSuperCoarseLeaves(greenLeavesWeighRequest.getSuperCoarseLeaves());
            greenLeavesWeigh.setSuperBoiledLeaves(greenLeavesWeighRequest.getSuperBoiledLeaves());
            greenLeavesWeigh.setSuperNetWeight(greenLeavesWeighRequest.getSuperNetWeight());

            //supper tare summary
            greenLeavesWeigh.setSuperCrates(greenLeavesWeighRequest.getSuperBags());
            greenLeavesWeigh.setSuperBags(greenLeavesWeighRequest.getSuperBags());
            greenLeavesWeigh.setSuperPolyBags(greenLeavesWeighRequest.getSuperPolyBags());
        } else {
            //generate new number
            Integer maxNumber = greenLeavesWeighRepository.getMaximumNumberByBranchAndType(greenLeavesWeighRequest.getBranch(), greenLeavesWeighRequest.getType());
            if (maxNumber == null) {
                maxNumber = 0;
            }
            greenLeavesWeighRequest.setNumber(maxNumber + 1);

            greenLeavesWeighRequest.setStatus(PENDING_STATUS);
            greenLeavesWeigh = validateWeighSummary(greenLeavesWeighRequest);
            greenLeavesWeigh.setRoute(null);

            //TODO:transaction
        }

        //receive information
        Integer number = greenLeavesWeigh.getNumber();
        List<TGreenLeavesReceive> greenLeavesReceives = greenLeavesReceiveRepository.findByBranchAndNumberAndTypeAndStatusNot(weighBranch, number, TYPE_SUPPLIER, DELETED_STATUS);
        TGreenLeavesReceive greenLeavesReceive;
        if (greenLeavesReceives.isEmpty()) {
            greenLeavesReceive = new TGreenLeavesReceive();
        } else {
            greenLeavesReceive = greenLeavesReceives.get(0);
        }

        greenLeavesReceive.setBranch(greenLeavesWeigh.getBranch());
        greenLeavesReceive.setNumber(greenLeavesWeigh.getNumber());
        greenLeavesReceive.setDate(greenLeavesWeigh.getDate());
        greenLeavesReceive.setTransaction(0);
        greenLeavesReceive.setType(TYPE_SUPPLIER);
        greenLeavesReceive.setStatus(greenLeavesWeigh.getClient() == null ? PENDING_STATUS : APPROVE_STATUS);

        TGreenLeavesReceiveDetail greenLeavesReceiveDetail;
        if (greenLeavesReceive.getIndexNo() == null) {
            greenLeavesReceiveDetail = new TGreenLeavesReceiveDetail();
        } else {
            greenLeavesReceiveDetail = greenLeavesReceive.getGreenLeavesReceiveDetails().get(0);
        }

        //receive detail
        greenLeavesReceiveDetail.setClient(greenLeavesWeigh.getClient());
        greenLeavesReceiveDetail.setTempClient(greenLeavesWeigh.getTempClient());
        greenLeavesReceiveDetail.setNormalLeavesQuantity(greenLeavesWeigh.getNormalNetWeight());
        greenLeavesReceiveDetail.setSuperLeavesQuantity(greenLeavesWeigh.getSuperNetWeight());
        greenLeavesReceiveDetail.setGreenLeavesReceive(greenLeavesReceive);

        ArrayList<TGreenLeavesReceiveDetail> greenLeavesReceiveDetails = new ArrayList<>();
        greenLeavesReceiveDetails.add(greenLeavesReceiveDetail);
        greenLeavesReceive.setGreenLeavesReceiveDetails(greenLeavesReceiveDetails);

        //save receive detail
        greenLeavesReceiveRepository.save(greenLeavesReceive);

        //save weigh detail
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
        greenLeavesWeighRepository.save(validateWeighSummary(greenLeaveWeigh));
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

    //pending bulk and supplier weigh confirm status update updateStatus
    @Transactional
    public void approveWeigh(Integer indexNo) {
        greenLeavesWeighRepository.updateStatus(indexNo, APPROVE_STATUS);
    }

    @Transactional
    public void deleteGreenLeavesReceive(Integer indexNo) {
        TGreenLeavesWeigh greenLeavesWeigh = greenLeavesWeighRepository.getOne(indexNo);
        greenLeavesWeigh.setStatus(DELETED_STATUS);
        greenLeavesWeighRepository.save(greenLeavesWeigh);

        Integer number = greenLeavesWeigh.getNumber();
        Integer weighBranch = greenLeavesWeigh.getWeighBranch();
        List<TGreenLeavesReceive> greenLeavesReceives = greenLeavesReceiveRepository.findByBranchAndNumberAndTypeAndStatusNot(weighBranch, number, TYPE_SUPPLIER, DELETED_STATUS);
        TGreenLeavesReceive greenLeavesReceive;
        if (!greenLeavesReceives.isEmpty()) {
            greenLeavesReceive = greenLeavesReceives.get(0);
            greenLeavesReceive.setStatus(DELETED_STATUS);

            greenLeavesReceiveRepository.save(greenLeavesReceive);
        }
    }

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

        //general deduction
        if (greenLeaveWeigh.getNormalTotalWeight().signum() != 0) {
            greenLeaveWeigh.setNormalGeneralDeductionPercent(
                    BigDecimal.valueOf(
                            (greenLeaveWeigh.getNormalGeneralDeduction().doubleValue() * 100.0 / greenLeaveWeigh.getNormalTotalWeight().doubleValue())
                    ));
        }

        if (greenLeaveWeigh.getSuperTotalWeight().signum() != 0) {
            greenLeaveWeigh.setSuperGeneralDeductionPercent(
                    BigDecimal.valueOf(
                            (greenLeaveWeigh.getSuperGeneralDeduction().doubleValue() * 100.0 / greenLeaveWeigh.getSuperTotalWeight().doubleValue())
                    ));
        }

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
