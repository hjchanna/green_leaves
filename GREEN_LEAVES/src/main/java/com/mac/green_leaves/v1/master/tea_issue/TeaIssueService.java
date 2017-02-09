/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.tea_issue;

import com.mac.green_leaves.v1.master.tea_issue.model.MTeaIssue;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Kelum
 */
@Service
@Transactional
public class TeaIssueService {
   @Autowired
   private TeaIssueRepository teaIssueRepository;

    List<MTeaIssue> findAllTeaIssue() {
        return teaIssueRepository.findAll();
    }
}
