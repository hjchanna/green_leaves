/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.vehicle.model;

import java.io.Serializable;
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
 * @author hjcha
 */
@Entity(name = "com.mac.green_leaves.v1.master.vehicle.model.MVehicle")
@Table(name = "m_vehicle")
public class MVehicle implements Serializable{
    
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
    @Column(name = "vehicle_no")
    private String vehicleNo;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "engine_no")
    private String engineNo;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "chassis_no")
    private String chassisNo;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "make")
    private String make;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "model")
    private String model;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "vehicle_owner")
    private int vehicleOwner;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "driver")
    private int driver;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "type")
    private String type;

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

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public String getEngineNo() {
        return engineNo;
    }

    public void setEngineNo(String engineNo) {
        this.engineNo = engineNo;
    }

    public String getChassisNo() {
        return chassisNo;
    }

    public void setChassisNo(String chassisNo) {
        this.chassisNo = chassisNo;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getVehicleOwner() {
        return vehicleOwner;
    }

    public void setVehicleOwner(int vehicleOwner) {
        this.vehicleOwner = vehicleOwner;
    }

    public int getDriver() {
        return driver;
    }

    public void setDriver(int driver) {
        this.driver = driver;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    
}
