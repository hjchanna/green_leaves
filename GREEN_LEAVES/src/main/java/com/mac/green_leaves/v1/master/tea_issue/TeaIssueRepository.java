/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.tea_issue;

import com.mac.green_leaves.v1.master.tea_issue.model.MTeaIssue;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kelum
 */
public interface TeaIssueRepository extends JpaRepository<MTeaIssue, Integer>{
    
   
}
