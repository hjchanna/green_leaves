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
 * @author Don
 */
@Entity
@Table(name = "t_route_officer_tea_ledger")
public class TRouteOfficerTeaLedger implements Serializable {

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
    @Column(name = "in_qty")
    private BigDecimal inQty;

    @Basic(optional = false)
    @NotNull
    @Column(name = "out_qty")
    private BigDecimal outQty;

    @Column(name = "tea_grade")
    private Integer teaGrade;

    @Column(name = "tea_issue")
    private Integer teaIssue;

    @Column(name = "route_officer")
    private Integer routeOfficer;

    public TRouteOfficerTeaLedger() {
    }

    public TRouteOfficerTeaLedger(Integer indexNo, int branch, Date date, BigDecimal inQty, BigDecimal outQty, Integer teaGrade, Integer teaIssue, Integer routeOfficer) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.date = date;
        this.inQty = inQty;
        this.outQty = outQty;
        this.teaGrade = teaGrade;
        this.teaIssue = teaIssue;
        this.routeOfficer = routeOfficer;
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

    public Integer getTeaGrade() {
        return teaGrade;
    }

    public void setTeaGrade(Integer teaGrade) {
        this.teaGrade = teaGrade;
    }

    public Integer getTeaIssue() {
        return teaIssue;
    }

    public void setTeaIssue(Integer teaIssue) {
        this.teaIssue = teaIssue;
    }

    public Integer getRouteOfficer() {
        return routeOfficer;
    }

    public void setRouteOfficer(Integer routeOfficer) {
        this.routeOfficer = routeOfficer;
    }

}
