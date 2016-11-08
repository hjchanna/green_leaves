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
    @Column(name = "type")
    private String type;

    //TODO

    public MVehicle() {
    }

    public MVehicle(Integer IndexNo) {
        this.indexNo = indexNo;
    }

}
