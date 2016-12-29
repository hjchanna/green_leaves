/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zmaster.cheque.model;

import com.mac.green_leaves.v1.master.bank_Account.model.MBankAccount;
import java.io.Serializable;
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

/**
 *
 * @author Nidura Prageeth
 */
@Entity(name = "com.mac.green_leaves.v1.green_leaves.zmaster.cheque.model.MChequeBook")
@Table(name = "m_cheque_book")
public class MChequeBook implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Basic(optional = false)
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    
    @Basic(optional = false)
    @Column(name = "start_no")
    private int startNo;
    
    @Basic(optional = false)
    @Column(name = "no_of_pages")
    private int noOfPages;
    
    @Basic(optional = false)
    @Column(name = "last_no")
    private int lastNo;
    
    @Basic(optional = false)
    @Column(name = "active")
    private boolean active;
    
    @JoinColumn(name = "bank_account", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MBankAccount bankAccount;

    public MChequeBook() {
    }

    public MChequeBook(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MChequeBook(Integer indexNo, Date date, int startNo, int noOfPages, int lastNo, boolean active, MBankAccount bankAccount) {
        this.indexNo = indexNo;
        this.date = date;
        this.startNo = startNo;
        this.noOfPages = noOfPages;
        this.lastNo = lastNo;
        this.active = active;
        this.bankAccount = bankAccount;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getStartNo() {
        return startNo;
    }

    public void setStartNo(int startNo) {
        this.startNo = startNo;
    }

    public int getNoOfPages() {
        return noOfPages;
    }

    public void setNoOfPages(int noOfPages) {
        this.noOfPages = noOfPages;
    }

    public int getLastNo() {
        return lastNo;
    }

    public void setLastNo(int lastNo) {
        this.lastNo = lastNo;
    }

    public boolean getActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public MBankAccount getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(MBankAccount bankAccount) {
        this.bankAccount = bankAccount;
    }

}
