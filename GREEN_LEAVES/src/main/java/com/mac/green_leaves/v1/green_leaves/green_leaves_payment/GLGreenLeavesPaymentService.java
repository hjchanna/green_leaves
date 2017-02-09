/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_payment;

import com.mac.green_leaves.v1.green_leaves.green_leaves_payment.model.TVoucher;
import com.mac.green_leaves.v1.green_leaves.green_leaves_payment.model.TVoucherPayment;
import com.mac.green_leaves.v1.security.SETransactionTypeRepository;
import com.mac.green_leaves.v1.security.model.RTransactionType;
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
    
    @Autowired
    private SETransactionTypeRepository transactionTypeRepository;
     
//    @Autowired
//    private GLVoucherPaymentRepository voucherPaymentRepository;
    

    public List<TVoucher> allVouchers(int BRANCH) {
        return greenLeavesPaymentRepository.findByBranchAndStatus(BRANCH, STATUS_PENDING);
    }

    public void saveVoucher(TVoucher voucher, int BRANCH,int maxTransactionNumber) {
        voucher.setStatus(STATUS_CHECK);
        updateVoucher(voucher);
        
        TVoucherPayment voucherPayment=new TVoucherPayment();
        BigDecimal cashAmount = new BigDecimal(0.00);
        BigDecimal chequeAmount=new BigDecimal(0.00);
        BigDecimal bankAmount=new BigDecimal(0.00);
        
        if("CASH".equals(voucher.getPaymentType())){
            cashAmount=voucher.getAmount();
        };
        if("BANK".equals(voucher.getPaymentType())){
            bankAmount=voucher.getAmount();
        };
        if("CHEQUE".equals(voucher.getPaymentType())){
            chequeAmount=voucher.getAmount();
        };
                
        voucherPayment.setAmount(voucher.getAmount());
        voucherPayment.setBranch(BRANCH);
        voucherPayment.setCashAmount(cashAmount);
        voucherPayment.setChequeAmount(chequeAmount);
        voucherPayment.setBankAmount(bankAmount);
        voucherPayment.setDate(new Date());
        voucherPayment.setCashier(1);
        voucherPayment.setStatus(STATUS_CHECK);
        voucherPayment.setTransaction(maxTransactionNumber);
        voucherPayment.setVoucher(voucher.getIndexNo());
//        voucherPayment.setIndexNo(0);//auto increment
        voucherPaymentRepository.save(voucherPayment);
    }
    // transaction type
    public List<RTransactionType> allTransactionType(){
        return transactionTypeRepository.findAll();
    }

    Integer updateVoucher(TVoucher voucher) {
        TVoucher voucher1 = greenLeavesPaymentRepository.save(voucher);
        return voucher1.getIndexNo();
    }
    public TVoucherPayment transactionNumber() {
        return voucherPaymentRepository.findTopByOrderByTransactionDesc();
//        return voucher1.getIndexNo();
    }

}
