/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_loan;

import com.mac.green_leaves.v1.green_leaves.client_loan.model.TLoanRequest;
import com.mac.green_leaves.v1.green_leaves.client_loan.model.TLoanRequestDetail;
import java.math.BigDecimal;
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

    public static final String LOAN_REQUEST_STATUS_ACTIVE = "ACTIVE";
    //
    public static final String LOAN_REQUEST_DETAIL_STATUS_PENDING = "PENDING";
    public static final String LOAN_REQUEST_DETAIL_STATUS_CHECKED = "CHECKED";
    public static final String LOAN_REQUEST_DETAIL_STATUS_APPROVED = "APPROVED";
    public static final String LOAN_REQUEST_DETAIL_STATUS_REJECTED = "REJECTED";
    //

    @Autowired
    private GLLoanRequestRepository loanRequestRepository;

    @Autowired
    private GLLoanRequestDetailRepository loanRequestDetailRepository;

    @Transactional
    public Integer saveLoanRequest(TLoanRequest loanRequest, Integer branch) {

        for (TLoanRequestDetail loanRequestDetail : loanRequest.getLoanRequestDetails()) {
            loanRequestDetail.setStatus(LOAN_REQUEST_DETAIL_STATUS_PENDING);
            loanRequestDetail.setInstallmentAmount(null);
            loanRequestDetail.setInterestRate(BigDecimal.ZERO);
            loanRequestDetail.setLoanStartDate(null);
            loanRequestDetail.setPanaltyRate(BigDecimal.ZERO);
            loanRequestDetail.setLoanRequest(loanRequest);
        }

        loanRequest.setBranch(branch);
        Integer maxNumber = loanRequestRepository.getMaxNumber(branch);
        if (maxNumber == null) {
            maxNumber = 0;
        }
        maxNumber++;
        loanRequest.setNumber(maxNumber);

        loanRequest.setStatus(LOAN_REQUEST_STATUS_ACTIVE);
        loanRequest = loanRequestRepository.save(loanRequest);
        return loanRequest.getIndexNo();
    }

    //check------------------------
    public List<Object[]> getPendingLoanRequests(Integer branch) {
        return loanRequestRepository.findByBranchAndStatus(branch, LOAN_REQUEST_DETAIL_STATUS_PENDING);
    }

    @Transactional
    public void checkLoanRequestDetail(TLoanRequestDetail loanRequestDetail) {
        TLoanRequestDetail requestDetail = loanRequestDetailRepository.findOne(loanRequestDetail.getIndexNo());

        requestDetail.setInterestRate(loanRequestDetail.getInterestRate());
        requestDetail.setPanaltyRate(loanRequestDetail.getPanaltyRate());
        requestDetail.setInstallmentCount(loanRequestDetail.getInstallmentCount());

        double loanAmount = requestDetail.getAmount().doubleValue();
        double interestRate = requestDetail.getInterestRate().doubleValue() / 100.0 / 12.0;
        int installmentCount = requestDetail.getInstallmentCount();

        double installmentAmount = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, installmentCount * -1));
        requestDetail.setInstallmentAmount(BigDecimal.valueOf(installmentAmount));

        requestDetail.setStatus(LOAN_REQUEST_DETAIL_STATUS_CHECKED);

        loanRequestDetailRepository.save(requestDetail);
    }

    //approve----------------------------------------------
    public List<TLoanRequestDetail> getCheckLoanRequests() {
        return loanRequestDetailRepository.findByStatus(LOAN_REQUEST_DETAIL_STATUS_CHECKED);
    }

    @Transactional
    public void approveLoanRequest(Integer indexNo, String agreementNumber) {
        TLoanRequestDetail loanRequestDetail = loanRequestDetailRepository.findOne(indexNo);
        loanRequestDetail.setStatus(LOAN_REQUEST_DETAIL_STATUS_APPROVED);
        loanRequestDetail.setAgreementNumber(agreementNumber);
        loanRequestDetailRepository.save(loanRequestDetail);
    }

    @Transactional
    public void rejectRequest(Integer indexNo, String agreementNumber) {
        TLoanRequestDetail loanRequestDetail = loanRequestDetailRepository.findOne(indexNo);
        loanRequestDetail.setStatus(LOAN_REQUEST_DETAIL_STATUS_REJECTED);
        loanRequestDetail.setAgreementNumber(agreementNumber);
        loanRequestDetailRepository.save(loanRequestDetail);
    }

    public TLoanRequestDetail findByTLoanRequestDetailByIndexNo(Integer indexNo) {
        return loanRequestDetailRepository.findOne(indexNo);
    }

}
