/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.tea_issue;

import com.mac.green_leaves.v1.master.tea_issue.model.MTeaIssue;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kelum
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/tea-issue")
public class TeaIssueController {
    @Autowired
    private TeaIssueService teaIssueService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MTeaIssue>findAllTeaIssue(){
        return teaIssueService.findAllTeaIssue();
    }
}
