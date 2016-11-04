/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.category;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author Nidura Prageeth
 */
@Entity
@Table(name = "m_category")
public class MCategory implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer indexNo;
    private String name;

    public MCategory() {
    }

    public MCategory(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MCategory(Integer indexNo, String name) {
        this.indexNo = indexNo;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }
}
