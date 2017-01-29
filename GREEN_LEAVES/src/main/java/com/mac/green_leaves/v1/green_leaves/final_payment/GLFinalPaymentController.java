/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.final_payment;

import com.mac.green_leaves.v1.zutil.SecurityUtil;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Supervision
 */
@CrossOrigin
@RestController
@RequestMapping("/api/v1/green-leaves/final-payment")
public class GLFinalPaymentController {

    @Autowired
    private GLFinalPaymentService finalPaymentService;

    @RequestMapping("/summary/{year}/{month}")
    public List<Object[]> listFinalPaymentSummary(@PathVariable Integer year, @PathVariable Integer month) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();

        return finalPaymentService.listClientLedgerSummary(branch, year, month);
    }
    
    @RequestMapping("/save/{year}/{month}")
    public void saveFinalPayment(@PathVariable Integer year, @PathVariable Integer month) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();

        finalPaymentService.save(branch, year, month);
    }
    
}
