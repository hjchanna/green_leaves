/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.dashboard.model;

import java.util.Date;

/**
 *
 * @author Don
 */
public class greenLeavesSummry {

    private Date toDate;
    private Date fromDate;
    private Integer route;
    private Integer routeOfficer;
    private Integer routeHelper;
    private Integer vehicle;
    private Integer client;
    private String type;

    public greenLeavesSummry() {
    }

    public greenLeavesSummry(Date toDate, Date fromDate, Integer route, Integer routeOfficer, Integer routeHelper, Integer vehicle, Integer client, String type) {
        this.toDate = toDate;
        this.fromDate = fromDate;
        this.route = route;
        this.routeOfficer = routeOfficer;
        this.routeHelper = routeHelper;
        this.vehicle = vehicle;
        this.client = client;
        this.type = type;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Integer getRoute() {
        return route;
    }

    public void setRoute(Integer route) {
        this.route = route;
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

    public Integer getVehicle() {
        return vehicle;
    }

    public void setVehicle(Integer vehicle) {
        this.vehicle = vehicle;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getClient() {
        return client;
    }

    public void setClient(Integer client) {
        this.client = client;
    }

}
