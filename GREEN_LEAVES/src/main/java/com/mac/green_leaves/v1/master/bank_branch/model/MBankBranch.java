/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.bank_branch.model;

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
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Supervision
 */
@Entity
@Table(name = "m_bank_branch")
@XmlRootElement
public class MBankBranch implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    @Basic(optional = false)
    @Column(name = "branch_code")
    private String branchCode;
    @Basic(optional = false)
    @Column(name = "name")
    private String name;
    @JoinColumn(name = "bank", referencedColumnName = "index_no")
    @ManyToOne(optional = false)
    private MBank bank;

    public MBankBranch() {
    }

    public MBankBranch(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MBankBranch(Integer indexNo, String branchCode, String name) {
        this.indexNo = indexNo;
        this.branchCode = branchCode;
        this.name = name;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MBank getBank() {
        return bank;
    }

    public void setBank(MBank bank) {
        this.bank = bank;
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
        if (!(object instanceof MBankBranch)) {
            return false;
        }
        MBankBranch other = (MBankBranch) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "MBankBranch[ indexNo=" + indexNo + " ]";
    }
    
}
