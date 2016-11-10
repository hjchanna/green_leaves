/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.vehicle;

import com.mac.gl.master.model.vehicle_owner.MVehicleOwner;
import com.mac.gl.transaction.green_leaves.model.zmaster.MEmployee;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

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
    @Column(name = "engine_no")
    private String engineNo;

    @Basic(optional = false)
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
    @Column(name = "type")
    private String type;

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "vehicle_owner")
    private MVehicleOwner vehicleOwner;

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "driver")
    private MEmployee driver;

    public MVehicle() {
    }

    public MVehicle(Integer indexNo, String vehicleNo, String engineNo, String chassisNo, String make, String model, String type, MVehicleOwner vehicleOwner, MEmployee driver) {
        this.indexNo = indexNo;
        this.vehicleNo = vehicleNo;
        this.engineNo = engineNo;
        this.chassisNo = chassisNo;
        this.make = make;
        this.model = model;
        this.type = type;
        this.vehicleOwner = vehicleOwner;
        this.driver = driver;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public MVehicleOwner getVehicleOwner() {
        return vehicleOwner;
    }

    public void setVehicleOwner(MVehicleOwner vehicleOwner) {
        this.vehicleOwner = vehicleOwner;
    }

    public MEmployee getDriver() {
        return driver;
    }

    public void setDriver(MEmployee driver) {
        this.driver = driver;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (indexNo != null ? indexNo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof MVehicle)) {
            return false;
        }
        MVehicle other = (MVehicle) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mac.gl.master.model.vehicle.MVehicle[ indexNo=" + indexNo + " ]";
    }


}
