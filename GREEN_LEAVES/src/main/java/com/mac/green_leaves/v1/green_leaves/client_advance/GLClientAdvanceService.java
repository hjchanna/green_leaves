/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_advance;

import com.mac.green_leaves.v1.zexception.EntityNotFoundException;
import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequest;
import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequestDetail;
import com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger.ClientLedgerSettlementTypes;
import com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger.ClientLedgerStatus;
import com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger.GLCommonClientLedgerRepository;
import com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger.model.TClientLedger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.GLCommonVoucherRepository;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.VoucherLedgerTypes;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.VoucherPaymentTypes;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.VoucherStatus;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.model.TVoucher;
import java.math.BigDecimal;
import java.util.Calendar;
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
public class GLClientAdvanceService {

    public static final String ADVANCE_REQUEST_STATUS_PENDING = "PENDING";
    public static final String ADVANCE_REQUEST_STATUS_APPROVED = "APPROVED";
    public static final String ADVANCE_REQUEST_STATUS_REJECTED = "REJECTED";
    public static final String ADVANCE_REQUEST_STATUS_DELETED = "DELETED";

    @Autowired
    private GLClientAdvanceRequestRepository clientAdvanceRepository;

    @Autowired
    private GLCommonClientLedgerRepository clientLedgerRepository;
//
//    @Autowired
//    private TransactionTypeReository transactionTypeReository;

    @Autowired
    private GLClientAdvanceRequestDetailRepository clientAdvanceRequestDetailRepository;

    @Autowired
    private GLCommonVoucherRepository voucherRepository;

    //request
    public TClientAdvanceRequest getAdvanceRequestByNumber(Integer number, Integer branch) {
        List<TClientAdvanceRequest> clientAdvanceRequests = clientAdvanceRepository.findByNumberAndBranch(number, branch);

        if (clientAdvanceRequests.isEmpty()) {
            throw new EntityNotFoundException("Client advance request not found for number " + number);
        }

        return clientAdvanceRequests.get(0);
    }

    @Transactional
    public Integer saveAdvanceRequest(TClientAdvanceRequest clientAdvanceRequest, Integer branch) {
        if (clientAdvanceRequest.getIndexNo() == null) {//new
            Integer newNumber = clientAdvanceRepository.getMaximumNumberByBranch(branch);
            newNumber = newNumber == null ? 0 : newNumber;
            clientAdvanceRequest.setNumber(newNumber + 1);
        }

        for (TClientAdvanceRequestDetail clientAdvanceRequestDetail : clientAdvanceRequest.getClientAdvanceRequestDetails()) {
            clientAdvanceRequestDetail.setClientAdvanceRequest(clientAdvanceRequest);
        }

        clientAdvanceRequest.setBranch(branch);
        clientAdvanceRequest.setStatus(ADVANCE_REQUEST_STATUS_PENDING);
        clientAdvanceRequest = clientAdvanceRepository.save(clientAdvanceRequest);
        return clientAdvanceRequest.getIndexNo();
    }

    @Transactional
    public void deleteAdvanceRequest(Integer indexNo) {
        clientAdvanceRepository.delete(indexNo);
    }

//    @Transactional
//    public void deleteAdvanceRequestDetail(Integer indexNo) {
//        TClientAdvanceRequestDetail clientAdvanceRequestDetail = clientAdvanceRequestDetailRepository.getOne(indexNo);
//        TClientAdvanceRequest tClientAdvanceRequest = clientAdvanceRequestDetail.getClientAdvanceRequest();
//
//        System.out.println("one detai delete");
//        clientAdvanceRequestDetailRepository.delete(indexNo);
//        
//        //TClientAdvanceRequestDetail is emplty delete tClientAdvanceRequest
//        if (tClientAdvanceRequest.getClientAdvanceRequestDetails().isEmpty()) {
//            System.out.println("full detail delete");
//            clientAdvanceRepository.delete(tClientAdvanceRequest);
//        }
//    }
    @Transactional
    public void deleteAdvanceRequestDetail(Integer indexNo) {
        TClientAdvanceRequestDetail advanceRequestDetail = clientAdvanceRequestDetailRepository.getOne(indexNo);
        TClientAdvanceRequest advanceRequest = advanceRequestDetail.getClientAdvanceRequest();

        advanceRequest.getClientAdvanceRequestDetails().remove(advanceRequestDetail);
        clientAdvanceRequestDetailRepository.delete(advanceRequestDetail);

        if (advanceRequest.getClientAdvanceRequestDetails().isEmpty()) {
            advanceRequest.setStatus(ADVANCE_REQUEST_STATUS_DELETED);
            clientAdvanceRepository.save(advanceRequest);
        }
    }

    public List<Object[]> getPendingAdvanceRequests(Integer branch) {
        return clientAdvanceRepository.findByBranchAndStatus(branch, ADVANCE_REQUEST_STATUS_PENDING);
    }

    //approve
    @Transactional
    public void approveAdvanceRequestDetail(Integer indexNo) {
        TClientAdvanceRequestDetail advanceRequestDetail = clientAdvanceRequestDetailRepository.findOne(indexNo);
        advanceRequestDetail.setStatus(ADVANCE_REQUEST_STATUS_APPROVED);
        clientAdvanceRequestDetailRepository.save(advanceRequestDetail);

        //voucher entry
        TVoucher voucher = new TVoucher();
        voucher.setBranch(advanceRequestDetail.getClientAdvanceRequest().getBranch());
        voucher.setTransaction(0);//TODO:
        voucher.setTransactionType(null);
        voucher.setDate(advanceRequestDetail.getClientAdvanceRequest().getDate());
        voucher.setClient(advanceRequestDetail.getClient());
        voucher.setDescription("Supplier advance");
        voucher.setAmount(advanceRequestDetail.getAmount());
        voucher.setPaymentType(VoucherPaymentTypes.CASH);
        voucher.setLegerType(VoucherLedgerTypes.SUPPLIER_ADVANCE);
        voucher.setStatus(VoucherStatus.ACTIVE);
        voucherRepository.save(voucher);

        //client ledger entry
        TClientLedger clientLedger = newClientLedger(
                ClientLedgerSettlementTypes.ADVANCE.getSettlementType(),
                ClientLedgerSettlementTypes.ADVANCE.getSettlementOrder(),
                advanceRequestDetail.getClient(),
                0.0,
                advanceRequestDetail.getAmount().doubleValue());
        clientLedger.setBranch(advanceRequestDetail.getClientAdvanceRequest().getBranch());
        clientLedger.setTransaction(0);
        clientLedger.setDate(advanceRequestDetail.getAsAtDate());
        clientLedger.setStatus(ClientLedgerStatus.ACTIVE);
        clientLedgerRepository.save(clientLedger);
    }

    public void rejectAdvanceRequestDetail(Integer indexNo) {
        TClientAdvanceRequestDetail advanceRequestDetail = clientAdvanceRequestDetailRepository.findOne(indexNo);
        advanceRequestDetail.setStatus(ADVANCE_REQUEST_STATUS_REJECTED);
        clientAdvanceRequestDetailRepository.save(advanceRequestDetail);

        //TODO:update summary
        //TODO:voucer entry
    }

    private TClientLedger newClientLedger(
            String settlementType,
            Integer settlementOrder,
            Integer client,
            Double debitAmount,
            Double creditAmount
    ) {
        TClientLedger clientLedger = new TClientLedger();

        clientLedger.setSettlementType(settlementType);
        clientLedger.setSettlementOrder(settlementOrder);
        clientLedger.setClient(client);
        clientLedger.setDebitAmount(BigDecimal.valueOf(debitAmount));
        clientLedger.setCreditAmount(BigDecimal.valueOf(creditAmount));

        return clientLedger;
    }

    List<TClientAdvanceRequest> getPendingAdvanceRequests(Integer branch, Integer route) {
        return clientAdvanceRepository.findByBranchAndRouteAndStatus(branch, route, ADVANCE_REQUEST_STATUS_PENDING);
    }

    public void updateAdvanceRequestAmount(Integer indexNo, BigDecimal amount) {
        TClientAdvanceRequestDetail advanceRequestDetail = clientAdvanceRequestDetailRepository.findOne(indexNo);
        advanceRequestDetail.setAmount(amount);
        clientAdvanceRequestDetailRepository.save(advanceRequestDetail);
    }
}
