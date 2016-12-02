/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.bank_account.model;

import com.mac.green_leaves.v1.master.bank_branch.model.MBankBranch;
import com.mac.green_leaves.v1.master.bank.model.MBank;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Supervision
 */
@Entity
@Table(name = "m_bank_account")
@XmlRootElement
public class MBankAccount implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    @Basic(optional = false)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @Column(name = "account_number")
    private String accountNumber;
    @Basic(optional = false)
    @Column(name = "active")
    private boolean active;
    @JoinColumn(name = "bank", referencedColumnName = "index_no")
    @ManyToOne(optional = false)
    private MBank bank;
    @JoinColumn(name = "branch", referencedColumnName = "index_no")
    @ManyToOne(optional = false)
    private MBankBranch branch;

    public MBankAccount() {
    }

    public MBankAccount(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MBankAccount(Integer indexNo, String name, String accountNumber, boolean active) {
        this.indexNo = indexNo;
        this.name = name;
        this.accountNumber = accountNumber;
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

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public boolean getActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public MBank getBank() {
        return bank;
    }

    public void setBank(MBank bank) {
        this.bank = bank;
    }

    public MBankBranch getBranch() {
        return branch;
    }

    public void setBranch(MBankBranch branch) {
        this.branch = branch;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (indexNo != null ? indexNo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MBankAccount)) {
            return false;
        }
        MBankAccount other = (MBankAccount) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "indexNo=" + indexNo + " ]";
    }
    
}
