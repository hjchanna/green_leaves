/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.tea_issue.direct_issue;

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
@RequestMapping("/api/v1/green-leaves/direct")
public class DirectIssueController {
    @Autowired
    private DirectIssueservice directIssueservice;

    List<Object> getAllTeaGrade(){
        return directIssueservice.find
    }
    
}
