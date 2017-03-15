/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_advance;

import com.mac.green_leaves.v1.payroll.employee_advance.model.TEmployeeAdvanceRequest;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author L T430
 */
public interface PREmployeeAdvanceRequestRepository extends JpaRepository< TEmployeeAdvanceRequest, Integer> {

    public TEmployeeAdvanceRequest findFirst1ByOrderByIndexNoDesc();

    @Query(value = "SELECT t_employee_advance_request.date , \n"
            + "SUM(t_employee_advance_request_details.amount),\n"
            + "COUNT(*)\n"
            + "FROM\n"
            + "t_employee_advance_request\n"
            + "INNER JOIN t_employee_advance_request_details\n"
            + "ON t_employee_advance_request_details.advance_request = t_employee_advance_request.index_no\n"
            + "WHERE t_employee_advance_request_details.status = :status AND t_employee_advance_request.branch = :branch\n"
            + "GROUP BY t_employee_advance_request.date", nativeQuery = true)
    public List<Object[]> findByStatusAndBranch( @Param("status") String status,@Param("branch") Integer branch);

}
