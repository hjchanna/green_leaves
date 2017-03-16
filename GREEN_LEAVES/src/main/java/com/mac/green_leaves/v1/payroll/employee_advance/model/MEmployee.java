/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_advance.model;

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
 * @author L T430
 */
@Entity(name = "com.mac.green_leaves.v1.payroll.employee_advance.model.MEmployee")
@Table(name = "m_employee")
public class MEmployee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @NotNull
    @Basic(optional = false)
    @Column(name = "branch")
    private int branch;
    
    @NotNull
    @Basic(optional = false)
    @Column(name = "employee_number")
    private int employeeNumber;

    @NotNull
    @Basic(optional = false)
    @Column(name = "name")
    private String name;

    @NotNull
    @Basic(optional = false)
    @Column(name = "type")
    private String type;

    @Basic(optional = false)
    @Column(name = "nic_number")
    private String nicNumber;

    @Basic(optional = false)
    @Column(name = "mobile_number")
    private String mobileNumber;

    @Basic(optional = false)
    @Column(name = "telephone_number")
    private String telephoneNumber;

    @Basic(optional = false)
    @Column(name = "address_line1")
    private String addressLine1;

    @Basic(optional = false)
    @Column(name = "address_line2")
    private String addressLine2;

    @Basic(optional = false)
    @Column(name = "address_line3")
    private String addressLine3;
    
    @Basic(optional = false)
    @Column(name = "epf_number")
    private String epfNumber;

    public MEmployee() {
    }

    public MEmployee(Integer indexNo, int branch, int employeeNumber, String name, String type, String nicNumber, String mobileNumber, String telephoneNumber, String addressLine1, String addressLine2, String addressLine3, String epfNumber) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.employeeNumber = employeeNumber;
        this.name = name;
        this.type = type;
        this.nicNumber = nicNumber;
        this.mobileNumber = mobileNumber;
        this.telephoneNumber = telephoneNumber;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.epfNumber = epfNumber;
    }

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

    public int getEmployeeNumber() {
        return employeeNumber;
    }

    public void setEmployeeNumber(int employeeNumber) {
        this.employeeNumber = employeeNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNicNumber() {
        return nicNumber;
    }

    public void setNicNumber(String nicNumber) {
        this.nicNumber = nicNumber;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getAddressLine3() {
        return addressLine3;
    }

    public void setAddressLine3(String addressLine3) {
        this.addressLine3 = addressLine3;
    }

    public String getEpfNumber() {
        return epfNumber;
    }

    public void setEpfNumber(String epfNumber) {
        this.epfNumber = epfNumber;
    }
    
    
    
}
