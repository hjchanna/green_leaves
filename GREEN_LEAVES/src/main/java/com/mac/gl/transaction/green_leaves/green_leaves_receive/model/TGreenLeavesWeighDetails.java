/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.green_leaves_receive.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author Don
 */
@Entity
@Table(name = "t_green_leave_weigh_detail")
public class TGreenLeavesWeighDetails {

    @Id
    private Integer indexNo;
    private Integer branch;
    private Integer greenLeavesWeigh;
    private Double normalLeavesQuantity;
    private Double superLeavesQuantity;

    public TGreenLeavesWeighDetails(Double normalLeavesQuantity, Double superLeavesQuantity) {
        this.normalLeavesQuantity = normalLeavesQuantity;
        this.superLeavesQuantity = superLeavesQuantity;
    }

    public TGreenLeavesWeighDetails() {
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

    public Integer getGreenLeavesWeigh() {
        return greenLeavesWeigh;
    }

    public void setGreenLeavesWeigh(Integer greenLeavesWeigh) {
        this.greenLeavesWeigh = greenLeavesWeigh;
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
