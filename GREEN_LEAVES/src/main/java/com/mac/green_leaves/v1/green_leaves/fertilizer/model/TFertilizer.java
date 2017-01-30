/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.fertilizer.model;

import java.io.Serializable;
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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Don
 */
@Entity
@Table(name = "t_fertilizer")
public class TFertilizer implements Serializable {

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
    @Column(name = "number")
    private int number;

    @Basic(optional = false)
    @NotNull
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Basic(optional = false)
    @NotNull
    @Column(name = "transaction")
    private int transaction;
    @Size(max = 25)

    @Column(name = "status")
    private String status;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "fertilizer", fetch = FetchType.EAGER)
    private List<TFertilizerDetail> tFertilizerDetailList;

    @Basic(optional = false)
    @Column(name = "client")
    private Integer client;

    public TFertilizer() {
    }

    public TFertilizer(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TFertilizer(Integer indexNo, int branch, int number, Date date, int transaction, String status, List<TFertilizerDetail> tFertilizerDetailList, Integer client) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.number = number;
        this.date = date;
        this.transaction = transaction;
        this.status = status;
        this.tFertilizerDetailList = tFertilizerDetailList;
        this.client = client;
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

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
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

    @XmlTransient
    public List<TFertilizerDetail> getTFertilizerDetailList() {
        return tFertilizerDetailList;
    }

    public void setTFertilizerDetailList(List<TFertilizerDetail> tFertilizerDetailList) {
        this.tFertilizerDetailList = tFertilizerDetailList;
    }

    public List<TFertilizerDetail> gettFertilizerDetailList() {
        return tFertilizerDetailList;
    }

    public void settFertilizerDetailList(List<TFertilizerDetail> tFertilizerDetailList) {
        this.tFertilizerDetailList = tFertilizerDetailList;
    }

    public Integer getClient() {
        return client;
    }

    public void setClient(Integer client) {
        this.client = client;
    }

}
