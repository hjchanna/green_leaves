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

    public List<TClientAdvanceRequest> findByBranchAndStatus(Integer branch, String status);

    @Query(value = "SELECT\n"
            + "t_account_transaction.description,\n"
            + "t_account_transaction.credit_amount,\n"
            + "t_account_transaction.debit_amount\n"
            + "FROM\n"
            + "t_account_transaction\n"
            + "WHERE\n"
            + "branch = :branch \n"
            + "AND year(t_account_transaction.date) = year(:date) \n"
            + "AND month(t_account_transaction.date) = month(:date) \n"
            + "AND client =  :client \n"
            + "GROUP BY t_account_transaction.transaction_type", nativeQuery = true)
    public List<Object[]> findByBranchAndDateAndClient(@Param("branch") Integer branch, @Param("date") @Temporal(TemporalType.DATE) Date date, @Param("client") Integer client);

}
