/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.final_payment;

import com.mac.green_leaves.v1.green_leaves.final_payment.model.TAccountTransaction;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Supervision
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class GLFinalPaymentService {
    
    @Autowired
    private GLFinalPaymentRepository finalPaymentRepository;
    
    public List<TAccountTransaction> getAccountTransactionsFromDate(String year,String month){
        List<TAccountTransaction> list = finalPaymentRepository.getAccountTransaction(year,month);
        return list;
    }

    public List<TAccountTransaction> getAccountTransactionsFromDescription(String year,String month,Integer typeId){
        System.out.println(year);
        System.out.println(month);
        System.out.println(typeId);
        List<TAccountTransaction> list = finalPaymentRepository.getAccountTransactionsFromDescription(year,month,typeId);
        return list;
    }

    
}
