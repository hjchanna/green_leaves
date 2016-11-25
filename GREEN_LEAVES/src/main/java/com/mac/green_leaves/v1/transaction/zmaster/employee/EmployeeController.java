/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.transaction.zmaster.employee;

import com.mac.green_leaves.v1.transaction.zmaster.employee.model.MEmployee;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Mohan
 */
@CrossOrigin
@RestController
@RequestMapping("/api/v1/green-leaves/master")
public class EmployeeController {

    private static final Integer branch = 1;

    @Autowired
    private EmployeeService employeeService;

    @RequestMapping(value = "/employees", method = RequestMethod.GET)
    public List<MEmployee> findAllEmployee() {
        return employeeService.findAllEmployees(branch);
    }

    @RequestMapping(value = "/route-officers", method = RequestMethod.GET)
    public List<MEmployee> findRouteOfficers() {
        return employeeService.findRouteOfficers(branch);
    }

    @RequestMapping(value = "/route-helpers", method = RequestMethod.GET)
    public List<MEmployee> findRouteHelpers() {
        return employeeService.findRouteHelpers(branch);
    }

}
