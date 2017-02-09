/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.bank_account;

import com.mac.green_leaves.v1.master.bank_account.model.MBankAccount;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kalum
 */
public interface BankAccountRepository extends JpaRepository<MBankAccount, Serializable>{

    public List<MBankAccount> findByName(String name);
    
}
