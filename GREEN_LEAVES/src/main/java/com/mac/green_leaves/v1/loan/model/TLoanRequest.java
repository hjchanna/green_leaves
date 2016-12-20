/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.loan.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;
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
import javax.validation.constraints.Size;

/**
 *
 * @author Nidura Prageeth
 */
@Entity
@Table(name = "t_loan")
public class TLoanRequest implements Serializable {

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
    @Column(name = "status2")
    private String status2;

    @Basic(optional = false)
    @NotNull
    @Column(name = "number")
    private int number;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "loanRequest", fetch = FetchType.EAGER, orphanRemoval = true)
    private Collection<TLoanRequestDetail> loanRequestDetails;

    public TLoanRequest() {
    }

    public TLoanRequest(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TLoanRequest(Integer indexNo, int branch, Date date, int transaction, String status, String status2, int number, Collection<TLoanRequestDetail> loanRequestDetails) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.date = date;
        this.transaction = transaction;
        this.status = status;
        this.status2 = status2;
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

    public String getStatus2() {
        return status2;
    }

    public void setStatus2(String status2) {
        this.status2 = status2;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public Collection<TLoanRequestDetail> getLoanRequestDetails() {
        return loanRequestDetails;
    }

    public void setLoanRequestDetails(Collection<TLoanRequestDetail> loanRequestDetails) {
        this.loanRequestDetails = loanRequestDetails;
    }

    

}
