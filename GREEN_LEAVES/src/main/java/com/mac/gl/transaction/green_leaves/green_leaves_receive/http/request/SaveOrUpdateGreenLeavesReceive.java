/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.green_leaves_receive.http.request;

import java.sql.Date;

/**
 *
 * @author Don
 */
public class SaveOrUpdateGreenLeavesReceive {

    private Integer indexNo;
    private Date data;
    private Integer route;
    private Quantities quantities;
    

    public SaveOrUpdateGreenLeavesReceive() {
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public Integer getRoute() {
        return route;
    }

    public void setRoute(Integer route) {
        this.route = route;
    }

}
