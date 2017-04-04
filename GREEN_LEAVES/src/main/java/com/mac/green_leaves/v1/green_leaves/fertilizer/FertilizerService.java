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
import java.util.Calendar;
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
    private FertilizerDetailRepository fertilizerDetailRepository;

    @Autowired
    private GLCommonClientLedgerRepository clientLedgerRepository;

    private final String PENDING_STATUS = "PENDING";
    private final String APPROVE_STATUS = "APPROVE";
    private final String DELETED_STATUS = "DELETED";

    public Integer saveFertilizer(TFertilizer fertilizer) {
        //create new transaction number
        if (fertilizer.getIndexNo() == null) {
            Integer maxNumber = fertilizerRepository.getMaximumNumberByBranch(fertilizer.getBranch());
            if (maxNumber == null) {
                maxNumber = 0;
            }
            fertilizer.setNumber(maxNumber + 1);
        }

        for (TFertilizerDetail tFertilizerDetail : fertilizer.getTFertilizerDetailList()) {
            tFertilizerDetail.setFertilizer(fertilizer);
        }

        fertilizer = fertilizerRepository.save(fertilizer);
        return fertilizer.getNumber();
    }

    public TFertilizer getFertilizer(Integer number) {
        return fertilizerRepository.findByNumberAndStatusNot(number, DELETED_STATUS);
    }

//    public void deleteFertilizer(Integer indexNo) {
//        TFertilizer fertilizer = fertilizerRepository.getOne(indexNo);
//        fertilizer.setStatus(DELETED_STATUS);
//        fertilizerRepository.save(fertilizer);
//    }

    List<Object[]> getPendingFertilizerRequests(Integer branch) {
        return fertilizerRepository.getPendingRequest(branch);
    }

    public void approveOrRejectFertilizer(Integer indexNo, String status) {
        TFertilizerDetail fertilizerDetail = fertilizerDetailRepository.findOne(indexNo);
        fertilizerDetail.setStatus(status);

        if (APPROVE_STATUS.equals(status)) {
            //one month
            if (fertilizerDetail.getInstalmentCount() == 1) {
                System.out.println("ONE-MONTH");

                //client leger
                TClientLedger clientLedger = new TClientLedger();
                clientLedger.setBranch(fertilizerDetail.getFertilizer().getBranch());
                clientLedger.setClient(fertilizerDetail.getClient());
                clientLedger.setDate(fertilizerDetail.getFertilizer().getDate());
                clientLedger.setCreditAmount(fertilizerDetail.getAmount());
                clientLedger.setDebitAmount(BigDecimal.ZERO);
                clientLedger.setSettlementOrder(1);
                clientLedger.setSettlementType("FERTILIZER");
                clientLedger.setStatus(PENDING_STATUS);
                clientLedger.setTransaction(1);
                clientLedgerRepository.save(clientLedger);
            } else {
                //two month
                System.out.println("TWO-MONTH");

                TClientLedger clientLedger1 = new TClientLedger();
                clientLedger1.setBranch(fertilizerDetail.getFertilizer().getBranch());
                clientLedger1.setClient(fertilizerDetail.getClient());
                clientLedger1.setDate(fertilizerDetail.getFertilizer().getDate());
                clientLedger1.setDebitAmount(BigDecimal.ZERO);
                clientLedger1.setCreditAmount(fertilizerDetail.getAmount().divide(new BigDecimal(2)));
                clientLedger1.setSettlementOrder(1);
                clientLedger1.setSettlementType("FERTILIZER");
                clientLedger1.setStatus(PENDING_STATUS);
                clientLedger1.setTransaction(1);

                Calendar calendar = Calendar.getInstance();
                calendar.setTime(fertilizerDetail.getFertilizer().getDate());
                calendar.add(Calendar.MONTH, 1);

                TClientLedger clientLedger2 = new TClientLedger();
                clientLedger2.setBranch(fertilizerDetail.getFertilizer().getBranch());
                clientLedger2.setClient(fertilizerDetail.getClient());
                clientLedger2.setDate(calendar.getTime());
                clientLedger2.setDebitAmount(BigDecimal.ZERO);
                clientLedger2.setCreditAmount(fertilizerDetail.getAmount().divide(new BigDecimal(2)));
                clientLedger2.setSettlementOrder(1);
                clientLedger2.setSettlementType("FERTILIZER");
                clientLedger2.setStatus(PENDING_STATUS);
                clientLedger2.setTransaction(1);

                clientLedgerRepository.save(clientLedger1);
                clientLedgerRepository.save(clientLedger2);
            }
            fertilizerDetailRepository.save(fertilizerDetail);
        }

        //fertilizer ststus change
        TFertilizer fertilizer = fertilizerDetailRepository.findOne(indexNo).getFertilizer();
        List<TFertilizerDetail> fertilizerDetailsList = fertilizer.getTFertilizerDetailList();
        fertilizer.setStatus(APPROVE_STATUS);
        for (int i = 0; i < fertilizerDetailsList.size(); i++) {
            if (fertilizerDetailsList.get(i).getStatus().equals(PENDING_STATUS)) {
                fertilizer.setStatus(PENDING_STATUS);
            }
        }
        fertilizerRepository.save(fertilizer);
    }

    @Transactional
    public void deleteFertilizerDetail(Integer indexNo) {
        fertilizerRepository.deleteFertilizerDetail(indexNo);
    }

    List<TFertilizerDetail> getPendingRequestDataByDate(Date date) {
        return fertilizerDetailRepository.findByFertilizerDateAndStatus(date, PENDING_STATUS);
    }
}
