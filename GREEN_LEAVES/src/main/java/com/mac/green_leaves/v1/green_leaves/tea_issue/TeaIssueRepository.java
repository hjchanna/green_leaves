/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.tea_issue;

import com.mac.green_leaves.v1.green_leaves.tea_issue.model.TTeaIssue;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Don
 */
public interface TeaIssueRepository extends JpaRepository<TTeaIssue, Integer> {

    @Query(value = "SELECT MAX(number) FROM t_tea_issue WHERE branch=:branch", nativeQuery = true)
    public Integer getMaximumNumberByBranch(@Param("branch") Integer branch);

    public TTeaIssue findByDateAndBranchAndNumberAndType(Date date, Integer branch, Integer number, String type);

    @Query(value = "SELECT\n"
            + "	t_route_officer_tea_ledger.route_officer,\n"
            + "	t_route_officer_tea_ledger.tea_grade,\n"
            + "	(SUM(t_route_officer_tea_ledger.in_qty - t_route_officer_tea_ledger.out_qty)) as balance\n"
            + "FROM\n"
            + " 	t_route_officer_tea_ledger\n"
            + "	LEFT JOIN t_tea_issue ON t_route_officer_tea_ledger.tea_issue = t_tea_issue.index_no\n"
            + "WHERE \n"
            + "	t_route_officer_tea_ledger.branch = :branch\n"
            + "	AND t_tea_issue.status = :status\n"
            + "	AND t_route_officer_tea_ledger.route_officer = :routeOfficer\n"
            + "GROUP BY \n"
            + " 	t_route_officer_tea_ledger.route_officer, t_route_officer_tea_ledger.tea_grade\n"
            + "HAVING \n"
            + "	balance > 0.08", nativeQuery = true)
    public List<Object[]> findByBranchAndStatus(@Param("branch") Integer branch, @Param("status") String status, @Param("routeOfficer") Integer routeOfficer);
}
