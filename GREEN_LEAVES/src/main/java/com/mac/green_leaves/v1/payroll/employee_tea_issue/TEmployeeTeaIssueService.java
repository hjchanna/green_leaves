/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_tea_issue;

import com.mac.green_leaves.v1.green_leaves.tea_issue.TeaIssueRepository;
import com.mac.green_leaves.v1.green_leaves.tea_issue.TeaIssueService;
import com.mac.green_leaves.v1.payroll.employee_tea_issue.model.TEmployeeTeaIssue;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author L T430
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class TEmployeeTeaIssueService {

    private final String PENDING_STATUS = "PENDING";
    private final String APPROVE_STATUS = "APPROVE";
    private final String DELETE_STATUS = "DELETED";
    
    @Autowired
    private TEmployeeTeaIssueRepository teaIssueRepository ;
    
    Integer saveTeaIssue(List<TEmployeeTeaIssue> teaIssueList) {
        
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        for (TEmployeeTeaIssue teaIssueModel : teaIssueList) {
            teaIssueModel.setBranch(branch);
            teaIssueModel.setStatus(PENDING_STATUS);
            Integer maximumNumber = teaIssueRepository.getMaximumNumberByBranch(teaIssueModel.getBranch());
            
             if (maximumNumber == null) {
                maximumNumber = 0;
            }
            teaIssueModel.setNumber(maximumNumber + 1);
            teaIssueRepository.save(teaIssueModel);
        }
        return teaIssueList.size();
    }
    
}
