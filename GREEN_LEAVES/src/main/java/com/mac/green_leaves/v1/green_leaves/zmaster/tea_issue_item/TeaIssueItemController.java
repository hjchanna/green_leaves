/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zmaster.tea_issue_item;

import com.mac.green_leaves.v1.green_leaves.zmaster.tea_issue_item.model.TeaIssueItem;
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
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/tea-issue-item")
public class TeaIssueItemController {

    @Autowired
    private TeaIssueItemService teaGradeService;

    @RequestMapping(method = RequestMethod.GET)
    public List<TeaIssueItem> findAll() {
        return teaGradeService.findAll();
    }

    @RequestMapping(value = "/save-teagrade", method = RequestMethod.POST)
    public TeaIssueItem saveTeaGrade(@RequestBody TeaIssueItem teaGrade) {
        System.out.println(teaGrade.toString());
        return teaGradeService.saveTeaGrade(teaGrade);
    }
    
    @RequestMapping(value = "/delete-teagrade/{indexNo}", method = RequestMethod.DELETE)
    public void deleteTeaGrade(@PathVariable Integer indexNo) {
        teaGradeService.deleteTeaGrade(indexNo);
    }

}
