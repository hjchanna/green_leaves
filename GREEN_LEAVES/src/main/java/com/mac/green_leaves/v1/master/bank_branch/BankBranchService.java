/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.bank_branch;

import com.mac.green_leaves.v1.master.bank_branch.model.MBankBranch;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Supervision
 */
@Service
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class BankBranchService {
    
    
    @Autowired
    BankBranchRepository bankBranchRepository;

    public List<MBankBranch> findAll() {
        return bankBranchRepository.findAll();
    }

    public MBankBranch findByBranchCodeOrName(String code,String name) {
        List<MBankBranch> List = bankBranchRepository.findByBranchCodeOrName(code, name);
        if (List.isEmpty()) {
            return null;
        }
        return List.get(0);
    }

    public MBankBranch saveBankBranch(MBankBranch bankBranch) {
        MBankBranch findByName = findByBranchCodeOrName(bankBranch.getBranchCode(),bankBranch.getName());

        if (findByName == null) {//is'nt already exsist by name
            return bankBranchRepository.save(bankBranch);
        } else {//is already exsist by name
            if (findByName.getIndexNo().equals(bankBranch.getIndexNo())) {//is update get update Object?
                return bankBranchRepository.save(bankBranch);
            }
            throw new RuntimeException("This Bank Branch is already exists !");
        }
    }

    public void delete(Integer indexNo) {
        try {
            bankBranchRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete this bank branch because there are details in other transaction");
        }
    }
}
