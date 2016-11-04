/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.vehicle;

import java.io.Serializable;
import java.util.Date;
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
 * @author Nidura Prageeth
 */
@Entity
@Table(name = "m_vehicle")
public class MVehicle implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "vehicle_no")
    private String vehicleNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "make")
    private String make;

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
    @Column(name = "model")
    private String model;

    @Basic(optional = false)
    @NotNull
    @Column(name = "reg_date")
    private Date regDate;

    @Basic(optional = false)
    @NotNull
    @Column(name = "owner_name")
    private String ownerName;

    @Basic(optional = false)
    @NotNull
    @Column(name = "type")
    private String type;

    public MVehicle() {
    }

    public MVehicle(Integer IndexNo) {
        this.indexNo = indexNo;
    }

    public MVehicle(Integer indexNo, String vehicleNo, String make, String engineNo, String chassisNo, String model, Date regDate, String ownerName, String type) {
        this.indexNo = indexNo;
        this.vehicleNo = vehicleNo;
        this.make = make;
        this.engineNo = engineNo;
        this.chassisNo = chassisNo;
        this.model = model;
        this.regDate = regDate;
        this.ownerName = ownerName;
        this.type = type;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
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

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Date getRegDate() {
        return regDate;
    }

    public void setRegDate(Date regDate) {
        this.regDate = regDate;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "MVehicle{" + "indexNo=" + indexNo + ", vehicleNo=" + vehicleNo + ", make=" + make + ", engineNo=" + engineNo + ", chassisNo=" + chassisNo + ", model=" + model + ", regDate=" + regDate + ", ownerName=" + ownerName + ", type=" + type + '}';
    }

    
}
