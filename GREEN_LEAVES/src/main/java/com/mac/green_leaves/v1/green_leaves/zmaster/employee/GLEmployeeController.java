/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zmaster.employee;

import com.mac.green_leaves.v1.green_leaves.zmaster.employee.model.MEmployee;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
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
public class GLEmployeeController {

    @Autowired
    private GLEmployeeService employeeService;

    @RequestMapping(value = "/employees", method = RequestMethod.GET)
    public List<MEmployee> findAllEmployee() {
        return employeeService.findAllEmployees(SecurityUtil.getCurrentUser().getBranch());
    }

    @RequestMapping(value = "/route-officers", method = RequestMethod.GET)
    public List<MEmployee> findRouteOfficers() {
        return employeeService.findRouteOfficers(SecurityUtil.getCurrentUser().getBranch());
    }

    @RequestMapping(value = "/route-helpers", method = RequestMethod.GET)
    public List<MEmployee> findRouteHelpers() {
        return employeeService.findRouteHelpers(SecurityUtil.getCurrentUser().getBranch());
    }

    @RequestMapping(value = "/route-officers/{branch}", method = RequestMethod.GET)
    public List<MEmployee> findRouteOfficers(@PathVariable Integer branch) {
        return employeeService.findRouteOfficers(branch);
    }

    @RequestMapping(value = "/route-helpers/{branch}", method = RequestMethod.GET)
    public List<MEmployee> findRouteHelpers(@PathVariable Integer branch) {
        return employeeService.findRouteHelpers(branch);
    }

}
