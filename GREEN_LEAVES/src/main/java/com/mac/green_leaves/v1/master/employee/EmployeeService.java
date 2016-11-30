/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.employee;

import com.mac.green_leaves.v1.master.employee.model.MEmployee;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Nidura Prageeth
 */
@Service
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<MEmployee> findAll() {
        return employeeRepository.findAll();
    }

    public MEmployee findByNic(String nic) {
        MEmployee employee = employeeRepository.findByNicNumber(nic);
        if (employee == null) {
            return null;
        }
        return employee;
    }

    public MEmployee saveEmployee(MEmployee employee) {
        if (employee.getNicNumber() == null) {
            return employeeRepository.save(employee);
        }
        MEmployee findByNic = findByNic(employee.getNicNumber());
        if (findByNic == null) {
            return employeeRepository.save(employee);
        } else {
            if (findByNic.getIndexNo().equals(employee.getIndexNo())) {//is update get update Object?
                return employeeRepository.save(employee);
            }
            throw new RuntimeException("employee already exists");
        }
    }

    public void deleteEmployee(Integer indexNo) {
        try {
            employeeRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete this Employee because there are details in other transaction");
        }
    }

}
