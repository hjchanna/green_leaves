/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.fertilizer.model;

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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Don
 */
@Entity
@Table(name = "t_fertilizer_detail")
public class TFertilizerDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "qty")
    private BigDecimal qty;

    @Size(max = 25)
    @Column(name = "status")
    private String status;

    @NotNull
    @Column(name = "product")
    private Integer product;
    
    @JsonIgnore
    @JoinColumn(name = "fertilizer", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private TFertilizer fertilizer;

    public TFertilizerDetail() {
    }

    public TFertilizerDetail(Integer indexNo, BigDecimal qty, String status, Integer product, TFertilizer fertilizer) {
        this.indexNo = indexNo;
        this.qty = qty;
        this.status = status;
        this.product = product;
        this.fertilizer = fertilizer;
    }

    public TFertilizerDetail(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TFertilizerDetail(Integer indexNo, BigDecimal qty) {
        this.indexNo = indexNo;
        this.qty = qty;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public BigDecimal getQty() {
        return qty;
    }

    public void setQty(BigDecimal qty) {
        this.qty = qty;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public TFertilizer getFertilizer() {
        return fertilizer;
    }

    public void setFertilizer(TFertilizer fertilizer) {
        this.fertilizer = fertilizer;
    }

    public Integer getProduct() {
        return product;
    }

    public void setProduct(Integer product) {
        this.product = product;
    }

}
