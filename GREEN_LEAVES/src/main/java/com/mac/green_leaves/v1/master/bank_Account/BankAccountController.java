/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.bank_account;

import com.mac.green_leaves.v1.master.bank_account.model.MBankAccount;
import java.util.List;
import javax.xml.ws.spi.http.HttpExchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author kalum
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/bank-account")
public class BankAccountController{
    
    @Autowired
    BankAccountService bankAccountService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MBankAccount> findAll(){
        return bankAccountService.findAll();
    }
    
    @RequestMapping(value = "/save-bankAccount", method = RequestMethod.POST)
    public MBankAccount saveBankAcccount(@RequestBody MBankAccount bankAccount) {
        return bankAccountService.saveBankAcccount(bankAccount);
        
    }

    @RequestMapping(value = "/delete-bankAccount/{indexNo}", method = RequestMethod.DELETE)
    public void deleteBankAcccount(@PathVariable Integer indexNo) {
        bankAccountService.deleteBankAcccount(indexNo);
    }
    
}
