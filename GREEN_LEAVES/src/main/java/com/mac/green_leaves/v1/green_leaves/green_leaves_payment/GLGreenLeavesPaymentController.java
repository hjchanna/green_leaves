/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_payment;

import com.mac.green_leaves.v1.green_leaves.green_leaves_payment.model.TVoucher;
import com.mac.green_leaves.v1.green_leaves.green_leaves_payment.model.TVoucherPayment;
import com.mac.green_leaves.v1.security.model.RTransactionType;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Nidura Prageeth
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/green-leaves/voucher-payment")
public class GLGreenLeavesPaymentController {

    private static final int BRANCH = 1;

    @Autowired
    private GLGreenLeavesPaymentService greenLeavesPaymentService;

    @RequestMapping(method = RequestMethod.GET)
    public List<TVoucher> allVouchers() {
        return greenLeavesPaymentService.allVouchers(BRANCH);
    }
    
    @RequestMapping(value = "/save-voucher/{maxTransactionNumber}",method = RequestMethod.POST)
    public int saveVoucher(@RequestBody TVoucher voucher,@PathVariable Integer maxTransactionNumber){
        System.out.println(maxTransactionNumber);
        System.out.println("maxTransactionNumber");
        greenLeavesPaymentService.saveVoucher(voucher,BRANCH,maxTransactionNumber);
        return voucher.getIndexNo();
    }
    
    @RequestMapping(value = "/update-voucher",method = RequestMethod.POST)
    public int updaeVoucher(@RequestBody TVoucher voucher){
        System.out.println(voucher.getPaymentType());
        return greenLeavesPaymentService.updateVoucher(voucher);
    }
    
    //transaction type
    @RequestMapping(value = "/all-transaction-type",method = RequestMethod.GET)
    public List<RTransactionType> allTransactionType(){
        return greenLeavesPaymentService.allTransactionType();
    }
    
    //transaction type
    @RequestMapping(value = "/transaction-number",method = RequestMethod.GET)
    public int maxTransactionNumber(){
        TVoucherPayment voucherPayment = greenLeavesPaymentService.transactionNumber();
        if (voucherPayment==null) {
            return 0;
        }
        return voucherPayment.getTransaction();
    }
}
