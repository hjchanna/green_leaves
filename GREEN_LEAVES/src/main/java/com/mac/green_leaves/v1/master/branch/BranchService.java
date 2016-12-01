/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.branch;

import com.mac.green_leaves.v1.exception.DuplicateEntityException;
import com.mac.green_leaves.v1.master.branch.model.MBranch;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author kalum
 */
@Service
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class BranchService {

    @Autowired
    private BranchRepository branchRepository;

    public List<MBranch> findAll() {
        return branchRepository.findAll();
    }
    
    private  MBranch findByName(String name) {
        List<MBranch> findByName = branchRepository.findByName(name);
        if (findByName.isEmpty()) {
            return null;
        }
        return findByName.get(0);
    }
     
    public MBranch saveBranch(MBranch branch) {
       MBranch mBranch = findByName(branch.getName());
        if (mBranch == null) {
            return branchRepository.save(branch);
        } else {
            if (mBranch.getIndexNo().equals(branch.getIndexNo())) {//is update get update Object?
                return branch;
            }
            throw new DuplicateEntityException("Sub Category already exists");
        }
    }

    public void deleteBranch(Integer indexNo) {
        
        try {
            branchRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete this branch because there are details in other transaction");
        }
    }

}
