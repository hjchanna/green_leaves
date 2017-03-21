/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_tea_issue;

import com.mac.green_leaves.v1.payroll.employee_tea_issue.model.TEmployeeTeaIssue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author L T430
 */
public interface TEmployeeTeaIssueRepository extends JpaRepository<TEmployeeTeaIssue, Integer>{

    @Query(value = "SELECT MAX(number) FROM t_employee_tea_issue WHERE branch=:branch", nativeQuery = true)
    public Integer getMaximumNumberByBranch(@Param("branch")Integer branch);
    
}
