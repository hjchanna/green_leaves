/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_advance;

import com.mac.green_leaves.v1.payroll.employee_advance.model.TEmployeeAdvanceRequestDetails;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author L T430
 */
public interface PREmployeeAdvanceRequestDetailRepository extends JpaRepository<TEmployeeAdvanceRequestDetails, Integer>{
    
    
}
