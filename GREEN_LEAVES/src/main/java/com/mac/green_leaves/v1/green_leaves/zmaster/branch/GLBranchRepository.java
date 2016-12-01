/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zmaster.branch;

import com.mac.green_leaves.v1.green_leaves.zmaster.branch.model.MBranch;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface GLBranchRepository extends JpaRepository<MBranch, Integer>{
    
}
