/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_loan.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mac.green_leaves.v1.green_leaves.client_loan.model.TLoanRequest;
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

/**
 *
 * @author L T430
 */
@Entity
@Table(name = "t_employee_loan_detail")
public class TEmployeeLoanDetail implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "employee")
    private int employee;

    @Basic(optional = false)
    @Column(name = "loan_start_date")
    @Temporal(TemporalType.DATE)
    private Date loanStartDate;

    @Basic(optional = false)
    @NotNull
    @Column(name = "loan_amount")
    private BigDecimal amount;

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
    @Column(name = "agreement_number")
    private String agreementNumber;

    @Basic(optional = false)
    @Column(name = "status")
    private String status;
    
    @JsonIgnore
    @JoinColumn(name = "employee_loan", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private TEmployeeLoan employeeLoan;

    public TEmployeeLoanDetail() {
    }
    
//    public TEmployeeLoanDetail(Integer indexNo, int employee, Date loanStartDate, BigDecimal interestRate, int installmentCount, BigDecimal installmentAmount, BigDecimal panaltyRate, BigDecimal amount, String status, String agreementNumber, TEmployeeLoan loanRequest) {
//        this.indexNo = indexNo;
//        this.employee = employee;
//        this.loanStartDate = loanStartDate;
//        this.interestRate = interestRate;
//        this.installmentCount = installmentCount;
//        this.installmentAmount = installmentAmount;
//        this.panaltyRate = panaltyRate;
//        this.amount = amount;
//        this.status = status;
//        this.agreementNumber = agreementNumber;
//        this.employeeLoan = loanRequest;
//    }

    public TEmployeeLoan getLoanRequest() {
        return employeeLoan;
    }

    public void setLoanRequest(TEmployeeLoan loanRequest) {
        this.employeeLoan = loanRequest;
    }

    public String getAgreementNumber() {
        return agreementNumber;
    }

    public void setAgreementNumber(String agreementNumber) {
        this.agreementNumber = agreementNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getPanaltyRate() {
        return panaltyRate;
    }

    public void setPanaltyRate(BigDecimal panaltyRate) {
        this.panaltyRate = panaltyRate;
    }

    public BigDecimal getInstallmentAmount() {
        return installmentAmount;
    }

    public void setInstallmentAmount(BigDecimal installmentAmount) {
        this.installmentAmount = installmentAmount;
    }

    public int getInstallmentCount() {
        return installmentCount;
    }

    public void setInstallmentCount(int installmentCount) {
        this.installmentCount = installmentCount;
    }

    public BigDecimal getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
    }

    public Date getLoanStartDate() {
        return loanStartDate;
    }

    public void setLoanStartDate(Date loanStartDate) {
        this.loanStartDate = loanStartDate;
    }

    public int getEmployee() {
        return employee;
    }

    public void setEmployee(int employee) {
        this.employee = employee;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }
    
    

}
