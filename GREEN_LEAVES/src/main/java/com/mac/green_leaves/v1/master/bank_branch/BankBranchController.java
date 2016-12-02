/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.bank_branch;

import com.mac.green_leaves.v1.master.bank_branch.model.MBankBranch;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Supervision
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/bank-branch")
public class BankBranchController {
    
     @Autowired
    private BankBranchService bankBranchService;
    
    @RequestMapping (method = RequestMethod.GET)
    public List<MBankBranch> findAll() {
        return bankBranchService.findAll();
    }

    @RequestMapping(value = "/save-detail", method = RequestMethod.POST)
    public MBankBranch save(@RequestBody MBankBranch mRoute) {
        return bankBranchService.saveBankBranch(mRoute);
    }

    @RequestMapping(value = "/delete-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer delete(@PathVariable Integer indexNo) {
        bankBranchService.delete(indexNo);
        return indexNo;
    }
    
}
