/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_payment.model;

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
import javax.validation.constraints.NotNull;

/**
 *
 * @author Nidura Prageeth
 */
@Entity
@Table(name = "t_voucher_payment")
public class TVoucherPayment implements Serializable{

    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "index_no")
    private Integer indexNo;

    @NotNull
    @Basic(optional = false)
    @Column(name = "branch")
    private int branch;

    @NotNull
    @Basic(optional = false)
    @Column(name = "transaction")
    private int transaction;

    @NotNull
    @Basic(optional = false)
    @Column(name = "date")
    private Date date;

    @NotNull
    @Basic(optional = false)
    @Column(name = "cashier")
    private int cashier;

    @NotNull
    @Basic(optional = false)
    @Column(name = "voucher")
    private int voucher;

    @NotNull
    @Basic(optional = false)
    @Column(name = "amount")
    private BigDecimal amount;

    @NotNull
    @Basic(optional = false)
    @Column(name = "cash_amount")
    private BigDecimal cashAmount;

    @NotNull
    @Basic(optional = false)
    @Column(name = "cheque_amount")
    private BigDecimal chequeAmount;
    
    @NotNull
    @Basic(optional = false)
    @Column(name = "bank_amount")
    private BigDecimal bankAmount;

    @NotNull
    @Basic(optional = false)
    @Column(name = "status")
    private String status;

    public TVoucherPayment() {
    }

    public TVoucherPayment(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TVoucherPayment(Integer indexNo, int branch, int transaction, Date date, int cashier, int voucher, BigDecimal amount, BigDecimal cashAmount, BigDecimal chequeAmount,BigDecimal bankAmount, String status) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.transaction = transaction;
        this.date = date;
        this.cashier = cashier;
        this.voucher = voucher;
        this.amount = amount;
        this.cashAmount = cashAmount;
        this.chequeAmount = chequeAmount;
        this.bankAmount = bankAmount;
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

    public int getCashier() {
        return cashier;
    }

    public void setCashier(int cashier) {
        this.cashier = cashier;
    }

    public int getVoucher() {
        return voucher;
    }

    public void setVoucher(int voucher) {
        this.voucher = voucher;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getCashAmount() {
        return cashAmount;
    }

    public void setCashAmount(BigDecimal cashAmount) {
        this.cashAmount = cashAmount;
    }

    public BigDecimal getChequeAmount() {
        return chequeAmount;
    }

    public void setChequeAmount(BigDecimal chequeAmount) {
        this.chequeAmount = chequeAmount;
    }
    
    public BigDecimal getBankAmount() {
        return bankAmount;
    }

    public void setBankAmount(BigDecimal bankAmount) {
        this.bankAmount = bankAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "TVoucherPayment{" + "indexNo=" + indexNo + ", branch=" + branch + ", transaction=" + transaction + ", date=" + date + ", cashier=" + cashier + ", voucher=" + voucher + ", amount=" + amount + ", cashAmount=" + cashAmount + ", chequeAmount=" + chequeAmount + ", status=" + status + '}';
    }
    
    
}
