/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_advance;

import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequest;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeigh;
import java.util.Date;
import java.util.List;
import javax.persistence.TemporalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author Mohan
 */
public interface GLClientAdvanceRequestRepository extends JpaRepository<TClientAdvanceRequest, Integer> {

    public List<TClientAdvanceRequest> findByNumberAndBranch(Integer number, Integer branch);

    @Query(value = "SELECT MAX(number) FROM t_client_advance_request WHERE branch=:branch", nativeQuery = true)
    public Integer getMaximumNumberByBranch(@Param("branch") Integer branch);

    public List<TClientAdvanceRequest> findByBranchAndStatus(Integer branch, String status);

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
}
