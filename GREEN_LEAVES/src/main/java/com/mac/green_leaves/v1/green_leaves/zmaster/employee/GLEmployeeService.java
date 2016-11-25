/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zmaster.employee;

import com.mac.green_leaves.v1.system.Types;
import com.mac.green_leaves.v1.green_leaves.zmaster.employee.model.MEmployee;
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
public class GLEmployeeService {

    @Autowired
    GLEmployeeRepository employeeRepository;

    public List<MEmployee> findAllEmployees(Integer branch) {
        return employeeRepository.findByBranch(branch);
    }

    public List<MEmployee> findRouteOfficers(Integer branch) {
        return employeeRepository.findByBranchAndType(branch, Types.EMPLOYEE_ROUTE_OFFICER);
    }

    public List<MEmployee> findRouteHelpers(Integer branch) {
        return employeeRepository.findByBranchAndType(branch, Types.EMPLOYEE_ROUTE_HELPER);
    }
}
