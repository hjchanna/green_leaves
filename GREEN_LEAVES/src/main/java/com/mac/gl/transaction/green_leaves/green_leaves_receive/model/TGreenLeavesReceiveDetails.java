/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.green_leaves_receive.model;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 *
 * @author Don
 */
@Entity
public class TGreenLeavesReceiveDetails {

    @Id
    private Integer indexNo;
    private Integer branch;
    private Integer greenLeavesReceive;
    private Integer client;
    private Double normalLeavesQuantity;
    private Double superLeavesQuantity;

    public TGreenLeavesReceiveDetails() {
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public Integer getGreenLeavesReceive() {
        return greenLeavesReceive;
    }

    public void setGreenLeavesReceive(Integer greenLeavesReceive) {
        this.greenLeavesReceive = greenLeavesReceive;
    }

    public Integer getClient() {
        return client;
    }

    public void setClient(Integer client) {
        this.client = client;
    }

    public Double getNormalLeavesQuantity() {
        return normalLeavesQuantity;
    }

    public void setNormalLeavesQuantity(Double normalLeavesQuantity) {
        this.normalLeavesQuantity = normalLeavesQuantity;
    }

    public Double getSuperLeavesQuantity() {
        return superLeavesQuantity;
    }

    public void setSuperLeavesQuantity(Double superLeavesQuantity) {
        this.superLeavesQuantity = superLeavesQuantity;
    }

}
