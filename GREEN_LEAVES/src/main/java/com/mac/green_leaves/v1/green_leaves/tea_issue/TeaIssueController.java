/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.tea_issue;

import com.mac.green_leaves.v1.green_leaves.tea_issue.model.TTeaIssue;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
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

    @RequestMapping(value = "/{number}/{type}", method = RequestMethod.GET)
    public TTeaIssue findByNumberAndType(@PathVariable("number") Integer number, @PathVariable("type") String type) {
        return teaIssueService.findTeaIssueByNumberAndType(number, type, SecurityUtil.getCurrentUser().getBranch());
    }

    @RequestMapping(value = "/save-tea-issue", method = RequestMethod.POST)
    public Integer saveTeaIssue(@RequestBody TTeaIssue teaIssue) {
        return teaIssueService.saveTeaIssue(teaIssue, SecurityUtil.getCurrentUser().getBranch());
    }

    @RequestMapping(value = "/delete-tea-issue/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteTeaIssue(@PathVariable Integer indexNo) {
        teaIssueService.deleteTeaIssue(indexNo);
        return indexNo;
    }

    @RequestMapping(value = "/delete-tea-issue-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteTeaIssueDetail(@PathVariable Integer indexNo) {
        teaIssueService.deleteTeaIssueDetail(indexNo);
        return indexNo;
    }

    @RequestMapping(value = "/officer-tea-ledger-summary/{officer}/{date}", method = RequestMethod.GET)
    public List<Object[]> findOfficerTeaLedgerSummary(@PathVariable("officer") Integer officer, @PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return teaIssueService.findTeaLedgerSummary(SecurityUtil.getCurrentUser().getBranch(), officer, date);
    }

}
