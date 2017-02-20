/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.tea_issue;

import com.mac.green_leaves.v1.green_leaves.tea_issue.model.TRouteOfficerTeaLedger;
import com.mac.green_leaves.v1.green_leaves.tea_issue.model.TTeaIssue;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Don
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class TeaIssueService {

    @Autowired
    private TeaIssueRepository teaIssueRepository;

    @Autowired
    private TRouteOfficerTeaLedgerRepository tRouteOfficerTeaLedgerRepository;

    private final String PENDING_STATUS = "PENDING";
    private final String APPROVE_STATUS = "APPROVE";
    private final String DELETE_STATUS = "DELETED";

    public List<TRouteOfficerTeaLedger> getAllTRouteOfficerTeaLedger() {
        return tRouteOfficerTeaLedgerRepository.findAll();
    }

    public Integer saveTeaIssue(List<TTeaIssue> teaIssues) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        for (TTeaIssue teaIssue : teaIssues) {
            teaIssue.setBranch(branch);
            teaIssue.setStatus(PENDING_STATUS);
            Integer maxNumber = teaIssueRepository.getMaximumNumberByBranch(teaIssue.getBranch());
            if (maxNumber == null) {
                maxNumber = 0;
            }
            teaIssue.setNumber(maxNumber + 1);
            TTeaIssue saveData = teaIssueRepository.save(teaIssue);

            // route officer tea issue
            if (null != teaIssue.getRouteOfficer()) {
                TRouteOfficerTeaLedger tRouteOfficerTeaLedger = new TRouteOfficerTeaLedger();
                tRouteOfficerTeaLedger.setBranch(teaIssue.getBranch());
                tRouteOfficerTeaLedger.setDate(teaIssue.getDate());
                tRouteOfficerTeaLedger.setInQty(new BigDecimal(teaIssue.getQty()));
                tRouteOfficerTeaLedger.setOutQty(BigDecimal.ZERO);
                tRouteOfficerTeaLedger.setRouteOfficer(teaIssue.getRouteOfficer());
                tRouteOfficerTeaLedger.setTeaGrade(teaIssue.getTeaGrade());
                tRouteOfficerTeaLedger.setTeaIssue(saveData.getIndexNo());
                tRouteOfficerTeaLedgerRepository.save(tRouteOfficerTeaLedger);
            }
        }
        return 1;
    }

    public Integer saveTeaSettlement(List<TTeaIssue> teaIssues) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        for (TTeaIssue teaIssue : teaIssues) {
            teaIssue.setBranch(branch);
            teaIssue.setStatus(PENDING_STATUS);
            Integer maxNumber = teaIssueRepository.getMaximumNumberByBranch(teaIssue.getBranch());
            if (maxNumber == null) {
                maxNumber = 0;
            }
            teaIssue.setNumber(maxNumber + 1);
            TTeaIssue saveData = teaIssueRepository.save(teaIssue);

            // route officer tea issue
            if (null != teaIssue.getRouteOfficer()) {
                TRouteOfficerTeaLedger tRouteOfficerTeaLedger = new TRouteOfficerTeaLedger();
                tRouteOfficerTeaLedger.setBranch(teaIssue.getBranch());
                tRouteOfficerTeaLedger.setDate(teaIssue.getDate());
                tRouteOfficerTeaLedger.setInQty(BigDecimal.ZERO);
                tRouteOfficerTeaLedger.setOutQty(new BigDecimal(teaIssue.getQty()));
                tRouteOfficerTeaLedger.setRouteOfficer(teaIssue.getRouteOfficer());
                tRouteOfficerTeaLedger.setTeaGrade(teaIssue.getTeaGrade());
                tRouteOfficerTeaLedger.setTeaIssue(saveData.getIndexNo());
                tRouteOfficerTeaLedgerRepository.save(tRouteOfficerTeaLedger);
            }
        }
        return 1;
    }

    public TTeaIssue getTeaIssue(Date date, Integer number, String type) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        return teaIssueRepository.findByDateAndBranchAndNumberAndTypeAndStatusNot(date, branch, number, type, DELETE_STATUS);
    }

    public void deleteTeaIssue(Integer indexNo) {
        TTeaIssue teaIssue = teaIssueRepository.getOne(indexNo);
        teaIssue.setStatus(DELETE_STATUS);
        teaIssueRepository.save(teaIssue);
    }

    public List<Object[]> getPendingTeaIssueRequest(Integer routeOfficer) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        return teaIssueRepository.findByBranchAndStatus(branch, PENDING_STATUS, routeOfficer);
    }
}
