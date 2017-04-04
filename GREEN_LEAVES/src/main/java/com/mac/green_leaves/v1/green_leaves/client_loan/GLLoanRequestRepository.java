/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_loan;

import com.mac.green_leaves.v1.green_leaves.client_loan.model.TLoanRequest;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mohan
 */
public interface GLLoanRequestRepository extends JpaRepository<TLoanRequest, Integer> {

    @Query(value = "select max(number) from t_loan where branch = :branch", nativeQuery = true)
    public Integer getMaxNumber(@Param("branch") Integer branch);

    @Query(value = "select \n"
            + " t_loan_detail.index_no,\n"
            + " t_loan.number,\n"
            + " t_loan.date,\n"
            + " t_loan_detail.client,\n"
            + " t_loan_detail.loan_amount\n"
            + "from \n"
            + " t_loan\n"
            + "inner join \n"
            + " t_loan_detail\n"
            + "on\n"
            + " t_loan.index_no = t_loan_detail.loan\n"
            + "where \n"
            + " t_loan_detail.status = :status\n"
            + "and \n"
            + " t_loan.branch = :branch", nativeQuery = true)
    public List<Object[]> findByBranchAndStatus(@Param("branch") Integer branch, @Param("status") String status);

    public List<TLoanRequest> findByBranchAndNumberAndStatus(Integer branch, Integer number, String status);
}
