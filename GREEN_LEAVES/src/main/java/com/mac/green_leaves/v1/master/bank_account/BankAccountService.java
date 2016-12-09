/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.bank_Account;

import com.mac.green_leaves.v1.exception.DuplicateEntityException;
import com.mac.green_leaves.v1.master.bank_Account.model.MBankAccount;
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
public class BankAccountService {

    @Autowired
    private BankAccountRepository bankAccountRepository;

    List<MBankAccount> findAll() {
        return bankAccountRepository.findAll();
    }

    private MBankAccount findByAccountNo(String accountNo) {
        List<MBankAccount> findByAccountNo = bankAccountRepository.findByAccountNo(accountNo);
        if (findByAccountNo.isEmpty()) {
            return null;
        }
        return findByAccountNo.get(0);
    }

    public MBankAccount saveBankAcccount(MBankAccount bankAccount) {
        MBankAccount mBankAccount = findByAccountNo(bankAccount.getAccountNo());
        if (mBankAccount == null) {
            return bankAccountRepository.save(bankAccount);
        }else{
            if (mBankAccount.getIndexNo().equals(bankAccount.getIndexNo())) {
                return bankAccount;
            }
            throw new DuplicateEntityException("Bank Account already exist");
        }
    }


    void deleteBankAcccount(Integer indexNo) {
        try {
            bankAccountRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete this Bank Account because there are details in other transaction");
        }

    }

}
