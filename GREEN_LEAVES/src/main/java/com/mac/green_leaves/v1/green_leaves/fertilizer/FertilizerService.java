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
    private GLCommonClientLedgerRepository clientLedgerRepository;

    @Autowired
    private FertilizerRepository fertilizerRepository;

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

        //convert month and year
        //one month
        if ("ONE-MONTH".equals(fertilizer.getMonth())) {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy - MM");
            fertilizer.setMonth(formatter.format(new Date()));

            System.out.println("ONE-MONTH");
        } else {
        //two month
            System.out.println("TWO-MONTH");
        }

        //TODO:transaction
        for (TFertilizerDetail tFertilizerDetail : fertilizer.getTFertilizerDetailList()) {
            tFertilizerDetail.setFertilizer(fertilizer);
        }

        fertilizer = fertilizerRepository.save(fertilizer);
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
}
