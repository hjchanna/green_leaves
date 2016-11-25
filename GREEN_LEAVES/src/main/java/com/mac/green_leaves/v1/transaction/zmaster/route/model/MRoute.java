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
package com.mac.green_leaves.v1.transaction.zmaster.route.model;

import com.mac.green_leaves.v1.transaction.zmaster.employee.model.MEmployee;
import com.mac.green_leaves.v1.transaction.zmaster.vehicle.model.MVehicle;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

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
    @Column(name = "name")
    private String name;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "vehicle")
    @ManyToOne(fetch = FetchType.EAGER)
    private MVehicle vehicle;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "route_officer")
    @ManyToOne(fetch = FetchType.EAGER)
    private MEmployee routeOfficer;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "route_helper")
    @ManyToOne(fetch = FetchType.EAGER)
    private MEmployee routeHelper;

    @Basic(optional = false)
    @NotNull
    @Column(name = "transport_deduction_rate")
    private Double tdRate;

    public MRoute() {
    }

    public MRoute(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MRoute(Integer indexNo, int branch, String name, MVehicle vehicle, MEmployee routeOfficer, MEmployee routeHelper, Double tdRate) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.name = name;
        this.vehicle = vehicle;
        this.routeOfficer = routeOfficer;
        this.routeHelper = routeHelper;
        this.tdRate = tdRate;
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

    public MVehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(MVehicle vehicle) {
        this.vehicle = vehicle;
    }

    public MEmployee getRouteOfficer() {
        return routeOfficer;
    }

    public void setRouteOfficer(MEmployee routeOfficer) {
        this.routeOfficer = routeOfficer;
    }

    public MEmployee getRouteHelper() {
        return routeHelper;
    }

    public void setRouteHelper(MEmployee routeHelper) {
        this.routeHelper = routeHelper;
    }

    public Double getTdRate() {
        return tdRate;
    }

    public void setTdRate(Double tdRate) {
        this.tdRate = tdRate;
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

//    @Override
//    public String toString() {
//        return "com.mac.gl.transaction.green_leaves.model.zmaster.MRoute[ indexNo=" + indexNo + " ]";
//    }
}
