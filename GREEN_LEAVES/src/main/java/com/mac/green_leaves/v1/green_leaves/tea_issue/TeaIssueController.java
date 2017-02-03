/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.tea_issue;

import com.mac.green_leaves.v1.green_leaves.tea_issue.model.TTeaIssue;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Don
 */
@CrossOrigin
@RestController
@RequestMapping("/api/v1/green-leaves/tea-issue")
public class TeaIssueController {

    @Autowired
    private TeaIssueService teaIssueService;

    @RequestMapping(value = "/{date}/{number}/{type}", method = RequestMethod.GET)
    public TTeaIssue getTeaIssue(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @PathVariable Integer number, @PathVariable String type) {
        return teaIssueService.getTeaIssue(date, number, type);
    }

    @RequestMapping(value = "/save-tea-issue", method = RequestMethod.POST)
    public Integer saveTeaIssue(@RequestBody List<TTeaIssue> teaIssues) {
        return teaIssueService.saveTeaIssue(teaIssues);
    }

    @RequestMapping(value = "/delete-tea-issue/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteTeaIssue(@PathVariable Integer indexNo) {
        teaIssueService.deleteTeaIssue(indexNo);
        return indexNo;
    }

    @RequestMapping(value = "/pending-tea-issue", method = RequestMethod.GET)
    public List<TTeaIssue> getPendingRequestByType() {
        return teaIssueService.getPendingTeaIssueRequest();
    }

    @RequestMapping(value = "/approve-or-reject-tea-issue/{indexNo}/{status}", method = RequestMethod.DELETE)
    public Integer approveOrRejectTeaIssue(@PathVariable Integer indexNo, @PathVariable String status) {
        teaIssueService.approveOrRejectTeaIssue(indexNo, status);
        return indexNo;
    }
}
