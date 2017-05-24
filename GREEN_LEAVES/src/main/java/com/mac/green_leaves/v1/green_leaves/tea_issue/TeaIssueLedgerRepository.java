/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.tea_issue;

import com.mac.green_leaves.v1.green_leaves.tea_issue.model.TTeaIssueLedger;
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
public interface TeaIssueLedgerRepository extends JpaRepository<TTeaIssueLedger, Integer> {

    public void deleteByTeaIssue(Integer teaIssue);

    @Query(value = "select \n"
            + "	'B/F BALANCE' as date,\n"
            + "	'B/F BALANCE' as description,\n"
            + "	ifnull(sum(if(t_tea_issue_ledger.in_qty - t_tea_issue_ledger.out_qty>0, t_tea_issue_ledger.in_qty - t_tea_issue_ledger.out_qty, 0.0)),0.0) as in_qty,\n"
            + "	ifnull(sum(if(t_tea_issue_ledger.out_qty - t_tea_issue_ledger.in_qty>0, t_tea_issue_ledger.out_qty - t_tea_issue_ledger.in_qty, 0.0)),0.0) as out_qty\n"
            + "from\n"
            + "	t_tea_issue_ledger\n"
            + "	left join t_tea_issue on t_tea_issue.index_no = t_tea_issue_ledger.tea_issue\n"
            + "where\n"
            + "	t_tea_issue.`status` = 'APPROVE'\n"
            + "	and t_tea_issue.branch = :branch\n"
            + "	and t_tea_issue_ledger.route_officer = :officer\n"
            + "	and t_tea_issue_ledger.date < :date\n"
            + "	\n"
            + "union all\n"
            + "\n"
            + "select\n"
            + "	t_tea_issue_ledger.date as date,\n"
            + "	concat(replace(t_tea_issue.`type`, '_', ' '), '-',t_tea_issue.number) as description,\n"
            + "	t_tea_issue_ledger.in_qty as in_qty,\n"
            + "	t_tea_issue_ledger.out_qty as out_qty\n"
            + "from\n"
            + "	t_tea_issue_ledger\n"
            + "	left join t_tea_issue on t_tea_issue.index_no = t_tea_issue_ledger.tea_issue\n"
            + "where\n"
            + "	t_tea_issue.`status` = 'APPROVE'\n"
            + "	and t_tea_issue.branch = :branch\n"
            + "	and t_tea_issue_ledger.route_officer = :officer\n"
            + "	and t_tea_issue_ledger.date >= :date", nativeQuery = true)
    public List<Object[]> findTeaLedgerSummary(@Param("branch") Integer branch,
            @Param("officer") Integer officer,
            @Param("date") @Temporal(TemporalType.DATE) Date date);

}
