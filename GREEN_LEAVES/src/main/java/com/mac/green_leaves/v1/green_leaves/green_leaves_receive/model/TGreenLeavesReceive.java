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
import javax.validation.constraints.NotNull;

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
    private int route;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "greenLeavesReceive", fetch = FetchType.EAGER)
    private List<TGreenLeavesReceiveDetail> greenLeavesReceiveDetails;

    public TGreenLeavesReceive() {
    }

    public TGreenLeavesReceive(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TGreenLeavesReceive(Integer indexNo, int branch, int transaction, int number, Date date, int route) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.transaction = transaction;
        this.number = number;
        this.date = date;
        this.route = route;
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

    public int getRoute() {
        return route;
    }

    public void setRoute(int route) {
        this.route = route;
    }

    public List<TGreenLeavesReceiveDetail> getGreenLeavesReceiveDetails() {
        return greenLeavesReceiveDetails;
    }

    public void setGreenLeavesReceiveDetails(List<TGreenLeavesReceiveDetail> greenLeavesReceiveDetails) {
        this.greenLeavesReceiveDetails = greenLeavesReceiveDetails;
    }

    @Override
    public String toString() {
        return "TGreenLeavesReceive{" + "indexNo=" + indexNo + ", branch=" + branch + ", transaction=" + transaction + ", number=" + number + ", date=" + date + ", route=" + route + ", greenLeavesReceiveDetails=" + greenLeavesReceiveDetails + '}';
    }

}
