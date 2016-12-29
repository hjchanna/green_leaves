/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.bank;

import com.mac.green_leaves.v1.zexception.DuplicateEntityException;
import com.mac.green_leaves.v1.master.bank.model.MBank;
import com.mac.green_leaves.v1.master.item_department.ItemDepartmentRepository;
import com.mac.green_leaves.v1.master.item_department.model.MItemDepartment;
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
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class BankService {
    
    
    @Autowired
    private BankRepository bankRepository;

    public List<MBank> findAll() {
        return bankRepository.findAll();
    }

    public MBank findByName(String code,String name) {
        List<MBank> departmentList = bankRepository.findByBankCodeOrName(code, name);
        if (departmentList.isEmpty()) {
            return null;
        }
        return departmentList.get(0);
    }

    public MBank saveDetail(MBank bank) {
        MBank findByName = findByName(bank.getBankCode(),bank.getName());

        if (findByName == null) {//is'nt already exsist by name
            return bankRepository.save(bank);
        } else {//is already exsist by name
            if (findByName.getIndexNo().equals(bank.getIndexNo())) {//is update get update Object?
                return bankRepository.save(bank);
            }
            throw new DuplicateEntityException("This Bank is Already Exists !");
        }
    }

    public void deleteDetail(Integer indexNo) {
        try {
            bankRepository.delete(indexNo);       
        } catch (Exception e) {
           throw new RuntimeException("Cannot delete this bank because there are details in other transaction");
        }
    }
}
