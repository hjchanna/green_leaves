/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_advance;

import com.mac.green_leaves.v1.exception.EntityNotFoundException;
import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequest;
import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequestDetail;
import com.mac.green_leaves.v1.green_leaves.client_advance.model.TransactionType;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.GLCommonVoucherRepository;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.VoucherLedgerTypes;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.VoucherPaymentTypes;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.VoucherStatus;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.model.TVoucher;
import java.util.List;
import java.util.Locale;
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

    @Autowired
    private GLClientAdvanceRequestRepository clientAdvanceRepository;

    @Autowired
    private TransactionTypeReository transactionTypeReository;

    @Autowired
    private GLClientAdvanceRequestDetailRepository clientAdvanceRequestDetailRepository;

    @Autowired
    private GLCommonVoucherRepository voucherRepository;

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
        TClientAdvanceRequestDetail clientAdvanceRequestDetail = clientAdvanceRequestDetailRepository.getOne(indexNo);
        TClientAdvanceRequest tClientAdvanceRequest = clientAdvanceRequestDetail.getClientAdvanceRequest();

        System.out.println("one detai delete");
        clientAdvanceRequestDetailRepository.delete(indexNo);

        //TClientAdvanceRequestDetail is emplty delete tClientAdvanceRequest
        if (tClientAdvanceRequest.getClientAdvanceRequestDetails().isEmpty()) {
            System.out.println("full detail delete");
            clientAdvanceRepository.delete(tClientAdvanceRequest);
        }
    }

    public List<TClientAdvanceRequest> getPendingAdvanceRequests(Integer branch) {
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

      //TODO:client ledger entry
    }

    public void rejectAdvanceRequestDetail(Integer indexNo) {
        TClientAdvanceRequestDetail advanceRequestDetail = clientAdvanceRequestDetailRepository.findOne(indexNo);
        advanceRequestDetail.setStatus(ADVANCE_REQUEST_STATUS_REJECTED);
        clientAdvanceRequestDetailRepository.save(advanceRequestDetail);

        //TODO:update summary
        //TODO:voucer entry
    }

    public List<Object[]> findByBranchAndDateAndClient(Integer branch, Date date, Integer client) {
        return clientAdvanceRepository.findByBranchAndDateAndClient(branch, date, client);
    }

    public List<Object[]> findByBranchAndRouteDateAndClient(Integer branch, Integer route, Date date, Integer client) {

        String year = new SimpleDateFormat("yyy").format(date);
        String month = new SimpleDateFormat("MM").format(date);

        //get month days count
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int monthMaxDays = cal.getActualMaximum(Calendar.DAY_OF_MONTH);

        //get db data 
        List<Object[]> getDbData = clientAdvanceRepository.findGreenLeavesReceive(branch, route, date, client);

        //return chart data
        List<Object[]> chartData = new ArrayList<>();
        for (int i = 0; i <= monthMaxDays; i++) {
            chartData.add(new Object[]{i, 0, 0});
        }

        //get monthly dates
        for (int i = 1; i <= monthMaxDays; i++) {
            String tempDate = "";
            if (i < 10) {
                tempDate = year + "-" + month + "-0" + i;
            } else {
                tempDate = year + "-" + month + "-" + i;
            }
            
            //db date and get data mach and add new
            for (int j = 0; j < getDbData.size(); j++) {
                if (tempDate.equals(new SimpleDateFormat("yyy-MM-dd").format(getDbData.get(j)[0]))) {
                    chartData.set(i, new Object[]{i, getDbData.get(j)[1], getDbData.get(j)[2]});
                }
            }
        }
        return chartData;
    }

    List<TransactionType> findTransactionTypeAll() {
        return transactionTypeReository.findAll();
    }

    public TClientAdvanceRequest findByBranchAndRouteAndDate(Integer branch, Integer route, Date date) {
        List<TClientAdvanceRequest> advanceRequests = clientAdvanceRepository.findByBranchAndRouteAndDate(branch, route, date);
        if (advanceRequests.isEmpty()) {
            throw new EntityNotFoundException("Green Leaves Client Request Not Found");
        }
        return advanceRequests.get(0);
    }

}
