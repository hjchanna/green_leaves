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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Kavish Manjitha
 */
@Entity
@Table(name = "t_fertilizer_detail")
public class TFertilizerDetail implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @Column(name = "client")
    private Integer client;

    @Basic(optional = false)
    @Column(name = "fertilizer_item")
    private Integer fertlizerItem;

    @Basic(optional = false)
    @NotNull
    @Column(name = "qty")
    private int qty;

    @Basic(optional = false)
    @NotNull
    @Column(name = "amount")
    private BigDecimal amount;

    @Basic(optional = false)
    @NotNull
    @Column(name = "instalment_count")
    private int instalmentCount;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "status")
    private String status;

    @JsonIgnore
    @JoinColumn(name = "fertilizer", referencedColumnName = "index_no")
    @ManyToOne(optional = false)
    private TFertilizer fertilizer;

    public TFertilizerDetail() {
    }

    public TFertilizerDetail(Integer indexNo, Integer client, Integer fertlizerItem, int qty, BigDecimal amount, int instalmentCount, String status, TFertilizer fertilizer) {
        this.indexNo = indexNo;
        this.client = client;
        this.fertlizerItem = fertlizerItem;
        this.qty = qty;
        this.amount = amount;
        this.instalmentCount = instalmentCount;
        this.status = status;
        this.fertilizer = fertilizer;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public int getInstalmentCount() {
        return instalmentCount;
    }

    public void setInstalmentCount(int instalmentCount) {
        this.instalmentCount = instalmentCount;
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

    public Integer getClient() {
        return client;
    }

    public void setClient(Integer client) {
        this.client = client;
    }

    public Integer getFertlizerItem() {
        return fertlizerItem;
    }

    public void setFertlizerItem(Integer fertlizerItem) {
        this.fertlizerItem = fertlizerItem;
    }
    
}
