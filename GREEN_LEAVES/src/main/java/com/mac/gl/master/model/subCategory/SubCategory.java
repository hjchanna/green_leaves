///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package com.mac.gl.master.model.subCategory;
//
//import java.io.Serializable;
//import javax.persistence.Basic;
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;
//import javax.validation.constraints.Size;
//
///**
// *
// * @author kalum
// */
//@Entity
//@Table(name="")
//public class SubCategory implements Serializable {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Basic(optional = false)
//    @Column(name = "index_no")        
//    private Integer indexNo;
//    
//    @Size(max = 50)
//    @Column(name = "name")
//    private String name;
//    
//    @Size(max = 50)
//    @Column(name = "category")
//    private String category;
//
//    public SubCategory() {
//        
//    }
//
//    public Integer getIndexNo() {
//        return indexNo;
//    }
//
//    public void setIndexNo(Integer indexNo) {
//        this.indexNo = indexNo;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getCategory() {
//        return category;
//    }
//
//    public void setCategory(String categoryId) {
//        this.category = categoryId;
//    }
//    
//    
//}
