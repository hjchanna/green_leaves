/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.client.model;

import com.mac.green_leaves.v1.master.route.model.MRoute;
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

/**
 *
 * @author Don
 */
@Entity(name = "com.mac.green_leaves.v1.master.model.client.MClient")
@Table(name = "m_client")
public class MClient implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @Column(name = "branch")
    private int branch;

    @Basic(optional = false)
    @Column(name = "client_number")
    private int clientNumber;
    
    @Basic(optional = false)
    @Column(name = "payment_mode")
    private String paymentMode;

    @Basic(optional = false)
    @Column(name = "name")
    private String name;

    @Column(name = "nic_number")
    private String nicNumber;

    @Column(name = "date_of_birth")
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    @Column(name = "address_line1")
    private String addressLine1;

    @Column(name = "address_line2")
    private String addressLine2;

    @Column(name = "address_line3")
    private String addressLine3;

    @Basic(optional = false)
    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "telephone_number")
    private String telephoneNumber;

    @Column(name = "religion")
    private String religion;

    @Column(name = "nationality")
    private String nationality;

    @Column(name = "register_date")
    @Temporal(TemporalType.DATE)
    private Date registerDate;

    @Basic(optional = false)
    @Column(name = "holder")
    private boolean holder;

    @Column(name = "holder_number")
    private String holderNumber;

    @Basic(optional = false)
    @Column(name = "married")
    private boolean married;

    @Basic(optional = false)
    @Column(name = "black_listed")
    private boolean blackListed;

    @Basic(optional = false)
    @Column(name = "type")
    private String type;

    @Basic(optional = false)
    @Column(name = "active")
    private boolean active;

    @JoinColumn(name = "route", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MRoute route;

    public MClient() {
    }

    public MClient(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MClient(Integer indexNo, int branch, int clientNumber, String paymentMode, String name, String nicNumber, Date dateOfBirth, String addressLine1, String addressLine2, String addressLine3, String mobileNumber, String telephoneNumber, String religion, String nationality, Date registerDate, boolean holder, String holderNumber, boolean married, boolean blackListed, String type, boolean active, MRoute route) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.clientNumber = clientNumber;
        this.paymentMode = paymentMode;
        this.name = name;
        this.nicNumber = nicNumber;
        this.dateOfBirth = dateOfBirth;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.mobileNumber = mobileNumber;
        this.telephoneNumber = telephoneNumber;
        this.religion = religion;
        this.nationality = nationality;
        this.registerDate = registerDate;
        this.holder = holder;
        this.holderNumber = holderNumber;
        this.married = married;
        this.blackListed = blackListed;
        this.type = type;
        this.active = active;
        this.route = route;
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

    public int getClientNumber() {
        return clientNumber;
    }

    public void setClientNumber(int clientNumber) {
        this.clientNumber = clientNumber;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNicNumber() {
        return nicNumber;
    }

    public void setNicNumber(String nicNumber) {
        this.nicNumber = nicNumber;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
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

    public Date getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(Date registerDate) {
        this.registerDate = registerDate;
    }

    public boolean isHolder() {
        return holder;
    }

    public void setHolder(boolean holder) {
        this.holder = holder;
    }

    public String getHolderNumber() {
        return holderNumber;
    }

    public void setHolderNumber(String holderNumber) {
        this.holderNumber = holderNumber;
    }

    public boolean isMarried() {
        return married;
    }

    public void setMarried(boolean married) {
        this.married = married;
    }

    public boolean isBlackListed() {
        return blackListed;
    }

    public void setBlackListed(boolean blackListed) {
        this.blackListed = blackListed;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public MRoute getRoute() {
        return route;
    }

    public void setRoute(MRoute route) {
        this.route = route;
    }

    @Override
    public String toString() {
        return "MClient{" + "indexNo=" + indexNo + ", branch=" + branch + ", clientNumber=" + clientNumber + ", paymentMode=" + paymentMode + ", name=" + name + ", nicNumber=" + nicNumber + ", dateOfBirth=" + dateOfBirth + ", addressLine1=" + addressLine1 + ", addressLine2=" + addressLine2 + ", addressLine3=" + addressLine3 + ", mobileNumber=" + mobileNumber + ", telephoneNumber=" + telephoneNumber + ", religion=" + religion + ", nationality=" + nationality + ", registerDate=" + registerDate + ", holder=" + holder + ", holderNumber=" + holderNumber + ", married=" + married + ", blackListed=" + blackListed + ", type=" + type + ", active=" + active + ", route=" + route + '}';
    }
    
    
}
