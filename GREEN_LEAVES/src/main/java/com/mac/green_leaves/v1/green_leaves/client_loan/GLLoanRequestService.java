/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_loan;

import com.mac.green_leaves.v1.green_leaves.client_loan.model.TLoanRequest;
import com.mac.green_leaves.v1.green_leaves.client_loan.model.TLoanRequestDetail;
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
    public static final String LOAN_REQUEST_STATUS_APPROVE = "APPROVE";
    public static final String LOAN_REQUEST_STATUS_REJECT = "REJECT";

    @Autowired
    private GLLoanRequestRepository loanRequestRepository;

    @Autowired
    private GLLoanRequestDetailRepository loanRequestDetailRepository;

    @Transactional
    public Integer saveLoanRequest(TLoanRequest loanRequest, Integer branch) {

        for (TLoanRequestDetail loanRequestDetail : loanRequest.getLoanRequestDetails()) {
            loanRequestDetail.setStatus(LOAN_REQUEST_STATUS_PENDING);
            loanRequestDetail.setStatus2(LOAN_REQUEST_STATUS_PENDING);
            loanRequestDetail.setInstallmentAmount(null);
            loanRequestDetail.setInstallmentCount(0);
            loanRequestDetail.setInterestRate(null);
            loanRequestDetail.setLoanStartDate(null);
            loanRequestDetail.setPanaltyRate(null);
            loanRequestDetail.setLoanRequest(loanRequest);
        }

        loanRequest.setBranch(branch);
        loanRequest.setStatus(LOAN_REQUEST_STATUS_PENDING);
        loanRequest.setStatus2(LOAN_REQUEST_STATUS_PENDING);
        loanRequest = loanRequestRepository.save(loanRequest);
        return loanRequest.getIndexNo();
    }

    public List<TLoanRequest> getPendingLoanRequests(Integer branch) {
        return loanRequestRepository.findByBranchAndStatus(branch, LOAN_REQUEST_STATUS_PENDING);
    }

    //check------------------------
    public void checkLoanRequestDetail(TLoanRequestDetail loanRequestDetail) {
        TLoanRequestDetail requestDetail = loanRequestDetailRepository.findOne(loanRequestDetail.getIndexNo());
        requestDetail.setStatus(LOAN_REQUEST_STATUS_CHECK);
        requestDetail.setLoanStartDate(loanRequestDetail.getLoanStartDate());
        requestDetail.setInterestRate(loanRequestDetail.getInterestRate());
        requestDetail.setInstallmentAmount(loanRequestDetail.getInstallmentAmount());
        requestDetail.setInstallmentCount(loanRequestDetail.getInstallmentCount());
        requestDetail.setPanaltyRate(loanRequestDetail.getPanaltyRate());

        TLoanRequestDetail detail = loanRequestDetailRepository.save(requestDetail);

        List<TLoanRequestDetail> pendinList = loanRequestDetailRepository.findByStatusAndLoanRequestIndexNo(LOAN_REQUEST_STATUS_PENDING, detail.getLoanRequest().getIndexNo());
        if (pendinList.size() > 0) {
        } else {
            TLoanRequest loanRequest = loanRequestRepository.findOne(detail.getLoanRequest().getIndexNo());
            if (loanRequest != null) {
                loanRequest.setStatus(LOAN_REQUEST_STATUS_CHECK);
                loanRequestRepository.save(loanRequest);
            }
        }
    }

    //approve----------------------------------------------
    public List<TLoanRequestDetail> getCheckLoanRequests() {
//        return loanRequestDetailRepository.findByStatusAndStatus2(LOAN_REQUEST_STATUS_CHECK,LOAN_REQUEST_STATUS_PENDING);
        return loanRequestDetailRepository.findByStatusAndStatus2(LOAN_REQUEST_STATUS_CHECK, LOAN_REQUEST_STATUS_PENDING);
    }

    public void approveLoanRequest(TLoanRequestDetail loanRequestDetail) {
        TLoanRequestDetail requestDetail = loanRequestDetailRepository.findOne(loanRequestDetail.getIndexNo());
        requestDetail.setStatus2(LOAN_REQUEST_STATUS_APPROVE);
        requestDetail.setLoanStartDate(loanRequestDetail.getLoanStartDate());
        requestDetail.setInterestRate(loanRequestDetail.getInterestRate());
        requestDetail.setInstallmentAmount(loanRequestDetail.getInstallmentAmount());
        requestDetail.setInstallmentCount(loanRequestDetail.getInstallmentCount());
        requestDetail.setPanaltyRate(loanRequestDetail.getPanaltyRate());

        TLoanRequestDetail detail = loanRequestDetailRepository.save(requestDetail);

        List<TLoanRequestDetail> pendinList = loanRequestDetailRepository.findByStatusAndLoanRequestIndexNo(LOAN_REQUEST_STATUS_CHECK, detail.getLoanRequest().getIndexNo());
        if (pendinList.size() > 0) {
        } else {
            TLoanRequest loanRequest = loanRequestRepository.findOne(detail.getLoanRequest().getIndexNo());
            if (loanRequest != null) {
                loanRequest.setStatus2(LOAN_REQUEST_STATUS_APPROVE);
                loanRequestRepository.save(loanRequest);
            }
        }

    }

    public void rejectRequest(Integer indexNo) {
        TLoanRequestDetail loanRequestDetail = loanRequestDetailRepository.findOne(indexNo);
        loanRequestDetail.setStatus2(LOAN_REQUEST_STATUS_REJECT);
        loanRequestDetailRepository.save(loanRequestDetail);
    }

}
