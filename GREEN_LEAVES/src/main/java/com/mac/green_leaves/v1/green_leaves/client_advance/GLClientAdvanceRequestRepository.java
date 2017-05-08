/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_advance;

import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequest;
import java.math.BigDecimal;
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

    public List<TClientAdvanceRequest> findByBranchAndRouteAndStatus(Integer branch, Integer route, String status);

}
