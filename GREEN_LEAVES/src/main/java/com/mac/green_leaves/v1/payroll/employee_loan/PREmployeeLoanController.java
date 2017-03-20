/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_loan;

import com.mac.green_leaves.v1.payroll.employee_loan.model.TEmployeeLoan;
import com.mac.green_leaves.v1.payroll.employee_loan.model.TEmployeeLoanDetail;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
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
 * @author L T430
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/employee-loan/loan-request")
public class PREmployeeLoanController {

    private static final int BRANCH = 1;

    @Autowired
    private PREmployeeLoanService loanRequestService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Integer saveLoanRequest(@RequestBody TEmployeeLoan loanRequest) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        return loanRequestService.saveLoanRequest(loanRequest, branch);
    }
//
//    @RequestMapping(value = "/{number}", method = RequestMethod.GET)
//    public TLoanRequest getLoanRequest(@PathVariable Integer number) {
//        Integer branch = SecurityUtil.getCurrentUser().getBranch();
//        return loanRequestService.getLoanRequest(branch, number);
//    }
//
    @RequestMapping(value = "/pending-requests")
    public List<Object[]> getPendingLoanRequests() {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        return loanRequestService.getPendingLoanRequests(branch);
    }
//
    @RequestMapping(value = "/find-by-loan-detail/{indexNo}", method = RequestMethod.GET)
    public TEmployeeLoanDetail findByTLoanRequestDetailByIndexNo(@PathVariable Integer indexNo) {
        System.out.println(indexNo);
        return loanRequestService.findByTLoanRequestDetailByIndexNo(indexNo);
    }
//
////  check ------------------------------------------------------------------
    @RequestMapping(value = "/check-request-detail", method = RequestMethod.POST)
    public void checkLoanRequestDetail(@RequestBody TEmployeeLoanDetail loanDetail) {
        loanRequestService.checkLoanRequestDetail(loanDetail);
    }
//
//    // approve-----------------------------------------------------------------
    @RequestMapping(value = "/check-pending-requests")
    public List<TEmployeeLoanDetail> getCheckLoanRequests() {
        return loanRequestService.getCheckLoanRequests();
    }
//
    
    @RequestMapping(value = "/approve-request/{indexNo}/{agreementNumber}", method = RequestMethod.GET)
    public void approveLoanRequest(@PathVariable Integer indexNo, @PathVariable String agreementNumber) {
        loanRequestService.approveLoanRequest(indexNo, agreementNumber);
    }
//
    @RequestMapping(value = "/reject-request/{indexNo}", method = RequestMethod.GET)
    public void rejectLoanRequest(@PathVariable Integer indexNo) {
        loanRequestService.rejectRequest(indexNo);
    }

}
