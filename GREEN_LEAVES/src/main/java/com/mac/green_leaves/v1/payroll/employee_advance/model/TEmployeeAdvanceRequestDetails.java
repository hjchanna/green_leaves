/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_advance.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "t_employee_advance_request_details")
public class TEmployeeAdvanceRequestDetails implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Basic(optional = false)
    @Column(name = "as_at_date")
    @Temporal(TemporalType.DATE)
    private Date asAtDate;
    
    @Basic(optional = false)
    @Column(name = "amount")
    private BigDecimal amount;
    
    @Basic(optional = false)
    @Column(name = "status")
    private String status;
    
    @JoinColumn(name = "employee", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Integer employee;
    
    @JsonIgnore
    @JoinColumn(name = "advance_request", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Integer advanceRequest;

    public TEmployeeAdvanceRequestDetails() {
    }

    public TEmployeeAdvanceRequestDetails(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TEmployeeAdvanceRequestDetails(Integer indexNo, Date asAtDate, BigDecimal amount, String status) {
        this.indexNo = indexNo;
        this.asAtDate = asAtDate;
        this.amount = amount;
        this.status = status;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Date getAsAtDate() {
        return asAtDate;
    }

    public void setAsAtDate(Date asAtDate) {
        this.asAtDate = asAtDate;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getEmployee() {
        return employee;
    }

    public void setEmployee(Integer employee) {
        this.employee = employee;
    }

    public Integer getAdvanceRequest() {
        return advanceRequest;
    }

    public void setAdvanceRequest(Integer advanceRequest) {
        this.advanceRequest = advanceRequest;
    }

}
