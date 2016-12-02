/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.security.model;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Mohan
 */
@Entity
@Table(name = "m_user_role")
public class MUserRole implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "name")
    private String name;

    @JoinTable(name = "r_user_role_transaction_type", joinColumns = {
        @JoinColumn(name = "user_role", referencedColumnName = "index_no")}, inverseJoinColumns = {
        @JoinColumn(name = "transaction_type", referencedColumnName = "index_no")})
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<RTransactionType> rTransactionTypeSet;

    public MUserRole() {
    }

    public MUserRole(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MUserRole(Integer indexNo, String name) {
        this.indexNo = indexNo;
        this.name = name;
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

    public Set<RTransactionType> getRTransactionTypeSet() {
        return rTransactionTypeSet;
    }

    public void setRTransactionTypeSet(Set<RTransactionType> rTransactionTypeSet) {
        this.rTransactionTypeSet = rTransactionTypeSet;
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
        if (!(object instanceof MUserRole)) {
            return false;
        }
        MUserRole other = (MUserRole) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mac.green_leaves.v1.security.model.MUserRole[ indexNo=" + indexNo + " ]";
    }

}
