/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.employee;

import com.mac.green_leaves.v1.master.employee.model.MEmployee;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Nidura Prageeth
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/employee")
public class EmployeeController {
    
     @Autowired
    private EmployeeService employeeService;

    @RequestMapping (method = RequestMethod.GET)
    public List<MEmployee> findAll() {
        return employeeService.findAll();
    }

    @RequestMapping(value = "/save-employee", method = RequestMethod.POST)
    public MEmployee saveEmployee(@RequestBody MEmployee mEmployee) {
        return employeeService.saveEmployee(mEmployee);
    }

    @RequestMapping(value = "/delete-employee/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteEmployee(@PathVariable Integer indexNo) {
        employeeService.deleteEmployee(indexNo);
        return indexNo;
    }
    
}
