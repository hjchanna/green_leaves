/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_loan;

import com.mac.green_leaves.v1.payroll.employee_loan.model.TEmployeeLoanDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author L T430
 */
public interface PREmployeeLoanDetailRepository extends JpaRepository<TEmployeeLoanDetail, Integer>{

    public List<TEmployeeLoanDetail> findByStatus(String LOAN_REQUEST_DETAIL_STATUS_CHECKED);
    
}
