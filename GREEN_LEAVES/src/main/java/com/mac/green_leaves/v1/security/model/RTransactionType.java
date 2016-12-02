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
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Mohan
 */
@Entity
@Table(name = "r_transaction_type")
public class RTransactionType implements Serializable {

    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "group")
    private String group;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "name")
    private String name;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "frontend_url")
    private String frontendUrl;

    @Lob
    @Column(name = "settings")
    private byte[] settings;

    @ManyToMany(mappedBy = "rTransactionTypeSet", fetch = FetchType.EAGER)
    private Set<MUserRole> userRoles;

    public RTransactionType() {
    }

    public RTransactionType(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public RTransactionType(Integer indexNo, String group, String name, String frontendUrl) {
        this.indexNo = indexNo;
        this.group = group;
        this.name = name;
        this.frontendUrl = frontendUrl;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFrontendUrl() {
        return frontendUrl;
    }

    public void setFrontendUrl(String frontendUrl) {
        this.frontendUrl = frontendUrl;
    }

    public byte[] getSettings() {
        return settings;
    }

    public void setSettings(byte[] settings) {
        this.settings = settings;
    }

    public Set<MUserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<MUserRole> userRoles) {
        this.userRoles = userRoles;
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
        if (!(object instanceof RTransactionType)) {
            return false;
        }
        RTransactionType other = (RTransactionType) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mac.green_leaves.v1.security.model.RTransactionType[ indexNo=" + indexNo + " ]";
    }

}
