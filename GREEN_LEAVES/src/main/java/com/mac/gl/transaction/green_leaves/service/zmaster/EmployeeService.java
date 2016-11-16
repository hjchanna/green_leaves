/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.service.zmaster;

import com.mac.gl.system.exception.DuplicateEntityException;
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

    private MEmployee findByNic(String nic) {
        List<MEmployee> employees = employeeRepository.findByNic(nic);
        if (employees.isEmpty()) {
            return null;
        }
        return employees.get(0);
    }

    public MEmployee saveEmployee(MEmployee employee) {
        MEmployee mEmployee = findByNic(employee.getNic());
        if (mEmployee == null) {
            System.out.println(employee + "sssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
            return employeeRepository.save(employee);
        } else {
            if (mEmployee.getIndexNo().equals(employee.getIndexNo())) {//is update get update Object?
                return employee;
            }
            throw new DuplicateEntityException("Employee already exists");
        }
    }

    public void deleteEmployee(Integer indexNo) {
        employeeRepository.delete(indexNo);
    }

}
