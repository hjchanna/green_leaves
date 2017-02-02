/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.fertilizer;

import com.mac.green_leaves.v1.green_leaves.fertilizer.model.TFertilizer;
import com.mac.green_leaves.v1.green_leaves.fertilizer.model.TFertilizerDetail;
import com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger.GLCommonClientLedgerRepository;
import com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger.model.TClientLedger;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Don
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class FertilizerService {

    @Autowired
    private FertilizerRepository fertilizerRepository;

    @Autowired
    private GLCommonClientLedgerRepository clientLedgerRepository;

    private final String PENDING_STATUS = "PENDING";
    private final String APPROVE_STATUS = "APPROVE";
    private final String DELETED_STATUS = "DELETED";

    public List<TFertilizer> gelAll() {
        return fertilizerRepository.findAll();
    }

    public Integer saveFertilizer(TFertilizer fertilizer) {
        Integer maxNumber = fertilizerRepository.getMaximumNumberByBranch(fertilizer.getBranch());
        if (maxNumber == null) {
            maxNumber = 0;
        }
        fertilizer.setNumber(maxNumber + 1);

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy - MM");
        fertilizer.setMonth(formatter.format(new Date()));

        //TODO:transaction
        for (TFertilizerDetail tFertilizerDetail : fertilizer.gettFertilizerDetailList()) {
            tFertilizerDetail.setFertilizer(fertilizer);
        }

        fertilizer = fertilizerRepository.save(fertilizer);

        //one month
        if ("ONE-MONTH".equals(fertilizer.getType())) {

            //client leger
            TClientLedger clientLedger = new TClientLedger();
            clientLedger.setBranch(fertilizer.getBranch());
            clientLedger.setClient(fertilizer.getClient());
            clientLedger.setDate(fertilizer.getDate());
            clientLedger.setCreditAmount(BigDecimal.ZERO);
            clientLedger.setDebitAmount(fertilizer.getAmount());
            clientLedger.setSettlementOrder(1);
            clientLedger.setSettlementType("FERTILIZSER");
            clientLedger.setStatus(PENDING_STATUS);
            clientLedger.setTransaction(1);
            clientLedgerRepository.save(clientLedger);
            System.out.println("ONE-MONTH");
        } else {
            TClientLedger clientLedger = new TClientLedger();
            clientLedger.setBranch(fertilizer.getBranch());
            clientLedger.setClient(fertilizer.getClient());
            clientLedger.setDate(fertilizer.getDate());
            clientLedger.setCreditAmount(BigDecimal.ZERO);
            clientLedger.setDebitAmount(fertilizer.getAmount().divide(new BigDecimal(2)));
            clientLedger.setSettlementOrder(1);
            clientLedger.setSettlementType("FERTILIZSER");
            clientLedger.setStatus(PENDING_STATUS);
            clientLedger.setTransaction(1);
            clientLedgerRepository.save(clientLedger);

            TClientLedger clientLedger1 = clientLedger;
            clientLedgerRepository.save(clientLedger1);

            //two month
            System.out.println("TWO-MONTH");
        }
        return fertilizer.getIndexNo();
    }

    public TFertilizer getFertilizer(Date date, Integer number) {
        return fertilizerRepository.findByDateAndNumber(date, number);
    }

    public void deleteFertilizer(Integer indexNo) {
        TFertilizer fertilizer = fertilizerRepository.getOne(indexNo);
        fertilizer.setStatus(DELETED_STATUS);
        fertilizerRepository.save(fertilizer);
    }

    public List<Object[]> getPendingRequestBtROuteOfficer(Integer branch) {
        return fertilizerRepository.getPendingRequest(branch);
    }

    List<TFertilizer> getPendingRequestByBranchAndROuteOfficer(Integer branch, Integer routeOfficer) {
        return fertilizerRepository.findByBranchAndStatusAndRouteOfficer(branch, PENDING_STATUS, routeOfficer);
    }

    public void approveOrRejectFertilizer(Integer indexNo, String status) {
        TFertilizer fertilizer = fertilizerRepository.getOne(indexNo);
        fertilizer.setStatus(status);
        fertilizerRepository.save(fertilizer);
    }
}
