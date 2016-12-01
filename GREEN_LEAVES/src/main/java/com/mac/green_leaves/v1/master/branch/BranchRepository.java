/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.branch;

import com.mac.green_leaves.v1.master.branch.model.MBranch;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kalum
 */
public interface BranchRepository extends JpaRepository<MBranch, Serializable>{

    public List<MBranch> findByName(String name);
    
 
}
