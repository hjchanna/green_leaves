/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_loan;

import com.mac.green_leaves.v1.green_leaves.client_advance.*;
import com.mac.green_leaves.v1.green_leaves.client_loan.model.TLoanRequest;
import com.mac.green_leaves.v1.green_leaves.client_loan.model.TLoanRequestDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mohan
 */
public interface GLLoanRequestRepository extends JpaRepository<TLoanRequest, Integer> {

    public List<TLoanRequest> findByBranchAndStatus(Integer branch, String LOAN_REQUEST_STATUS_PENDING);

    public List<TLoanRequest> findByBranchAndStatusAndStatus2(Integer branch, String LOAN_REQUEST_STATUS_CHECK, String LOAN_REQUEST_STATUS_PENDING);

}
