/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.route.model;

import com.mac.green_leaves.v1.green_leaves.zmaster.employee.model.MEmployee;
import com.mac.green_leaves.v1.green_leaves.zmaster.vehicle.model.MVehicle;
import java.io.Serializable;
import java.math.BigDecimal;
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
 * @author hjcha
 */
@Entity(name = "com.mac.green_leaves.v1.master.route.model.MRoute")
@Table(name = "m_route")
public class MRoute implements Serializable{

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
    private BigDecimal transportDeductionRate;

    public MRoute() {
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

    public BigDecimal getTransportDeductionRate() {
        return transportDeductionRate;
    }

    public void setTransportDeductionRate(BigDecimal transportDeductionRate) {
        this.transportDeductionRate = transportDeductionRate;
    }

}
