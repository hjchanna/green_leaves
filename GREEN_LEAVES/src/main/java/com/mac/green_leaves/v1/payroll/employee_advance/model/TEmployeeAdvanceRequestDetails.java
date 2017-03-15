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
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "t_employee_advance_request_details")
public class TEmployeeAdvanceRequestDetails implements Serializable {

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

    @Basic(optional = false)
    @NotNull
    @Column(name = "employee")
    private int employee;
    
    @JsonIgnore
    @JoinColumn(name = "advance_request", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private TEmployeeAdvanceRequest advanceRequest;

    public TEmployeeAdvanceRequestDetails() {
    }

    public TEmployeeAdvanceRequestDetails(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TEmployeeAdvanceRequestDetails(Integer indexNo, Date asAtDate, BigDecimal amount, String status, int employee, TEmployeeAdvanceRequest advanceRequest) {
        this.indexNo = indexNo;
        this.asAtDate = asAtDate;
        this.amount = amount;
        this.status = status;
        this.employee = employee;
        this.advanceRequest = advanceRequest;
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

    public int getEmployee() {
        return employee;
    }

    public void setEmployee(int employee) {
        this.employee = employee;
    }

    public TEmployeeAdvanceRequest getAdvanceRequest() {
        return advanceRequest;
    }

    public void setAdvanceRequest(TEmployeeAdvanceRequest advanceRequest) {
        this.advanceRequest = advanceRequest;
    }

    
}
