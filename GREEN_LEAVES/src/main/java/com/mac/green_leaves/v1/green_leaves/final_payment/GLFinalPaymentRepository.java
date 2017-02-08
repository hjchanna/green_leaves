/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.final_payment;

import com.mac.green_leaves.v1.green_leaves.final_payment.model.TFinalPayment;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Supervision
 */
@Repository
public interface GLFinalPaymentRepository extends JpaRepository<TFinalPayment, Integer> {

    @Query(
            value
            = "(select\n"
            + "	'B.F' as settlement_type,\n"
            + "	-1 as settlement_order,\n"
            + "	ifnull(sum(t_client_ledger.debit_amount - t_client_ledger.credit_amount),0.0) as debit_total,\n"
            + "	0.0 as credit_total\n"
            + "from\n"
            + "	t_client_ledger\n"
            + "where\n"
            + "	t_client_ledger.branch = :BRANCH\n"
            + "	and t_client_ledger.date < :FROM_DATE\n"
            + "	and t_client_ledger.status = 'ACTIVE')\n"
            + "	\n"
            + "	\n"
            + "union all\n"
            + "\n"
            + "\n"
            + "(select\n"
            + "	t_client_ledger.settlement_type,\n"
            + "	t_client_ledger.settlement_order,\n"
            + "	sum(t_client_ledger.debit_amount) as debit_total,\n"
            + "	sum(t_client_ledger.credit_amount) as credit_total\n"
            + "from\n"
            + "	t_client_ledger\n"
            + "where\n"
            + "	t_client_ledger.branch = :BRANCH\n"
            + "	and t_client_ledger.date between :FROM_DATE and :TO_DATE\n"
            + "	and t_client_ledger.status = 'ACTIVE'\n"
            + "group by\n"
            + "	t_client_ledger.settlement_type)\n"
            + "	\n"
            + "order by\n"
            + "	settlement_order",
            nativeQuery = true)
    public List<Object[]> clientLedgerSummary(
            @Param(value = "FROM_DATE") Date fromDate,
            @Param(value = "TO_DATE") Date toDate,
            @Param(value = "BRANCH") Integer branch);

    @Query(
            value
            = "select\n"
            + "	t_client_ledger.`client`,\n"
            + "	t_client_ledger.settlement_type,\n"
            + "	t_client_ledger.settlement_order,\n"
            + "	sum(t_client_ledger.debit_amount - t_client_ledger.credit_amount) as balance\n"
            + "from\n"
            + "	t_client_ledger\n"
            + "where\n"
            + "	t_client_ledger.branch = :BRANCH\n"
            + "	and t_client_ledger.date <= :TO_DATE\n"
            + "	and t_client_ledger.`status` = 'ACTIVE'\n"
            + "group by\n"
            + "	t_client_ledger.`client`, t_client_ledger.settlement_type\n"
            + "having \n"
            + "	balance > 0\n"
            + "order by\n"
            + "	t_client_ledger.`client`,\n"
            + "	t_client_ledger.settlement_order",
            nativeQuery = true)
    public List<Object[]> clientPayableBalances(
            @Param(value = "TO_DATE") Date toDate,
            @Param(value = "BRANCH") Integer branch);

}
