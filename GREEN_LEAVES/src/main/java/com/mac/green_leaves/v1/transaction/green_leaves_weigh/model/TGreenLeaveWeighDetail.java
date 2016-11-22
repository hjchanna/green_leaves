/*
 *  TGreenLeaveWeighDetail.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 20, 2016, 6:35:44 PM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.green_leaves.v1.transaction.green_leaves_weigh.model;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Mohan
 */
@Entity
@Table(name = "t_green_leave_weigh_detail")
public class TGreenLeaveWeighDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "green_leaves_weigh")
    private Integer greenLeavesWeigh;

    @Basic(optional = false)
    @NotNull
    @Column(name = "quantity")
    private BigDecimal quantity;

    @Basic(optional = false)
    @NotNull
    @Column(name = "crates")
    private int crates;

    @Basic(optional = false)
    @NotNull
    @Column(name = "bags")
    private int bags;

    @Basic(optional = false)
    @NotNull
    @Column(name = "poly_bags")
    private int polyBags;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "type")
    private String type;

    public TGreenLeaveWeighDetail() {
    }

    public TGreenLeaveWeighDetail(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TGreenLeaveWeighDetail(Integer indexNo, BigDecimal quantity, int crates, int bags, int polyBags, String type) {
        this.indexNo = indexNo;
        this.quantity = quantity;
        this.crates = crates;
        this.bags = bags;
        this.polyBags = polyBags;
        this.type = type;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getGreenLeavesWeigh() {
        return greenLeavesWeigh;
    }

    public void setGreenLeavesWeigh(Integer greenLeavesWeigh) {
        this.greenLeavesWeigh = greenLeavesWeigh;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public int getCrates() {
        return crates;
    }

    public void setCrates(int crates) {
        this.crates = crates;
    }

    public int getBags() {
        return bags;
    }

    public void setBags(int bags) {
        this.bags = bags;
    }

    public int getPolyBags() {
        return polyBags;
    }

    public void setPolyBags(int polyBags) {
        this.polyBags = polyBags;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (indexNo != null ? indexNo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof TGreenLeaveWeighDetail)) {
            return false;
        }
        TGreenLeaveWeighDetail other = (TGreenLeaveWeighDetail) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mac.gl.transaction.green_leaves.model.TGreenLeaveWeighDetail[ indexNo=" + indexNo + " ]";
    }

}
