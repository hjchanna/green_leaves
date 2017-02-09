/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.tea_issue.model;

import java.io.Serializable;
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

/**
 *
 * @author Kelum
 */
@Entity(name="com.mac.green_leaves.v1.master.tea_issue.model.MTeaIssue")
@Table(name="t_tea_issue")
public class MTeaIssue implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @NotNull
    @Basic(optional = false)
    @Column(name = "branch")
    private int branch;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "transaction")
    private int transaction;

    @Basic(optional = false)
    @NotNull
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "number")
    private int number;
    
    @Basic(optional = false)
    @Column(name = "client")
    private Integer client;
    
    @Basic(optional = false)
    @Column(name = "tea_grade")
    private Integer teaGrade;
    
    @Basic(optional = false)
    @Column(name = "route_officer")
    private Integer officer;
    
    @Basic(optional = false)
    @Column(name = "status")
    private String status;

    public MTeaIssue() {
    }

    public MTeaIssue(Integer indexNo, int branch, int transaction, Date date, int number, Integer client, Integer teaGrade, Integer officer, String status) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.transaction = transaction;
        this.date = date;
        this.number = number;
        this.client = client;
        this.teaGrade = teaGrade;
        this.officer = officer;
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

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public Integer getClient() {
        return client;
    }

    public void setClient(Integer client) {
        this.client = client;
    }

    public Integer getTeaGrade() {
        return teaGrade;
    }

    public void setTeaGrade(Integer teaGrade) {
        this.teaGrade = teaGrade;
    }

    public Integer getOfficer() {
        return officer;
    }

    public void setOfficer(Integer officer) {
        this.officer = officer;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    
    
}
