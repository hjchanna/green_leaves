/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.fertilizer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.math.BigDecimal;
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

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "type")
    private String type;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "status")
    private String status;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "month")
    private String month;

    @Basic(optional = false)
    @Column(name = "route")
    private Integer route;

    @Basic(optional = false)
    @Column(name = "route_officer")
    private Integer routeOfficer;

    @Basic(optional = false)
    @Column(name = "route_helper")
    private Integer routeHelper;

    @Basic(optional = false)
    @Column(name = "vehicle")
    private Integer vehicle;

    @Basic(optional = false)
    @Column(name = "client")
    private Integer client;

    @Basic(optional = false)
    @NotNull
    @Column(name = "amount")
    private BigDecimal amount;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "fertilizer", fetch = FetchType.EAGER)
    private List<TFertilizerDetail> tFertilizerDetailList;

    public TFertilizer() {
    }

    public TFertilizer(Integer indexNo, int branch, int number, Date date, int transaction, String type, String status, String month, Integer route, Integer routeOfficer, Integer routeHelper, Integer vehicle, Integer client, BigDecimal amount, List<TFertilizerDetail> tFertilizerDetailList) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.number = number;
        this.date = date;
        this.transaction = transaction;
        this.type = type;
        this.status = status;
        this.month = month;
        this.route = route;
        this.routeOfficer = routeOfficer;
        this.routeHelper = routeHelper;
        this.vehicle = vehicle;
        this.client = client;
        this.amount = amount;
        this.tFertilizerDetailList = tFertilizerDetailList;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Integer getRouteOfficer() {
        return routeOfficer;
    }

    public void setRouteOfficer(Integer routeOfficer) {
        this.routeOfficer = routeOfficer;
    }

    public Integer getRoute() {
        return route;
    }

    public void setRoute(Integer route) {
        this.route = route;
    }

    public Integer getRouteHelper() {
        return routeHelper;
    }

    public void setRouteHelper(Integer routeHelper) {
        this.routeHelper = routeHelper;
    }

    public Integer getVehicle() {
        return vehicle;
    }

    public void setVehicle(Integer vehicle) {
        this.vehicle = vehicle;
    }

    public Integer getClient() {
        return client;
    }

    public void setClient(Integer client) {
        this.client = client;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public List<TFertilizerDetail> gettFertilizerDetailList() {
        return tFertilizerDetailList;
    }

    public void settFertilizerDetailList(List<TFertilizerDetail> tFertilizerDetailList) {
        this.tFertilizerDetailList = tFertilizerDetailList;
    }

    @XmlTransient
    public List<TFertilizerDetail> getTFertilizerDetailList() {
        return tFertilizerDetailList;
    }

    public void setTFertilizerDetailList(List<TFertilizerDetail> tFertilizerDetailList) {
        this.tFertilizerDetailList = tFertilizerDetailList;
    }

    @Override
    public String toString() {
        return "TFertilizer{" + "indexNo=" + indexNo + ", branch=" + branch + ", number=" + number + ", date=" + date + ", transaction=" + transaction + ", type=" + type + ", status=" + status + ", month=" + month + ", routeOfficer=" + routeOfficer + ", client=" + client + ", tFertilizerDetailList=" + tFertilizerDetailList + '}';
    }

}
