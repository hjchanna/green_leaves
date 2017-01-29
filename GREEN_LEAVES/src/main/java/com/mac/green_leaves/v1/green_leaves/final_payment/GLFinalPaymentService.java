/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.final_payment;

import com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger.model.TClientLedger;
import com.mac.green_leaves.v1.green_leaves.zcommon.voucher.model.TVoucher;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Supervision
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class GLFinalPaymentService {

    @Autowired
    private GLFinalPaymentRepository finalPaymentRepository;

    public List<Object[]> listClientLedgerSummary(Integer branch, Integer year, Integer month) {
        return finalPaymentRepository.clientLedgerSummary(
                getFirstDateForMonth(year, month),
                getLastDateForMonth(year, month),
                branch);
    }

    @Transactional
    public void save(Integer branch, Integer year, Integer month) {
        Date fromDate = getFirstDateForMonth(year, month);
        Date toDate = getLastDateForMonth(year, month);

        List<Object[]> clientPayableBalances = finalPaymentRepository.clientPayableBalances(toDate, branch);

        Integer size = clientPayableBalances.size();
        Double voucherTotal = 0.0;
        List<TClientLedger> clientLedgers = new ArrayList<>();
        List<TVoucher> vouchers = new ArrayList<>();
        //
        Integer client;
        String settlementType;
        Integer settlementOrder;
        Double balance;
        for (int i = 0; i < size; i++) {
            //current payable balance
            Object[] clientPayableBalance = clientPayableBalances.get(i);
            //next payable balance
            Object[] nextClientPayableBalance = i < size - 1 ? clientPayableBalances.get(i + 1) : null;

            //read data
            client = (Integer) clientPayableBalance[0];
            settlementType = (String) clientPayableBalance[1];
            settlementOrder = (Integer) clientPayableBalance[2];
            balance = ((BigDecimal) clientPayableBalance[3]).doubleValue();

            //create client ledger for settlement settlement
            clientLedgers.add(
                    newClientLedger(
                            settlementType,
                            settlementOrder,
                            client,
                            0.0,
                            balance
                    ));

            voucherTotal = voucherTotal + balance;

            //create voucher
            if (nextClientPayableBalance == null || !client.equals(nextClientPayableBalance[0])) {
                vouchers.add(newVoucher(client, "Green Leaves Payment", voucherTotal, "CASH"));

                //reset voucher total
                voucherTotal = 0.0;
            }
        }

        //save client ledger
        for (TClientLedger clientLedger : clientLedgers) {

        }

        //save vouchers
        for (TVoucher voucher : vouchers) {

        }
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

    private TVoucher newVoucher(
            Integer client,
            String description,
            Double amount,
            String paymentType
    ) {
        TVoucher voucher = new TVoucher();
        voucher.setClient(client);
        voucher.setDescription(description);
        voucher.setAmount(BigDecimal.valueOf(amount));
        voucher.setPaymentType(paymentType);

        return voucher;
    }

    private Date getFirstDateForMonth(Integer year, Integer month) {
        Calendar fromC = Calendar.getInstance();
        fromC.set(Calendar.YEAR, year);
        fromC.set(Calendar.MONTH, month - 1);

        fromC.set(Calendar.DAY_OF_MONTH, fromC.getActualMinimum(Calendar.DAY_OF_MONTH));

        return fromC.getTime();
    }

    private Date getLastDateForMonth(Integer year, Integer month) {
        Calendar fromC = Calendar.getInstance();
        fromC.set(Calendar.YEAR, year);
        fromC.set(Calendar.MONTH, month - 1);

        fromC.set(Calendar.DAY_OF_MONTH, fromC.getActualMaximum(Calendar.DAY_OF_MONTH));

        return fromC.getTime();
    }

}
