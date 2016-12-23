/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_payment;

import ch.qos.logback.core.pattern.color.GreenCompositeConverter;
import com.mac.green_leaves.v1.green_leaves.green_leaves_payment.model.TVoucher;
import com.mac.green_leaves.v1.green_leaves.green_leaves_payment.model.TVoucherPayment;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Nidura Prageeth
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class GLGreenLeavesPaymentService {

    public static final String STATUS_PENDING = "PENDING";
    public static final String STATUS_CHECK = "CHECK";

    @Autowired
    private GLGreenLeavesPaymentRepository greenLeavesPaymentRepository;
    
    @Autowired
    private GLVoucherPaymentRepository voucherPaymentRepository;

    public List<TVoucher> allVouchers(int BRANCH) {
        return greenLeavesPaymentRepository.findByBranchAndStatus(BRANCH, STATUS_PENDING);
    }

    public void saveVoucher(TVoucherPayment voucherPayment, int BRANCH) {
        TVoucher  voucher = greenLeavesPaymentRepository.findOne(voucherPayment.getVoucher());
        voucher.setStatus(STATUS_CHECK);
        greenLeavesPaymentRepository.save(voucher);
        
        voucherPayment.setBranch(BRANCH);
        voucherPayment.setDate(new Date());
        voucherPayment.setCashier(1);
        voucherPayment.setStatus(STATUS_CHECK);
        voucherPaymentRepository.save(voucherPayment);
    }

}
