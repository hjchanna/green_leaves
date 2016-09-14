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
@Table(name = "m_route")
public class MRoute {
    @Id
    private Integer indexNo;
    private Integer branch;
    private String name;
    private Integer routeOfficer;
    private Integer routeHelper;

    public MRoute() {
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getRouteOfficer() {
        return routeOfficer;
    }

    public void setRouteOfficer(Integer routeOfficer) {
        this.routeOfficer = routeOfficer;
    }

    public Integer getRouteHelper() {
        return routeHelper;
    }

    public void setRouteHelper(Integer routeHelper) {
        this.routeHelper = routeHelper;
    }

}
