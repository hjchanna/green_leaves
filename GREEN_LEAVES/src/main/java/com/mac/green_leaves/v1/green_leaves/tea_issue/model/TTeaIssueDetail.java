/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.tea_issue.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Entity
@Table(name = "t_tea_issue_detail")
public class TTeaIssueDetail implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
 
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Column(name = "unit_price")
    private BigDecimal unitPrice;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "quantity")
    private BigDecimal quantity;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "value")
    private BigDecimal value;
    
    @Column(name = "client")
    private Integer client;
    
    @Column(name = "route_officer")
    private Integer routeOfficer;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "tea_issue_item")
    private int teaIssueItem;
    
    @JsonIgnore
    @JoinColumn(name = "tea_issue", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private TTeaIssue teaIssue;

    public TTeaIssueDetail() {
    }

    public TTeaIssueDetail(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TTeaIssueDetail(Integer indexNo, BigDecimal unitPrice, BigDecimal quantity, BigDecimal value, int teaIssueItem) {
        this.indexNo = indexNo;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.value = value;
        this.teaIssueItem = teaIssueItem;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public Integer getClient() {
        return client;
    }

    public void setClient(Integer client) {
        this.client = client;
    }

    public Integer getRouteOfficer() {
        return routeOfficer;
    }

    public void setRouteOfficer(Integer routeOfficer) {
        this.routeOfficer = routeOfficer;
    }

    public int getTeaIssueItem() {
        return teaIssueItem;
    }

    public void setTeaIssueItem(int teaIssueItem) {
        this.teaIssueItem = teaIssueItem;
    }

    public TTeaIssue getTeaIssue() {
        return teaIssue;
    }

    public void setTeaIssue(TTeaIssue teaIssue) {
        this.teaIssue = teaIssue;
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
        if (!(object instanceof TTeaIssueDetail)) {
            return false;
        }
        TTeaIssueDetail other = (TTeaIssueDetail) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mac.green_leaves.v1.green_leaves.tea_issue.model.TTeaIssueDetail[ indexNo=" + indexNo + " ]";
    }
}
