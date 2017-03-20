/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_loan;

import com.mac.green_leaves.v1.payroll.employee_loan.model.TEmployeeLoan;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author L T430
 */
public interface PREmployeeLoanRepository extends JpaRepository<TEmployeeLoan, Integer> {

    @Query(value = "select max(number) from t_employee_loan where branch = :branch", nativeQuery = true)
    public Integer getMaxNumber(@Param("branch") Integer branch);

    @Query(value = "select \n"
            + "t_employee_loan_detail.index_no,\n"
            + "t_employee_loan.number, t_employee_loan.date,\n"
            + " t_employee_loan_detail.employee,\n"
            + "  t_employee_loan_detail.loan_amount\n"
            + "  from \n"
            + "   t_employee_loan\n"
            + "	inner join \n"
            + "	 t_employee_loan_detail\n"
            + "	 on\n"
            + "	  t_employee_loan.index_no = t_employee_loan_detail.employee_loan\n"
            + "	  where \n"
            + "	   t_employee_loan_detail.status = :status\n"
            + "		and \n" +
    "		 t_employee_loan.branch = :branch", nativeQuery = true)
    public List<Object[]> findByBranchAndStatus(@Param("branch") Integer branch, @Param("status") String status);
}
