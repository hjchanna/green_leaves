/*
 *  TGreenLeavesReceiveDetail.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 25, 2016, 9:44:33 AM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.green_leaves.v1.transaction.green_leaves_receive.model;

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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Mohan
 */
@Entity
@Table(name = "t_green_leaves_receive_detail")
public class TGreenLeavesReceiveDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "branch")
    private int branch;

    @JsonIgnore
    @JoinColumn(name = "green_leaves_receive", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private TGreenLeavesReceive greenLeavesReceive;

    @Basic(optional = false)
    @NotNull
    @Column(name = "normal_leaves_quantity")
    private BigDecimal normalLeavesQuantity;

    @Basic(optional = false)
    @NotNull
    @Column(name = "super_leaves_quantity")
    private BigDecimal superLeavesQuantity;

    @Basic(optional = false)
    @NotNull
    @Column(name = "client")
    private int client;

    public TGreenLeavesReceiveDetail() {
    }

    public TGreenLeavesReceiveDetail(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TGreenLeavesReceiveDetail(Integer indexNo, int branch, BigDecimal normalLeavesQuantity, BigDecimal superLeavesQuantity, int client) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.normalLeavesQuantity = normalLeavesQuantity;
        this.superLeavesQuantity = superLeavesQuantity;
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

    public BigDecimal getNormalLeavesQuantity() {
        return normalLeavesQuantity;
    }

    public void setNormalLeavesQuantity(BigDecimal normalLeavesQuantity) {
        this.normalLeavesQuantity = normalLeavesQuantity;
    }

    public BigDecimal getSuperLeavesQuantity() {
        return superLeavesQuantity;
    }

    public void setSuperLeavesQuantity(BigDecimal superLeavesQuantity) {
        this.superLeavesQuantity = superLeavesQuantity;
    }

    public int getClient() {
        return client;
    }

    public void setClient(int client) {
        this.client = client;
    }

    public TGreenLeavesReceive getGreenLeavesReceive() {
        return greenLeavesReceive;
    }

    public void setGreenLeavesReceive(TGreenLeavesReceive greenLeavesReceive) {
        this.greenLeavesReceive = greenLeavesReceive;
    }

    @Override
    public String toString() {
        return "TGreenLeavesReceiveDetail{" + "indexNo=" + indexNo + ", branch=" + branch + ", greenLeavesReceive=" + greenLeavesReceive + ", normalLeavesQuantity=" + normalLeavesQuantity + ", superLeavesQuantity=" + superLeavesQuantity + ", client=" + client + '}';
    }
}
