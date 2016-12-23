/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_payment;

import com.mac.green_leaves.v1.green_leaves.green_leaves_payment.model.TVoucher;
import com.mac.green_leaves.v1.green_leaves.green_leaves_payment.model.TVoucherPayment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Nidura Prageeth
 */
public interface GLGreenLeavesPaymentRepository extends JpaRepository<TVoucher, Integer>{

    public List<TVoucher> findByBranchAndStatus(int BRANCH, String STATUS_PENDING);


    
}
