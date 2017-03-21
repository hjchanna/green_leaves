/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_tea_issue;

import com.mac.green_leaves.v1.payroll.employee_tea_issue.model.TEmployeeTeaIssue;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author L T430
 */
@CrossOrigin
@RestController
@RequestMapping("/api/v1/payroll/employee-tea-issue")
public class TEmployeeTeaIssueController {
    
    @Autowired
    private TEmployeeTeaIssueService teaIssueService;
    
     @RequestMapping(value = "/save-tea-issue", method = RequestMethod.POST)
    public Integer saveTeaIssue(@RequestBody List<TEmployeeTeaIssue> teaIssues) {
        return teaIssueService.saveTeaIssue(teaIssues);
    }
    
}
