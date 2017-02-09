/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_loan.model;

import com.mac.green_leaves.v1.green_leaves.client_advance.model.*;
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
import javax.validation.constraints.Size;

/**
 *
 * @author Mohan
 */
@Entity
@Table(name = "t_loan_detail")
public class TLoanRequestDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "client")
    private int client;

    @Basic(optional = false)
    @NotNull
    @Column(name = "expected_loan_date")
    @Temporal(TemporalType.DATE)
    private Date expectedLoanDate;

    @Basic(optional = false)
    @Column(name = "loan_start_date")
    @Temporal(TemporalType.DATE)
    private Date loanStartDate;

    @Basic(optional = false)
    @Column(name = "interest_rate")
    private BigDecimal interestRate;

    @Basic(optional = false)
    @Column(name = "installment_count")
    private int installmentCount;

    @Basic(optional = false)
    @Column(name = "installment_amount")
    private BigDecimal installmentAmount;

    @Basic(optional = false)
    @Column(name = "panalty_rate")
    private BigDecimal panaltyRate;

    @Basic(optional = false)
    @NotNull
    @Column(name = "loan_amount")
    private BigDecimal amount;

    @Basic(optional = false)
    @NotNull
    @Column(name = "remark")
    private String remark;

    @Basic(optional = false)
    @Column(name = "status")
    private String status;

    @Basic(optional = false)
    @Column(name = "status2")
    private String status2;

    @JsonIgnore
    @JoinColumn(name = "loan", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private TLoanRequest loanRequest;

    public TLoanRequestDetail() {
    }

    public TLoanRequestDetail(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TLoanRequestDetail(Integer indexNo, int client, Date expectedLoanDate, Date loanStartDate, BigDecimal interestRate, int installmentCount, BigDecimal installmentAmount, BigDecimal panaltyRate, BigDecimal amount, String remark, String status, String status2, TLoanRequest loanRequest) {
        this.indexNo = indexNo;
        this.client = client;
        this.expectedLoanDate = expectedLoanDate;
        this.loanStartDate = loanStartDate;
        this.interestRate = interestRate;
        this.installmentCount = installmentCount;
        this.installmentAmount = installmentAmount;
        this.panaltyRate = panaltyRate;
        this.amount = amount;
        this.remark = remark;
        this.status = status;
        this.status2 = status2;
        this.loanRequest = loanRequest;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public int getClient() {
        return client;
    }

    public void setClient(int client) {
        this.client = client;
    }

    public Date getExpectedLoanDate() {
        return expectedLoanDate;
    }

    public void setExpectedLoanDate(Date expectedLoanDate) {
        this.expectedLoanDate = expectedLoanDate;
    }

    public Date getLoanStartDate() {
        return loanStartDate;
    }

    public void setLoanStartDate(Date loanStartDate) {
        this.loanStartDate = loanStartDate;
    }

    public BigDecimal getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
    }

    public int getInstallmentCount() {
        return installmentCount;
    }

    public void setInstallmentCount(int installmentCount) {
        this.installmentCount = installmentCount;
    }

    public BigDecimal getInstallmentAmount() {
        return installmentAmount;
    }

    public void setInstallmentAmount(BigDecimal installmentAmount) {
        this.installmentAmount = installmentAmount;
    }

    public BigDecimal getPanaltyRate() {
        return panaltyRate;
    }

    public void setPanaltyRate(BigDecimal panaltyRate) {
        this.panaltyRate = panaltyRate;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus2() {
        return status2;
    }

    public void setStatus2(String status2) {
        this.status2 = status2;
    }

    public TLoanRequest getLoanRequest() {
        return loanRequest;
    }

    public void setLoanRequest(TLoanRequest loanRequest) {
        this.loanRequest = loanRequest;
    }

    
}
