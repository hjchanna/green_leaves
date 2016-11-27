/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.employee;

import com.mac.green_leaves.v1.master.employee.model.MEmployee;
import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Nidura Prageeth
 */
public interface EmployeeRepository extends JpaRepository<MEmployee, Serializable>{

    public MEmployee findByNicNumber(String nic);
    
}
