/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_advance;

import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.GLCommonVoucherRepository;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.VoucherLedgerTypes;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.VoucherPaymentTypes;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.VoucherStatus;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.model.TVoucher;
import com.mac.green_leaves.v1.payroll.employee_advance.model.TEmployeeAdvanceRequest;
import com.mac.green_leaves.v1.payroll.employee_advance.model.TEmployeeAdvanceRequestDetails;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
import java.util.Date;
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
public class PREmployeeAdvanceService {

    public static final String ADVANCE_REQUEST_STATUS_PENDING = "PENDING";
    public static final String ADVANCE_REQUEST_STATUS_APPROVED = "APPROVED";
    public static final String ADVANCE_REQUEST_STATUS_REJECTED = "REJECTED";

    @Autowired
    private PREmployeeAdvanceRequestRepository advanceRequestRepository;

    @Autowired
    private PREmployeeAdvanceRequestDetailRepository detailRepository;
    
     @Autowired
    private GLCommonVoucherRepository voucherRepository;

    TEmployeeAdvanceRequest saveAdvanceRequest(TEmployeeAdvanceRequest employeeAdvanceRequest) {
        
        for (TEmployeeAdvanceRequestDetails details : employeeAdvanceRequest.getEmployeeAdvanceRequestDetail()) {
            details.setAdvanceRequest(employeeAdvanceRequest);
        }
        
        advanceRequestRepository.save(employeeAdvanceRequest);
        return employeeAdvanceRequest;
        
    }

    List<Object[]> getPendingAdvanceRequests(Integer branch) {
        return advanceRequestRepository.findByStatusAndBranch(ADVANCE_REQUEST_STATUS_PENDING, branch);
    }

    List<TEmployeeAdvanceRequestDetails> getPendingAdvanceRequestList(Integer branch) {
        return detailRepository.findByStatusAndAdvanceRequestBranch(ADVANCE_REQUEST_STATUS_PENDING, branch);
    }

    List<TEmployeeAdvanceRequestDetails> getPendingAdvanceRequestList(Integer branch, Date date) {
        return detailRepository.findByStatusAndAdvanceRequestBranchAndAdvanceRequestDate(ADVANCE_REQUEST_STATUS_PENDING, branch, date);
    }

    @Transactional
    void approveAdvanceRequestDetail(Integer indexNo) {
        TEmployeeAdvanceRequestDetails advanceRequestDetails = detailRepository.findOne(indexNo);
        advanceRequestDetails.setStatus(ADVANCE_REQUEST_STATUS_APPROVED);
        detailRepository.save(advanceRequestDetails);

        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        List<TEmployeeAdvanceRequestDetails> pendingRequests = getPendingAdvanceRequestList(branch, advanceRequestDetails.getAsAtDate());
        TEmployeeAdvanceRequest advanceRequest=new TEmployeeAdvanceRequest();
        if (pendingRequests.isEmpty()) {
            advanceRequest = advanceRequestRepository.findOne(advanceRequestDetails.getAdvanceRequest().getIndexNo());
            advanceRequest.setStatus(ADVANCE_REQUEST_STATUS_APPROVED);
            advanceRequestRepository.save(advanceRequest);
        }
        
         //voucher entry
        TVoucher voucher = new TVoucher();
        voucher.setBranch(advanceRequest.getBranch());
        voucher.setTransaction(0);//TODO:
        voucher.setTransactionType(2);//TODO:
        voucher.setDate(new Date());
        voucher.setEmployee(advanceRequestDetails.getEmployee());
        voucher.setDescription("Employee advance");
        voucher.setAmount(advanceRequestDetails.getAmount());
        voucher.setPaymentType(VoucherPaymentTypes.CASH);
        voucher.setLegerType(VoucherLedgerTypes.EMPLOYEE_ADVANCE);
        voucher.setStatus(VoucherStatus.ACTIVE);
        voucherRepository.save(voucher);
    }
    @Transactional
    void rejectAdvanceRequestDetail(Integer indexNo) {
        TEmployeeAdvanceRequestDetails advanceRequestDetails = detailRepository.findOne(indexNo);
        advanceRequestDetails.setStatus(ADVANCE_REQUEST_STATUS_REJECTED);
        detailRepository.save(advanceRequestDetails);

        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        List<TEmployeeAdvanceRequestDetails> pendingRequests = getPendingAdvanceRequestList(branch, advanceRequestDetails.getAsAtDate());
        if (pendingRequests.isEmpty()) {
            TEmployeeAdvanceRequest advanceRequest = advanceRequestRepository.findOne(advanceRequestDetails.getAdvanceRequest().getIndexNo());
            advanceRequest.setStatus(ADVANCE_REQUEST_STATUS_APPROVED);
            advanceRequestRepository.save(advanceRequest);
        }
    }

}
