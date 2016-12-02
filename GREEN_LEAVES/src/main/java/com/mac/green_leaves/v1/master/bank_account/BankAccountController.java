/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.bank_account;

import com.mac.green_leaves.v1.master.bank_account.model.MBankAccount;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Supervision
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/bank-account")
public class BankAccountController {
    private final Integer branch=1;
    @Autowired
    private BankAccountService bankAccountService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MBankAccount> findAllDetail() {
        return bankAccountService.findAllCategory(branch);
    }
}
