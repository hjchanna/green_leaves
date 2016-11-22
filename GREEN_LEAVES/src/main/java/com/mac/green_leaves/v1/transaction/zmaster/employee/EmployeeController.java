/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.transaction.zmaster.employee;

import com.mac.green_leaves.v1.transaction.zmaster.employee.model.MEmployee;
import com.mac.green_leaves.v1.transaction.zmaster.employee.EmployeeService;
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
 * @author Mohan
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/employees")
public class EmployeeController {
      
    @Autowired
    private EmployeeService employeeService;
    
//    public List<MEmployee> findByBrach(@PathVariable Integer indexNo){
//        
//    }

    @RequestMapping(method = RequestMethod.GET)
    public List<MEmployee> findAllEmployee(){
        return employeeService.findEmployeesList();
        
    }
    @RequestMapping(value = "/save-employee",method = RequestMethod.POST)
    public MEmployee saveEmployee(@RequestBody MEmployee employee){
        return employeeService.saveEmployee(employee);
    }
    @RequestMapping(value = "/delete-employee/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteEmployee(@PathVariable Integer indexNo){
        employeeService.deleteEmployee(indexNo);
        return indexNo;
    }
}
