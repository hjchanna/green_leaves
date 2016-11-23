/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.transaction.zmaster.employee;

import com.mac.green_leaves.v1.exception.DuplicateEntityException;
import com.mac.green_leaves.v1.transaction.zmaster.employee.model.MEmployee;
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
        List<MEmployee> employees = employeeRepository.findByNicNumber(nic);
        if (employees.isEmpty()) {
            return null;
        }
        return employees.get(0);
    }

    public MEmployee saveEmployee(MEmployee employee) {
        MEmployee mEmployee = findByNic(employee.getNicNumber());
        if (mEmployee == null) {
            return employeeRepository.save(employee);
        } else {
            if (mEmployee.getIndexNo().equals(employee.getIndexNo())) {
                return employee;
            }
            throw new DuplicateEntityException("Employee already exists");
        }
    }

    public void deleteEmployee(Integer indexNo) {
        employeeRepository.delete(indexNo);
    }

}
