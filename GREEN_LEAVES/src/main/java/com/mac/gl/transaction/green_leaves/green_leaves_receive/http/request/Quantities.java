/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.green_leaves_receive.http.request;

/**
 *
 * @author Don
 */
public class Quantities {

    private Integer client;
    private Double normalLeavesQuantity;
    private Double superLeavesQuantity;

    public Quantities() {
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
