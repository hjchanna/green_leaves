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
package com.mac.gl.transaction.green_leaves.model.green_leaves_receive;

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

    @Basic(optional = false)
    @NotNull
    @Column(name = "green_leaves_receive")
    private int greenLeavesReceive;

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

    public int getGreenLeavesReceive() {
        return greenLeavesReceive;
    }

    public void setGreenLeavesReceive(int greenLeavesReceive) {
        this.greenLeavesReceive = greenLeavesReceive;
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (indexNo != null ? indexNo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof TGreenLeavesReceiveDetail)) {
            return false;
        }
        TGreenLeavesReceiveDetail other = (TGreenLeavesReceiveDetail) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mac.gl.transaction.green_leaves.model.green_leaves_receive.TGreenLeavesReceiveDetails[ indexNo=" + indexNo + " ]";
    }

}
