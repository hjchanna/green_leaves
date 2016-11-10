/*
 *  MClient.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 25, 2016, 1:09:40 PM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.gl.transaction.green_leaves.model.zmaster;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Mohan
 */
@Entity
@Table(name = "m_client")
public class MClient implements Serializable {

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
    @Size(min = 1, max = 50)
    @Column(name = "name")
    private String name;

    @NotNull
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "route")
    private MRoute route;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "suppplier_no")
    private String suppplierNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "date_of_birth")
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "nic_number")
    private String nicNumber;

    @Basic(optional = false)
    @NotNull
    @Column(name = "register_date")
    @Temporal(TemporalType.DATE)
    private Date registerDate;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "mobile_number")
    private String mobileNumber;

    @Size(max = 25)
    @Column(name = "telephone_number")
    private String telephoneNumber;

    @Basic(optional = false)
    @NotNull
    @Column(name = "dy_supplier")
    private boolean dySupplier;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "dy_number")
    private String dyNumber;

    @Basic(optional = false)
    @NotNull
    @Column(name = "supplier_black_listed")
    private boolean supplierBlackListed;

    @Basic(optional = false)
    @NotNull
    @Column(name = "pass_book_issued_date")
    @Temporal(TemporalType.DATE)
    private Date passBookIssuedDate;

    @Size(max = 25)
    @Column(name = "address_line1")
    private String addressLine1;
    @Size(max = 50)
    @Column(name = "address_line2")
    private String addressLine2;
    @Size(max = 50)
    @Column(name = "address_line3")
    private String addressLine3;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "religion")
    private String religion;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "nationality")
    private String nationality;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "marital_status")
    private String maritalStatus;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "client_type")
    private String clientType;

    public MClient() {
    }

    public MClient(Integer indexNo, int branch, String name, MRoute route, String suppplierNo, Date dateOfBirth, String nicNumber, Date registerDate, String mobileNumber, String telephoneNumber, boolean dySupplier, String dyNumber, boolean supplierBlackListed, Date passBookIssuedDate, String addressLine1, String addressLine2, String addressLine3, String religion, String nationality, String maritalStatus, String clientType) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.name = name;
        this.route = route;
        this.suppplierNo = suppplierNo;
        this.dateOfBirth = dateOfBirth;
        this.nicNumber = nicNumber;
        this.registerDate = registerDate;
        this.mobileNumber = mobileNumber;
        this.telephoneNumber = telephoneNumber;
        this.dySupplier = dySupplier;
        this.dyNumber = dyNumber;
        this.supplierBlackListed = supplierBlackListed;
        this.passBookIssuedDate = passBookIssuedDate;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.religion = religion;
        this.nationality = nationality;
        this.maritalStatus = maritalStatus;
        this.clientType = clientType;
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



    public String getSuppplierNo() {
        return suppplierNo;
    }

    public void setSuppplierNo(String suppplierNo) {
        this.suppplierNo = suppplierNo;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getNicNumber() {
        return nicNumber;
    }

    public void setNicNumber(String nicNumber) {
        this.nicNumber = nicNumber;
    }

    public Date getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(Date registerDate) {
        this.registerDate = registerDate;
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

    public boolean isDySupplier() {
        return dySupplier;
    }

    public void setDySupplier(boolean dySupplier) {
        this.dySupplier = dySupplier;
    }

    public String getDyNumber() {
        return dyNumber;
    }

    public void setDyNumber(String dyNumber) {
        this.dyNumber = dyNumber;
    }

    public boolean isSupplierBlackListed() {
        return supplierBlackListed;
    }

    public void setSupplierBlackListed(boolean supplierBlackListed) {
        this.supplierBlackListed = supplierBlackListed;
    }

    public Date getPassBookIssuedDate() {
        return passBookIssuedDate;
    }

    public void setPassBookIssuedDate(Date passBookIssuedDate) {
        this.passBookIssuedDate = passBookIssuedDate;
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

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getClientType() {
        return clientType;
    }

    public void setClientType(String clientType) {
        this.clientType = clientType;
    }

    public MRoute getRoute() {
        return route;
    }

    public void setRoute(MRoute route) {
        this.route = route;
    }
}
