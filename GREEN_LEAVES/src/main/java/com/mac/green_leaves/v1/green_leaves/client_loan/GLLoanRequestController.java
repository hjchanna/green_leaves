/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_loan;

import com.mac.green_leaves.v1.green_leaves.client_advance.*;
import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequest;
import com.mac.green_leaves.v1.green_leaves.client_loan.model.TLoanRequest;
import com.mac.green_leaves.v1.green_leaves.client_loan.model.TLoanRequestDetail;
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
 * @author Mohan
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/loan/loan-request")
public class GLLoanRequestController {

    private static final int BRANCH = 1;

    @Autowired
    private GLLoanRequestService loanRequestService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Integer saveLoanRequest(@RequestBody TLoanRequest loanRequest) {
        return loanRequestService.saveLoanRequest(loanRequest, BRANCH);
    }

    @RequestMapping(value = "/pending-requests")
    public List<TLoanRequest> getPendingLoanRequests() {
        return loanRequestService.getPendingLoanRequests(BRANCH);
    }

//  check ------------------------------------------------------------------
    @RequestMapping(value = "/check-request-detail", method = RequestMethod.POST)
    public void checkLoanRequestDetail(@RequestBody TLoanRequestDetail loanRequestDetail) {
        loanRequestService.checkLoanRequestDetail(loanRequestDetail);
    }

    // approve-----------------------------------------------------------------
    @RequestMapping(value = "/check-pending-requests")
    public List<TLoanRequestDetail> getCheckLoanRequests() {
        return loanRequestService.getCheckLoanRequests();
    }

    @RequestMapping(value = "/approve-request-detail", method = RequestMethod.POST)
    public void approveLoanRequest(@RequestBody TLoanRequestDetail loanRequestDetail) {
        loanRequestService.approveLoanRequest(loanRequestDetail);
    }
    
    @RequestMapping(value = "/reject-request/{indexNo}")
    public void rejectLoanRequest(@PathVariable Integer indexNo){
        loanRequestService.rejectRequest(indexNo);
    }

}
