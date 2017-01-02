/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.bank_account.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 *
 * @author kalum
 */
@Entity
@Table(name = "m_bank_account")
public class MBankAccount implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @NotNull
    @Basic(optional = false)
    @Column(name = "name")
    private String name;
    
    @NotNull
    @Basic(optional = false)
    @Column(name = "bank")
    private Integer bank;
    
    @NotNull
    @Basic(optional = false)
    @Column(name = "branch")
    private Integer branch;
    
    @NotNull
    @Basic(optional = false)
    @Column(name = "account_number")
    private String accountNo;
    
    @NotNull
    @Basic(optional = false)
    @Column(name = "active")
    private boolean  active; 

    public MBankAccount() {
    }

    public MBankAccount(Integer indexNo, String name, Integer bank, Integer branch, String accountNo, boolean active) {
        this.indexNo = indexNo;
        this.name = name;
        this.bank = bank;
        this.branch = branch;
        this.accountNo = accountNo;
        this.active = active;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBank() {
        return bank;
    }

    public void setBank(Integer bank) {
        this.bank = bank;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public String getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
  
}
