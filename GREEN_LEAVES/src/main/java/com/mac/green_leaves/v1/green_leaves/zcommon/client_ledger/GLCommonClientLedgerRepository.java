/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger;

import com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger.model.TClientLedger;
import java.util.Date;
import java.util.List;
import javax.persistence.TemporalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author hjcha
 */
public interface GLCommonClientLedgerRepository extends JpaRepository<TClientLedger, Integer> {

    @Query(
            value
            = "select \n"
            + "	t_client_ledger.date,\n"
            + "	t_client_ledger.settlement_type,\n"
            + "	t_client_ledger.debit_amount,\n"
            + "	t_client_ledger.credit_amount\n"
            + "from\n"
            + "	t_client_ledger\n"
            + "where \n"
            + "	t_client_ledger.branch = :branch\n"
            + "	and t_client_ledger.`client` = :client\n"
            + "	and t_client_ledger.date between :from_date and :to_date\n"
            + "order by\n"
            + "	t_client_ledger.settlement_order",
            nativeQuery = true
    )
    public List<Object[]> clientLedgerHistory(
            @Param("client") Integer client,
            @Param("from_date") Date fromDate,
            @Param("to_date") Date toDate,
            @Param("branch") Integer branch
    );

    @Query(value = "select\n"
            + "  cast(ifnull(sum(receive_detail.normal_leaves_quantity),0.0) as decimal(10,4)),\n"
            + "  cast(ifnull(sum(receive_detail.super_leaves_quantity),0.0) as decimal(10,4)) \n"
            + "from\n"
            + "	t_green_leaves_receive receive\n"
            + "	left join t_green_leaves_receive_detail receive_detail on receive.index_no = receive_detail.green_leaves_receive\n"
            + "where\n"
            + "	receive.branch = :branch \n"
            + "	and receive.`status` <> 'DELETED'\n"
            + "	and month(receive.date) = month(:date)\n"
            + "	and receive_detail.`client` = :client", nativeQuery = true
    )
    public List<Object[]> findGreenLeavesReceiveSummary(@Param("branch") Integer branch, @Param("date") @Temporal(TemporalType.DATE) Date date, @Param("client") Integer client);

}
