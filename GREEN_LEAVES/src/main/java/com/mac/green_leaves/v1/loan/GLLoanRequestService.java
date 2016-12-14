/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.loan;

import com.mac.green_leaves.v1.green_leaves.client_advance.*;
import com.mac.green_leaves.v1.exception.EntityNotFoundException;
import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequest;
import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequestDetail;
import com.mac.green_leaves.v1.loan.model.TLoanRequest;
import com.mac.green_leaves.v1.loan.model.TLoanRequestDetail;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Mohan
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class GLLoanRequestService {

    public static final String LOAN_REQUEST_STATUS_PENDING = "PENDING";
    public static final String LOAN_REQUEST_STATUS_CHECK = "CHECK";

    @Autowired
    private GLLoanRequestRepository loanRequestRepository;

    @Autowired
    private GLLoanRequestDetailRepository loanRequestDetailRepository;

    @Transactional
    public Integer saveLoanRequest(TLoanRequest loanRequest, Integer branch) {

        for (TLoanRequestDetail loanRequestDetail : loanRequest.getLoanRequestDetails()) {
            loanRequestDetail.setStatus(LOAN_REQUEST_STATUS_PENDING);
            loanRequestDetail.setInstallmentAmount(null);
            loanRequestDetail.setInstallmentCount(0);
            loanRequestDetail.setInterestRate(null);
            loanRequestDetail.setLoanStartDate(null);
            loanRequestDetail.setPanaltyRate(null);
            loanRequestDetail.setLoanRequest(loanRequest);
        }

        loanRequest.setBranch(branch);
        loanRequest.setStatus(LOAN_REQUEST_STATUS_PENDING);
        loanRequest = loanRequestRepository.save(loanRequest);
        return loanRequest.getIndexNo();
    }

    public List<TLoanRequest> getPendingLoanRequests(Integer branch) {
        return loanRequestRepository.findByBranchAndStatus(branch, LOAN_REQUEST_STATUS_PENDING);
    }

    //check------------------------
    public TLoanRequestDetail checkLoanRequestDetail(TLoanRequestDetail loanRequestDetail) {
        System.out.println(loanRequestDetail.getIndexNo() + "ssssssssssssssssss");
//        loanRequestDetail.setStatus(LOAN_REQUEST_STATUS_CHECK);
//        return loanRequestDetailRepository.save(loanRequestDetail);
        return null;
    }
}
