/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.model.product;

import com.mac.green_leaves.v1.master.model.category.MCategory;
import com.mac.green_leaves.v1.master.model.subCategory.MSubCategory;
import com.mac.green_leaves.v1.master.model.supplier.MSupplier;
import com.mac.green_leaves.v1.master.model.item_department.MItemDepartment;
import java.io.Serializable;
import java.math.BigDecimal;
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

/**
 *
 * @author Don
 */
@Entity
@Table(name = "m_product")
public class MProduct implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @Column(name = "product_no")
    private String productNo;

    @Basic(optional = false)
    @Column(name = "name")
    private String name;

    @Basic(optional = false)
    @Column(name = "print_description")
    private String printDescription;

    @Basic(optional = false)
    @Column(name = "brand")
    private String brand;

    @Basic(optional = false)
    @Column(name = "unit")
    private String unit;

    @Basic(optional = false)
    @Column(name = "sale_price")
    private BigDecimal salePrice;

    @Basic(optional = false)
    @Column(name = "cost_price")
    private BigDecimal costPrice;

    @Basic(optional = false)
    @Column(name = "branch")
    private int branch;

    @JoinColumn(name = "sub_category", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MSubCategory subCategory;

    @JoinColumn(name = "category", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MCategory category;

    @JoinColumn(name = "item_department", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MItemDepartment itemDepartment;

    @JoinColumn(name = "supplier", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MSupplier supplier;

    public MProduct() {
    }

    public MProduct(Integer indexNo, String productNo, String name, String printDescription, String brand, String unit, BigDecimal salePrice, BigDecimal costPrice, int branch, MSubCategory subCategory, MCategory category, MItemDepartment itemDepartment, MSupplier supplier) {
        this.indexNo = indexNo;
        this.productNo = productNo;
        this.name = name;
        this.printDescription = printDescription;
        this.brand = brand;
        this.unit = unit;
        this.salePrice = salePrice;
        this.costPrice = costPrice;
        this.branch = branch;
        this.subCategory = subCategory;
        this.category = category;
        this.itemDepartment = itemDepartment;
        this.supplier = supplier;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrintDescription() {
        return printDescription;
    }

    public void setPrintDescription(String printDescription) {
        this.printDescription = printDescription;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(BigDecimal salePrice) {
        this.salePrice = salePrice;
    }

    public BigDecimal getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(BigDecimal costPrice) {
        this.costPrice = costPrice;
    }

    public int getBranch() {
        return branch;
    }

    public void setBranch(int branch) {
        this.branch = branch;
    }

    public MSubCategory getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(MSubCategory subCategory) {
        this.subCategory = subCategory;
    }

    public MCategory getCategory() {
        return category;
    }

    public void setCategory(MCategory category) {
        this.category = category;
    }

    public MItemDepartment getItemDepartment() {
        return itemDepartment;
    }

    public void setItemDepartment(MItemDepartment itemDepartment) {
        this.itemDepartment = itemDepartment;
    }

    public MSupplier getSupplier() {
        return supplier;
    }

    public void setSupplier(MSupplier supplier) {
        this.supplier = supplier;
    }

    public String getProductNo() {
        return productNo;
    }

    public void setProductNo(String productNo) {
        this.productNo = productNo;
    }

    @Override
    public String toString() {
        return "MProduct{" + "indexNo=" + indexNo + ", productNo=" + productNo + ", name=" + name + ", printDescription=" + printDescription + ", brand=" + brand + ", unit=" + unit + ", salePrice=" + salePrice + ", costPrice=" + costPrice + ", branch=" + branch + ", subCategory=" + subCategory + ", category=" + category + ", itemDepartment=" + itemDepartment + ", supplier=" + supplier + '}';
    }

}
