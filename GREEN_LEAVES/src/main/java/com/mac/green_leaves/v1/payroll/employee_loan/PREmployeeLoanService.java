/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_loan;

import com.mac.green_leaves.v1.payroll.employee_loan.model.TEmployeeLoan;
import com.mac.green_leaves.v1.payroll.employee_loan.model.TEmployeeLoanDetail;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author L T430
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class PREmployeeLoanService {
    public static final String LOAN_REQUEST_STATUS_ACTIVE = "ACTIVE";
    //
    public static final String LOAN_REQUEST_DETAIL_STATUS_PENDING = "PENDING";
    public static final String LOAN_REQUEST_DETAIL_STATUS_CHECKED = "CHECKED";
    public static final String LOAN_REQUEST_DETAIL_STATUS_APPROVED = "APPROVED";
    public static final String LOAN_REQUEST_DETAIL_STATUS_REJECTED = "REJECTED";
    //

    @Autowired
    private PREmployeeLoanDetailRepository detailRepository;
//
    @Autowired
    private PREmployeeLoanRepository employeeLoanRepository;
//
    @Transactional
    public Integer saveLoanRequest(TEmployeeLoan loanRequest, Integer branch) {

        for (TEmployeeLoanDetail loanRequestDetail : loanRequest.getLoanRequestDetails()) {
            loanRequestDetail.setStatus(LOAN_REQUEST_DETAIL_STATUS_PENDING);
            loanRequestDetail.setInstallmentAmount(null);
            loanRequestDetail.setInterestRate(BigDecimal.ZERO);
            loanRequestDetail.setLoanStartDate(null);
            loanRequestDetail.setPanaltyRate(BigDecimal.ZERO);
            loanRequestDetail.setLoanRequest(loanRequest);
            loanRequestDetail.setAgreementNumber("0");//value assign loan approve level
        }

        loanRequest.setBranch(branch);
        Integer maxNumber = employeeLoanRepository.getMaxNumber(branch);
        if (maxNumber == null) {
            maxNumber = 0;
        }
        maxNumber++;
        loanRequest.setNumber(maxNumber);

        loanRequest.setStatus(LOAN_REQUEST_STATUS_ACTIVE);
        loanRequest = employeeLoanRepository.save(loanRequest);
        return loanRequest.getIndexNo();
    }
//
//    //check------------------------
    public List<Object[]> getPendingLoanRequests(Integer branch) {
        return employeeLoanRepository.findByBranchAndStatus(branch, LOAN_REQUEST_DETAIL_STATUS_PENDING);
    }
//
//    @Transactional
    public void checkLoanRequestDetail(TEmployeeLoanDetail loanRequestDetail) {
        TEmployeeLoanDetail requestDetail = findByTLoanRequestDetailByIndexNo(loanRequestDetail.getIndexNo());

        requestDetail.setInterestRate(loanRequestDetail.getInterestRate());
        requestDetail.setPanaltyRate(loanRequestDetail.getPanaltyRate());
        requestDetail.setInstallmentCount(loanRequestDetail.getInstallmentCount());

        double loanAmount = requestDetail.getAmount().doubleValue();
        double interestRate = requestDetail.getInterestRate().doubleValue() / 100.0 / 12.0;
        int installmentCount = requestDetail.getInstallmentCount();

        double installmentAmount = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, installmentCount * -1));
        requestDetail.setInstallmentAmount(BigDecimal.valueOf(installmentAmount));

        requestDetail.setStatus(LOAN_REQUEST_DETAIL_STATUS_CHECKED);

        detailRepository.save(requestDetail);
    }
//
//    //approve----------------------------------------------
    public List<TEmployeeLoanDetail> getCheckLoanRequests() {
        return detailRepository.findByStatus(LOAN_REQUEST_DETAIL_STATUS_CHECKED);
    }
//
    @Transactional
    public void approveLoanRequest(Integer indexNo, String agreementNumber) {
        TEmployeeLoanDetail loanRequestDetail = findByTLoanRequestDetailByIndexNo(indexNo);
        loanRequestDetail.setStatus(LOAN_REQUEST_DETAIL_STATUS_APPROVED);
        loanRequestDetail.setAgreementNumber(agreementNumber);
        detailRepository.save(loanRequestDetail);
    }
//
    @Transactional
    public void rejectRequest(Integer indexNo) {
        TEmployeeLoanDetail loanRequestDetail = findByTLoanRequestDetailByIndexNo(indexNo);
        loanRequestDetail.setStatus(LOAN_REQUEST_DETAIL_STATUS_REJECTED);
        detailRepository.save(loanRequestDetail);
    }
//
    public TEmployeeLoanDetail findByTLoanRequestDetailByIndexNo(Integer indexNo) {
        return detailRepository.findOne(indexNo);
    }
//
//    TLoanRequest getLoanRequest(Integer branch, Integer number) {
//        List<TLoanRequest> receives = loanRequestRepository.findByBranchAndNumberAndStatus(branch, number, LOAN_REQUEST_DETAIL_STATUS_PENDING);
//        if (receives.isEmpty()) {
//            throw new EntityNotFoundException("Loand not found for number " + number);
//        }
//        return receives.get(0);
//    }
}
