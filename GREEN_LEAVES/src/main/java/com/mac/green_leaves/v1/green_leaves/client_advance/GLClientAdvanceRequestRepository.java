/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_advance;

import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequest;
import java.util.Date;
import java.util.List;
import javax.persistence.TemporalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mohan
 */
public interface GLClientAdvanceRequestRepository extends JpaRepository<TClientAdvanceRequest, Integer> {

    public List<TClientAdvanceRequest> findByNumberAndBranch(Integer number, Integer branch);

    @Query(value = "SELECT MAX(number) FROM t_client_advance_request WHERE branch=:branch", nativeQuery = true)
    public Integer getMaximumNumberByBranch(@Param("branch") Integer branch);

    @Query(value = "SELECT\n"
            + "route,\n"
            + "SUM(t_client_advance_request_detail.amount),\n"
            + "COUNT(*)\n"
            + "FROM\n"
            + "t_client_advance_request\n"
            + "INNER JOIN t_client_advance_request_detail\n"
            + "ON t_client_advance_request_detail.client_advance_request = t_client_advance_request.index_no\n"
            + "WHERE t_client_advance_request_detail.status = :status AND t_client_advance_request.branch = :branch\n"
            + "GROUP BY t_client_advance_request.route", nativeQuery = true)
    public List<Object[]> findByBranchAndStatus(@Param("branch") Integer branch, @Param("status") String status);

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

    @Query(value = "SELECT t_green_leaves_receive.date,t_green_leaves_receive_detail.normal_leaves_quantity,t_green_leaves_receive_detail.super_leaves_quantity\n"
            + "FROM t_green_leaves_receive LEFT JOIN t_green_leaves_receive_detail ON t_green_leaves_receive.index_no = t_green_leaves_receive_detail.green_leaves_receive\n"
            + "WHERE branch = :branch AND route = :route \n"
            + "AND YEAR(t_green_leaves_receive.date) = year(:date) \n"
            + "AND MONTH(t_green_leaves_receive.date) = month(:date)  \n"
            + "AND t_green_leaves_receive_detail.client = :client", nativeQuery = true)
    public List<Object[]> findGreenLeavesReceive(@Param("branch") Integer branch, @Param("route") Integer route, @Param("date") @Temporal(TemporalType.DATE) Date date, @Param("client") Integer client);

    public List<TClientAdvanceRequest> findByBranchAndRouteAndStatus(Integer branch, Integer route, String status);

    public List<TClientAdvanceRequest> findByBranchAndRouteAndDate(Integer branch, Integer route, Date date);
}
