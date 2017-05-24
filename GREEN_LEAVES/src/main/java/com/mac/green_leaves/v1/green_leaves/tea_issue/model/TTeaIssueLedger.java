/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.tea_issue.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 *
 * @author hjcha
 */
@Entity
@Table(name = "t_tea_issue_ledger")
public class TTeaIssueLedger implements Serializable {

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
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Basic(optional = false)
    @NotNull
    @Column(name = "tea_issue")
    private int teaIssue;

    @Basic(optional = false)
    @NotNull
    @Column(name = "route_officer")
    private int routeOfficer;

    @Basic(optional = false)
    @NotNull
    @Column(name = "tea_issue_item")
    private int teaIssueItem;

    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Column(name = "in_qty")
    private BigDecimal inQty;

    @Basic(optional = false)
    @NotNull
    @Column(name = "out_qty")
    private BigDecimal outQty;

    public TTeaIssueLedger() {
    }

    public TTeaIssueLedger(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TTeaIssueLedger(Integer indexNo, int branch, Date date, int teaIssue, int routeOfficer, int teaIssueItem, BigDecimal inQty, BigDecimal outQty) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.date = date;
        this.teaIssue = teaIssue;
        this.routeOfficer = routeOfficer;
        this.teaIssueItem = teaIssueItem;
        this.inQty = inQty;
        this.outQty = outQty;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getTeaIssue() {
        return teaIssue;
    }

    public void setTeaIssue(int teaIssue) {
        this.teaIssue = teaIssue;
    }

    public int getRouteOfficer() {
        return routeOfficer;
    }

    public void setRouteOfficer(int routeOfficer) {
        this.routeOfficer = routeOfficer;
    }

    public int getTeaIssueItem() {
        return teaIssueItem;
    }

    public void setTeaIssueItem(int teaIssueItem) {
        this.teaIssueItem = teaIssueItem;
    }

    public BigDecimal getInQty() {
        return inQty;
    }

    public void setInQty(BigDecimal inQty) {
        this.inQty = inQty;
    }

    public BigDecimal getOutQty() {
        return outQty;
    }

    public void setOutQty(BigDecimal outQty) {
        this.outQty = outQty;
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
        if (!(object instanceof TTeaIssueLedger)) {
            return false;
        }
        TTeaIssueLedger other = (TTeaIssueLedger) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mac.green_leaves.v1.green_leaves.tea_issue.model.TTeaIssueLedger[ indexNo=" + indexNo + " ]";
    }
    
}
