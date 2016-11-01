/*
 *  MRoute.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 25, 2016, 1:07:59 PM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.gl.transaction.green_leaves.model.zmaster;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Mohan
 */
@Entity
@Table(name = "m_route")
public class MRoute implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "branch")
    private int branch;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "name")
    private String name;

    @Basic(optional = false)
    @NotNull
    @Column(name = "route_officer")
    private int routeOfficer;

    @Basic(optional = false)
    @NotNull
    @Column(name = "route_helper")
    private int routeHelper;

    public MRoute() {
    }

    public MRoute(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MRoute(Integer indexNo, int branch, String name, int routeOfficer, int routeHelper) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.name = name;
        this.routeOfficer = routeOfficer;
        this.routeHelper = routeHelper;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public int getBranch() {
        return branch;
    }

    public void setBranch(int branch) {
        this.branch = branch;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRouteOfficer() {
        return routeOfficer;
    }

    public void setRouteOfficer(int routeOfficer) {
        this.routeOfficer = routeOfficer;
    }

    public int getRouteHelper() {
        return routeHelper;
    }

    public void setRouteHelper(int routeHelper) {
        this.routeHelper = routeHelper;
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
        if (!(object instanceof MRoute)) {
            return false;
        }
        MRoute other = (MRoute) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mac.gl.transaction.green_leaves.model.zmaster.MRoute[ indexNo=" + indexNo + " ]";
    }

}
