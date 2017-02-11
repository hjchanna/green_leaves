/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_loan;

import com.mac.green_leaves.v1.green_leaves.client_loan.model.TLoanRequestDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Nidura Prageeth
 */
public interface GLLoanRequestDetailRepository extends JpaRepository<TLoanRequestDetail, Integer> {

    public List<TLoanRequestDetail> findByStatusAndLoanRequestIndexNo(String LOAN_REQUEST_STATUS_PENDING, Integer indexNo);
    
    public List<TLoanRequestDetail> findByStatus(String status);
}
