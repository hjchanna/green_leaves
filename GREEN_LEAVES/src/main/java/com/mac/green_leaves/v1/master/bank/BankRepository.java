/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.bank;

import com.mac.green_leaves.v1.master.bank.model.MBank;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Supervision
 */
public interface BankRepository extends JpaRepository<MBank, Integer>{    

    public List<MBank> findByBankCodeOrName(String code, String name);
    
}
