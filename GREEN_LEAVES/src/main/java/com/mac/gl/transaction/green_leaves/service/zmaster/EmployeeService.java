/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.service.zmaster;

import com.mac.gl.transaction.green_leaves.model.zmaster.MEmployee;
import com.mac.gl.transaction.green_leaves.repository.zmaster.EmployeeRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author kalum
 */
@Service
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    public List<MEmployee> findEmployeesList() {
        return employeeRepository.findAll();
    }

    public MEmployee saveEmployee(MEmployee employee) {
        return employeeRepository.save(employee);
    }
    
    public void deleteEmployee(Integer indexNo){
         employeeRepository.delete(indexNo);
    }

}
