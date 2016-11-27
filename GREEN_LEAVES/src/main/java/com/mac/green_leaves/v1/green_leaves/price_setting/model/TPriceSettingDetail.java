/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.price_setting.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.math.BigDecimal;
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
 * @author Mohan
 */
@Entity
@Table(name = "t_price_setting_detail")
public class TPriceSettingDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "normal_rate")
    private BigDecimal normalRate;

    @Basic(optional = false)
    @NotNull
    @Column(name = "super_rate")
    private BigDecimal superRate;

    @JsonIgnore
    @JoinColumn(name = "price_setting", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private TPriceSetting priceSetting;

    @Basic(optional = false)
    @NotNull
    @Column(name = "route")
    private Integer route;

    public TPriceSettingDetail() {
    }

    public TPriceSettingDetail(Integer indexNo, BigDecimal normalRate, BigDecimal superRate, TPriceSetting priceSetting, Integer route) {
        this.indexNo = indexNo;
        this.normalRate = normalRate;
        this.superRate = superRate;
        this.priceSetting = priceSetting;
        this.route = route;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public BigDecimal getNormalRate() {
        return normalRate;
    }

    public void setNormalRate(BigDecimal normalRate) {
        this.normalRate = normalRate;
    }

    public BigDecimal getSuperRate() {
        return superRate;
    }

    public void setSuperRate(BigDecimal superRate) {
        this.superRate = superRate;
    }

    public TPriceSetting getPriceSetting() {
        return priceSetting;
    }

    public void setPriceSetting(TPriceSetting priceSetting) {
        this.priceSetting = priceSetting;
    }

    public Integer getRoute() {
        return route;
    }

    public void setRoute(Integer route) {
        this.route = route;
    }

    @Override
    public String toString() {
        return "TPriceSettingDetail{" + "indexNo=" + indexNo + ", normalRate=" + normalRate + ", superRate=" + superRate + ", priceSetting=" + priceSetting + ", route=" + route + '}';
    }

}
