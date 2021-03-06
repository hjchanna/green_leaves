/*
 *  TGreenLeavesReceive.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 25, 2016, 9:44:34 AM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Mohan
 */
@Entity
@Table(name = "t_green_leaves_receive")
public class TGreenLeavesReceive implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @Column(name = "branch")
    private int branch;

    @Basic(optional = false)
    @Column(name = "transaction")
    private int transaction;

    @Basic(optional = false)
    @Column(name = "number")
    private int number;

    @Basic(optional = false)
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Basic(optional = false)
    @Column(name = "route")
    private Integer route;

    @Basic(optional = false)
    @Column(name = "route_officer")
    private Integer routeOfficer;

    @Basic(optional = false)
    @Column(name = "route_helper")
    private Integer routeHelper;

    @Basic(optional = false)
    @Column(name = "vehicle")
    private Integer vehicle;

    @Basic(optional = false)
    @Column(name = "type")
    private String type;

    @Basic(optional = false)
    @Column(name = "status")
    private String status;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "greenLeavesReceive", fetch = FetchType.EAGER)
    private List<TGreenLeavesReceiveDetail> greenLeavesReceiveDetails;

    public TGreenLeavesReceive() {
    }

    public TGreenLeavesReceive(Integer indexNo, int branch, int transaction, int number, Date date, Integer route, Integer routeOfficer, Integer routeHelper, Integer vehicle, String status, List<TGreenLeavesReceiveDetail> greenLeavesReceiveDetails) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.transaction = transaction;
        this.number = number;
        this.date = date;
        this.route = route;
        this.routeOfficer = routeOfficer;
        this.routeHelper = routeHelper;
        this.vehicle = vehicle;
        this.status = status;
        this.greenLeavesReceiveDetails = greenLeavesReceiveDetails;
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

    public int getTransaction() {
        return transaction;
    }

    public void setTransaction(int transaction) {
        this.transaction = transaction;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getRoute() {
        return route;
    }

    public void setRoute(Integer route) {
        this.route = route;
    }

    public Integer getRouteOfficer() {
        return routeOfficer;
    }

    public void setRouteOfficer(Integer routeOfficer) {
        this.routeOfficer = routeOfficer;
    }

    public Integer getRouteHelper() {
        return routeHelper;
    }

    public void setRouteHelper(Integer routeHelper) {
        this.routeHelper = routeHelper;
    }

    public Integer getVehicle() {
        return vehicle;
    }

    public void setVehicle(Integer vehicle) {
        this.vehicle = vehicle;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<TGreenLeavesReceiveDetail> getGreenLeavesReceiveDetails() {
        return greenLeavesReceiveDetails;
    }

    public void setGreenLeavesReceiveDetails(List<TGreenLeavesReceiveDetail> greenLeavesReceiveDetails) {
        this.greenLeavesReceiveDetails = greenLeavesReceiveDetails;
    }

}
