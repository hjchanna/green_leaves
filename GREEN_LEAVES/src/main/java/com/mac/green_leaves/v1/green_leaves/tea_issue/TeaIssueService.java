/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.tea_issue;

import com.mac.green_leaves.v1.green_leaves.tea_issue.model.TTeaIssue;
import com.mac.green_leaves.v1.green_leaves.tea_issue.model.TTeaIssueDetail;
import com.mac.green_leaves.v1.green_leaves.tea_issue.model.TTeaIssueLedger;
import java.math.BigDecimal;
import java.util.Calendar;
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
    private TeaIssueDetailRepository teaIssueDetailRepository;

    @Autowired
    private TeaIssueLedgerRepository teaIssueLedgerRepository;

    private final String TYPE_DIRECT_TEA_ISSUE = "DIRECT_TEA_ISSUE";
    private final String TYPE_OFFICER_TEA_ISSUE = "OFFICER_TEA_ISSUE";
    private final String TYPE_TEA_ISSUE_SETTLEMENT = "TEA_ISSUE_SETTLEMENT";
    //
    private final String STATUS_PENDING = "PENDING";
    private final String STATUS_APPROVE = "APPROVE";
    private final String STATUS_DELETE = "DELETED";

    public TTeaIssue findTeaIssueByNumberAndType(Integer number, String type, Integer branch) {
        return teaIssueRepository.findByNumberAndTypeAndBranchAndStatusNot(number, type, branch, STATUS_DELETE);
    }

    @Transactional
    public Integer saveTeaIssue(TTeaIssue teaIssue, Integer branch) {
        if (teaIssue.getIndexNo() == null) {
            Integer maxNumber = teaIssueRepository.getMaximumNumberByBranchAndType(branch, teaIssue.getType());
            if (maxNumber == null) {
                maxNumber = 0;
            }
            teaIssue.setNumber(maxNumber + 1);
        }

        teaIssue.setBranch(branch);
        teaIssue.setStatus(STATUS_APPROVE);

        for (TTeaIssueDetail teaIssueDetail : teaIssue.getTeaIssueDetails()) {
            teaIssueDetail.setTeaIssue(teaIssue);
        }

        teaIssue = teaIssueRepository.save(teaIssue);

        //update officer tea issue ledger
        updateOfficerLedger(teaIssue, branch);

        return teaIssue.getIndexNo();
    }

    @Transactional
    public Integer deleteTeaIssue(Integer indexNo) {
        TTeaIssue teaIssue = teaIssueRepository.findOne(indexNo);
        teaIssue.setStatus(STATUS_DELETE);
        teaIssueRepository.save(teaIssue);

        return teaIssue.getIndexNo();
    }

    @Transactional
    public Integer deleteTeaIssueDetail(Integer indexNo) {
        TTeaIssueDetail teaIssueDetail = teaIssueDetailRepository.findOne(indexNo);

        TTeaIssue teaIssue = teaIssueDetail.getTeaIssue();
        teaIssue.getTeaIssueDetails().remove(teaIssueDetail);

        teaIssueDetailRepository.delete(teaIssueDetail);
        teaIssueRepository.save(teaIssueDetail.getTeaIssue());

        //update officer tea issue ledger
        updateOfficerLedger(teaIssue, teaIssue.getBranch());

        return indexNo;
    }

    public List<Object[]> findTeaLedgerSummary(Integer branch, Integer officer, Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.DATE, calendar.getActualMinimum(Calendar.DATE));
        date = calendar.getTime();

        List<Object[]> data = teaIssueLedgerRepository.findTeaLedgerSummary(branch, officer, date);;

        //remove if bf balance is zero
        if (((BigDecimal) data.get(0)[2]).equals(BigDecimal.ZERO) && ((BigDecimal) data.get(0)[3]).equals(BigDecimal.ZERO)) {
            data.remove(0);
        }

        return data;
    }

    private void updateOfficerLedger(TTeaIssue teaIssue, Integer branch) {
        if (teaIssue.getType().equals(TYPE_OFFICER_TEA_ISSUE)) {
            teaIssueLedgerRepository.deleteByTeaIssue(teaIssue.getIndexNo());

            for (TTeaIssueDetail teaIssueDetail : teaIssue.getTeaIssueDetails()) {
                TTeaIssueLedger teaIssueLedger = new TTeaIssueLedger();
                teaIssueLedger.setBranch(branch);
                teaIssueLedger.setDate(teaIssue.getDate());
                teaIssueLedger.setTeaIssue(teaIssue.getIndexNo());
                teaIssueLedger.setRouteOfficer(teaIssueDetail.getRouteOfficer());
                teaIssueLedger.setTeaIssueItem(teaIssueDetail.getTeaIssueItem());
                teaIssueLedger.setInQty(teaIssueDetail.getQuantity());
                teaIssueLedger.setOutQty(BigDecimal.ZERO);

                teaIssueLedgerRepository.save(teaIssueLedger);
            }
        }

        if (teaIssue.getType().equals(TYPE_TEA_ISSUE_SETTLEMENT)) {
            teaIssueLedgerRepository.deleteByTeaIssue(teaIssue.getIndexNo());

            for (TTeaIssueDetail teaIssueDetail : teaIssue.getTeaIssueDetails()) {
                TTeaIssueLedger teaIssueLedger = new TTeaIssueLedger();
                teaIssueLedger.setBranch(branch);
                teaIssueLedger.setDate(teaIssue.getDate());
                teaIssueLedger.setTeaIssue(teaIssue.getIndexNo());
                teaIssueLedger.setRouteOfficer(teaIssueDetail.getRouteOfficer());
                teaIssueLedger.setTeaIssueItem(teaIssueDetail.getTeaIssueItem());
                teaIssueLedger.setInQty(BigDecimal.ZERO);
                teaIssueLedger.setOutQty(teaIssueDetail.getQuantity());

                teaIssueLedgerRepository.save(teaIssueLedger);
            }
        }
    }
    
    private void updateClientLedger() {
        
    }
    

}
