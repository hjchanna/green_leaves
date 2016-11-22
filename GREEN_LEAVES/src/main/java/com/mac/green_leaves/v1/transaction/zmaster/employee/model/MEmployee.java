/*
 *  MEmployee.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 25, 2016, 1:10:21 PM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.green_leaves.v1.transaction.zmaster.employee.model;

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

/**
 *
 * @author Mohan
 */
@Entity
@Table(name = "m_employee")
public class MEmployee implements Serializable {

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
    @Column(name = "name")
    private String name;

    @Basic(optional = false)
    @Column(name = "type")
    private String type;

    @Basic(optional = false)
    @NotNull
    @Column(name = "date_of_birth")
    private Date birthday;
   
    @Basic(optional = false)
    @NotNull
    @Column(name = "nic_number")
    private String nic;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "mobile_number")
    private String mobileNo;
    
    @Basic(optional = false)
    @Column(name = "telephone_number")
    private String telephoneNo;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "address_line1")
    private String address1;
    
    @Basic(optional = false)
    @Column(name = "address_line2")
    private String address2;
    
    @Basic(optional = false)
    @Column(name = "address_line3")
    private String address3;

    public MEmployee() {
    }

    public MEmployee(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MEmployee(Integer indexNo, int branch, String name, String type, Date birthday, String nic, String mobileNo, String telephoneNo, String address1, String address2, String address3) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.name = name;
        this.type = type;
        this.birthday = birthday;
        this.nic = nic;
        this.mobileNo = mobileNo;
        this.telephoneNo = telephoneNo;
        this.address1 = address1;
        this.address2 = address2;
        this.address3 = address3;
    }

    public String getAddress3() {
        return address3;
    }

    public void setAddress3(String address3) {
        this.address3 = address3;
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

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getTelephoneNo() {
        return telephoneNo;
    }

    public void setTelephoneNo(String telephoneNo) {
        this.telephoneNo = telephoneNo;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

}
