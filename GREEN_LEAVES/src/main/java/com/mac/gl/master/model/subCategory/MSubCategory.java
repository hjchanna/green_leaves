/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.subCategory;

import com.mac.gl.master.model.category.MCategory;
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
 * @author kalum
 */
@Entity
@Table(name = "m_sub_category")
public class MSubCategory implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @NotNull
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "category")
    private MCategory category;

    @Basic(optional = false)
    @NotNull
    @Column(name = "sub_category")
    private String subCategory;

    public MSubCategory() {
    }

    public MSubCategory(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MSubCategory(Integer indexNo, MCategory category, String subCategory) {
        this.indexNo = indexNo;
        this.category = category;
        this.subCategory = subCategory;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MCategory getCategory() {
        return category;
    }

    public void setCategory(MCategory category) {
        this.category = category;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
    }

}
