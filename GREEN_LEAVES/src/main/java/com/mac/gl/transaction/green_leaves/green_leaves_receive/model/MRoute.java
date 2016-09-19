package com.mac.gl.transaction.green_leaves.green_leaves_receive.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Don
 */
@Entity(name = "com.mac.gl.transaction.green_leaves.green_leaves_receive.model.MRoute")
@Table(name = "m_route")
public class MRoute {

    @Id
    private Integer indexNo;
    private Integer branch;
    private String name;
    @JoinColumn(name = "route_officer")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MEmployee routeOfficer;
    @JoinColumn(name = "route_helper")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MEmployee routeHelper;

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

    public MEmployee getRouteOfficer() {
        return routeOfficer;
    }

    public void setRouteOfficer(MEmployee routeOfficer) {
        this.routeOfficer = routeOfficer;
    }

    public MEmployee getRouteHelper() {
        return routeHelper;
    }

    public void setRouteHelper(MEmployee routeHelper) {
        this.routeHelper = routeHelper;
    }
}
