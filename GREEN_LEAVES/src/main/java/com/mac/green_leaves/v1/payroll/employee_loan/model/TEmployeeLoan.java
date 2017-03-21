/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_loan.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mac.green_leaves.v1.green_leaves.client_loan.model.TLoanRequestDetail;
import java.io.Serializable;
import java.util.Collection;
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
 * @author L T430
 */
@Entity
@Table(name = "t_employee_loan")
public class TEmployeeLoan implements Serializable{
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
    @Column(name = "transaction")
    private int transaction;

    @Basic(optional = false)
    @Column(name = "status")
    private String status;

    @Basic(optional = false)
    @NotNull
    @Column(name = "number")
    private int number;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employeeLoan", fetch = FetchType.EAGER)
    private List<TEmployeeLoanDetail> loanRequestDetails; 

    public TEmployeeLoan() {
    }

    public TEmployeeLoan(Integer indexNo, int branch, Date date, int transaction, String status, int number, List<TEmployeeLoanDetail> loanRequestDetails) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.date = date;
        this.transaction = transaction;
        this.status = status;
        this.number = number;
        this.loanRequestDetails = loanRequestDetails;
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

    public int getTransaction() {
        return transaction;
    }

    public void setTransaction(int transaction) {
        this.transaction = transaction;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public Collection<TEmployeeLoanDetail> getLoanRequestDetails() {
        return loanRequestDetails;
    }

    public void setLoanRequestDetails(List<TEmployeeLoanDetail> loanRequestDetails) {
        this.loanRequestDetails = loanRequestDetails;
    }
 
}
