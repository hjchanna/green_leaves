/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_payment.model;

import com.mac.green_leaves.v1.green_leaves.zmaster.client.model.MClient;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.GeneratorType;

/**
 *
 * @author Nidura Prageeth
 */
@Entity
@Table(name = "t_voucher")
public class TVoucher implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @NotNull
    @Column(name = "branch")
    @Basic(optional = false)
    private Integer branch;

    @NotNull
    @Column(name = "transaction")
    @Basic(optional = false)
    private Integer transaction;

    @NotNull
    @Column(name = "transaction_type")
    @Basic(optional = false)
    private int transactionType;

    @NotNull
    @Column(name = "date")
    @Basic(optional = false)
    private Date date;

    @Basic(optional = false)
    @Column(name = "client")
    private int client;

    @Basic(optional = false)
    @Column(name = "employee")
    private int employee;

    @NotNull
    @Basic(optional = false)
    @Column(name = "description")
    private String description;

    @NotNull
    @Basic(optional = false)
    @Column(name = "amount")
    private BigDecimal amount;
    
    @NotNull
    @Basic(optional = false)
    @Column(name = "payment_type")
    private String paymentType;

    @NotNull
    @Basic(optional = false)
    @Column(name = "status")
    private String status;

    public TVoucher() {
    }

    public TVoucher(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TVoucher(Integer indexNo, Integer branch, Integer transaction, int transactionType, Date date, int client, int employee, String description, BigDecimal amount, String paymentType, String status) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.transaction = transaction;
        this.transactionType = transactionType;
        this.date = date;
        this.client = client;
        this.employee = employee;
        this.description = description;
        this.amount = amount;
        this.paymentType = paymentType;
        this.status = status;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public Integer getTransaction() {
        return transaction;
    }

    public void setTransaction(Integer transaction) {
        this.transaction = transaction;
    }

    public int getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(int transactionType) {
        this.transactionType = transactionType;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getClient() {
        return client;
    }

    public void setClient(int client) {
        this.client = client;
    }

    public int getEmployee() {
        return employee;
    }

    public void setEmployee(int employee) {
        this.employee = employee;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
}
