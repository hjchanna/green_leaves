/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger.model;

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
import javax.validation.constraints.Size;

/**
 *
 * @author hjcha
 */
@Entity
@Table(name = "t_client_ledger")
public class TClientLedger implements Serializable {

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
    @Column(name = "transaction")
    private int transaction;

//    @Basic(optional = false)
//    @Column(name = "transaction_type")
//    private Integer transactionType;

    @Basic(optional = false)
    @NotNull
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "settlement_type")
    private String settlementType;

    @Basic(optional = false)
    @NotNull
    @Column(name = "settlement_order")
    private int settlementOrder;

    @Basic(optional = false)
    @NotNull
    @Column(name = "client")
    private int client;

// @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Column(name = "debit_amount")
    private BigDecimal debitAmount;

    @Basic(optional = false)
    @NotNull
    @Column(name = "credit_amount")
    private BigDecimal creditAmount;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "status")
    private String status;

    public TClientLedger() {
    }

    public TClientLedger(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TClientLedger(Integer indexNo, int branch, int transaction, Date date, String settlementType, int settlementOrder, BigDecimal debitAmount, BigDecimal creditAmount, String status) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.transaction = transaction;
        this.date = date;
        this.settlementType = settlementType;
        this.settlementOrder = settlementOrder;
        this.debitAmount = debitAmount;
        this.creditAmount = creditAmount;
        this.status = status;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getSettlementType() {
        return settlementType;
    }

    public void setSettlementType(String settlementType) {
        this.settlementType = settlementType;
    }

    public int getSettlementOrder() {
        return settlementOrder;
    }

    public void setSettlementOrder(int settlementOrder) {
        this.settlementOrder = settlementOrder;
    }

    public int getClient() {
        return client;
    }

    public void setClient(int client) {
        this.client = client;
    }

    public BigDecimal getDebitAmount() {
        return debitAmount;
    }

    public void setDebitAmount(BigDecimal debitAmount) {
        this.debitAmount = debitAmount;
    }

    public BigDecimal getCreditAmount() {
        return creditAmount;
    }

    public void setCreditAmount(BigDecimal creditAmount) {
        this.creditAmount = creditAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
        if (!(object instanceof TClientLedger)) {
            return false;
        }
        TClientLedger other = (TClientLedger) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "TClientLedger{" + "indexNo=" + indexNo + ", branch=" + branch + ", transaction=" + transaction + ", date=" + date + ", settlementType=" + settlementType + ", settlementOrder=" + settlementOrder + ", client=" + client + ", debitAmount=" + debitAmount + ", creditAmount=" + creditAmount + ", status=" + status + '}';
    }

//    public Integer getTransactionType() {
//        return transactionType;
//    }
//
//    public void setTransactionType(Integer transactionType) {
//        this.transactionType = transactionType;
//    }

}
