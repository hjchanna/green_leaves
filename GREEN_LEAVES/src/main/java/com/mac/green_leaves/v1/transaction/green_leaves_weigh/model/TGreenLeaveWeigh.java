/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.transaction.green_leaves_weigh.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Mohan
 */
@Entity
@Table(name = "t_green_leave_weigh")
public class TGreenLeaveWeigh implements Serializable {

    private static final long serialVersionUID = 1L;

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
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Basic(optional = false)
    @NotNull
    @Column(name = "transaction")
    private int transaction;

    @Basic(optional = false)
    @NotNull
    @Column(name = "number")
    private int number;

    @Basic(optional = false)
    @NotNull
    @Column(name = "normal_total_weight")
    private BigDecimal normalTotalWeight;

    @Basic(optional = false)
    @NotNull
    @Column(name = "normal_tare_calculated")
    private BigDecimal normalTareCalculated;

    @Basic(optional = false)
    @NotNull
    @Column(name = "normal_tare_deduction")
    private BigDecimal normalTareDeduction;

    @Basic(optional = false)
    @NotNull
    @Column(name = "normal_general_deduction_percent")
    private BigDecimal normalGeneralDeductionPercent;

    @Basic(optional = false)
    @NotNull
    @Column(name = "normal_general_deduction")
    private BigDecimal normalGeneralDeduction;

    @Basic(optional = false)
    @NotNull
    @Column(name = "normal_water_deduction")
    private BigDecimal normalWaterDeduction;

    @Basic(optional = false)
    @NotNull
    @Column(name = "normal_coarse_leaves")
    private BigDecimal normalCoarseLeaves;

    @Basic(optional = false)
    @NotNull
    @Column(name = "normal_boiled_leaves")
    private BigDecimal normalBoiledLeaves;

    @Basic(optional = false)
    @NotNull
    @Column(name = "normal_net_weight")
    private BigDecimal normalNetWeight;

    @Basic(optional = false)
    @NotNull
    @Column(name = "normal_crates")
    private int normalCrates;

    @Basic(optional = false)
    @NotNull
    @Column(name = "normal_bags")
    private int normalBags;

    @Basic(optional = false)
    @NotNull
    @Column(name = "normal_poly_bags")
    private int normalPolyBags;

    @Basic(optional = false)
    @NotNull
    @Column(name = "super_total_weight")
    private BigDecimal superTotalWeight;

    @Basic(optional = false)
    @NotNull
    @Column(name = "super_tare_calculated")
    private BigDecimal superTareCalculated;

    @Basic(optional = false)
    @NotNull
    @Column(name = "super_tare_deduction")
    private BigDecimal superTareDeduction;

    @Basic(optional = false)
    @NotNull
    @Column(name = "super_general_deduction_percent")
    private BigDecimal superGeneralDeductionPercent;

    @Basic(optional = false)
    @NotNull
    @Column(name = "super_general_deduction")
    private BigDecimal superGeneralDeduction;

    @Basic(optional = false)
    @NotNull
    @Column(name = "super_water_deduction")
    private BigDecimal superWaterDeduction;

    @Basic(optional = false)
    @NotNull
    @Column(name = "super_coarse_leaves")
    private BigDecimal superCoarseLeaves;

    @Basic(optional = false)
    @NotNull
    @Column(name = "super_boiled_leaves")
    private BigDecimal superBoiledLeaves;

    @Basic(optional = false)
    @NotNull
    @Column(name = "super_net_weight")
    private BigDecimal superNetWeight;

    @Basic(optional = false)
    @NotNull
    @Column(name = "super_crates")
    private int superCrates;

    @Basic(optional = false)
    @NotNull
    @Column(name = "super_bags")
    private int superBags;

    @Basic(optional = false)
    @NotNull
    @Column(name = "super_poly_bags")
    private int superPolyBags;

    @Basic(optional = false)
    @NotNull
    @Column(name = "route")
    private int route;

    @Basic(optional = false)
    @NotNull
    @Column(name = "route_officer")
    private int routeOfficer;

    @Basic(optional = false)
    @NotNull
    @Column(name = "route_helper")
    private int routeHelper;

    @Basic(optional = false)
    @NotNull
    @Column(name = "vehicle")
    private int vehicle;

    @OneToMany(mappedBy = "greenLeavesWeigh", fetch = FetchType.EAGER)
    private Collection<TGreenLeaveWeighDetail> greenLeaveWeighDetails;

    public TGreenLeaveWeigh() {
    }

    public TGreenLeaveWeigh(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TGreenLeaveWeigh(Integer indexNo, int branch, Date date, int transaction, int number, BigDecimal normalTotalWeight, BigDecimal normalTareCalculated, BigDecimal normalTareDeduction, BigDecimal normalGeneralDeductionPercent, BigDecimal normalGeneralDeduction, BigDecimal normalWaterDeduction, BigDecimal normalCoarseLeaves, BigDecimal normalBoiledLeaves, BigDecimal normalNetWeight, int normalCrates, int normalBags, int normalPolyBags, BigDecimal superTotalWeight, BigDecimal superTareCalculated, BigDecimal superTareDeduction, BigDecimal superGeneralDeductionPercent, BigDecimal superGeneralDeduction, BigDecimal superWaterDeduction, BigDecimal superCoarseLeaves, BigDecimal superBoiledLeaves, BigDecimal superNetWeight, int superCrates, int superBags, int superPolyBags, int route, int routeOfficer, int routeHelper, int vehicle) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.date = date;
        this.transaction = transaction;
        this.number = number;
        this.normalTotalWeight = normalTotalWeight;
        this.normalTareCalculated = normalTareCalculated;
        this.normalTareDeduction = normalTareDeduction;
        this.normalGeneralDeductionPercent = normalGeneralDeductionPercent;
        this.normalGeneralDeduction = normalGeneralDeduction;
        this.normalWaterDeduction = normalWaterDeduction;
        this.normalCoarseLeaves = normalCoarseLeaves;
        this.normalBoiledLeaves = normalBoiledLeaves;
        this.normalNetWeight = normalNetWeight;
        this.normalCrates = normalCrates;
        this.normalBags = normalBags;
        this.normalPolyBags = normalPolyBags;
        this.superTotalWeight = superTotalWeight;
        this.superTareCalculated = superTareCalculated;
        this.superTareDeduction = superTareDeduction;
        this.superGeneralDeductionPercent = superGeneralDeductionPercent;
        this.superGeneralDeduction = superGeneralDeduction;
        this.superWaterDeduction = superWaterDeduction;
        this.superCoarseLeaves = superCoarseLeaves;
        this.superBoiledLeaves = superBoiledLeaves;
        this.superNetWeight = superNetWeight;
        this.superCrates = superCrates;
        this.superBags = superBags;
        this.superPolyBags = superPolyBags;
        this.route = route;
        this.routeOfficer = routeOfficer;
        this.routeHelper = routeHelper;
        this.vehicle = vehicle;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getTransaction() {
        return transaction;
    }

    public void setTransaction(int transaction) {
        this.transaction = transaction;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public BigDecimal getNormalTotalWeight() {
        return normalTotalWeight;
    }

    public void setNormalTotalWeight(BigDecimal normalTotalWeight) {
        this.normalTotalWeight = normalTotalWeight;
    }

    public BigDecimal getNormalTareCalculated() {
        return normalTareCalculated;
    }

    public void setNormalTareCalculated(BigDecimal normalTareCalculated) {
        this.normalTareCalculated = normalTareCalculated;
    }

    public BigDecimal getNormalTareDeduction() {
        return normalTareDeduction;
    }

    public void setNormalTareDeduction(BigDecimal normalTareDeduction) {
        this.normalTareDeduction = normalTareDeduction;
    }

    public BigDecimal getNormalGeneralDeductionPercent() {
        return normalGeneralDeductionPercent;
    }

    public void setNormalGeneralDeductionPercent(BigDecimal normalGeneralDeductionPercent) {
        this.normalGeneralDeductionPercent = normalGeneralDeductionPercent;
    }

    public BigDecimal getNormalGeneralDeduction() {
        return normalGeneralDeduction;
    }

    public void setNormalGeneralDeduction(BigDecimal normalGeneralDeduction) {
        this.normalGeneralDeduction = normalGeneralDeduction;
    }

    public BigDecimal getNormalWaterDeduction() {
        return normalWaterDeduction;
    }

    public void setNormalWaterDeduction(BigDecimal normalWaterDeduction) {
        this.normalWaterDeduction = normalWaterDeduction;
    }

    public BigDecimal getNormalCoarseLeaves() {
        return normalCoarseLeaves;
    }

    public void setNormalCoarseLeaves(BigDecimal normalCoarseLeaves) {
        this.normalCoarseLeaves = normalCoarseLeaves;
    }

    public BigDecimal getNormalBoiledLeaves() {
        return normalBoiledLeaves;
    }

    public void setNormalBoiledLeaves(BigDecimal normalBoiledLeaves) {
        this.normalBoiledLeaves = normalBoiledLeaves;
    }

    public BigDecimal getNormalNetWeight() {
        return normalNetWeight;
    }

    public void setNormalNetWeight(BigDecimal normalNetWeight) {
        this.normalNetWeight = normalNetWeight;
    }

    public int getNormalCrates() {
        return normalCrates;
    }

    public void setNormalCrates(int normalCrates) {
        this.normalCrates = normalCrates;
    }

    public int getNormalBags() {
        return normalBags;
    }

    public void setNormalBags(int normalBags) {
        this.normalBags = normalBags;
    }

    public int getNormalPolyBags() {
        return normalPolyBags;
    }

    public void setNormalPolyBags(int normalPolyBags) {
        this.normalPolyBags = normalPolyBags;
    }

    public BigDecimal getSuperTotalWeight() {
        return superTotalWeight;
    }

    public void setSuperTotalWeight(BigDecimal superTotalWeight) {
        this.superTotalWeight = superTotalWeight;
    }

    public BigDecimal getSuperTareCalculated() {
        return superTareCalculated;
    }

    public void setSuperTareCalculated(BigDecimal superTareCalculated) {
        this.superTareCalculated = superTareCalculated;
    }

    public BigDecimal getSuperTareDeduction() {
        return superTareDeduction;
    }

    public void setSuperTareDeduction(BigDecimal superTareDeduction) {
        this.superTareDeduction = superTareDeduction;
    }

    public BigDecimal getSuperGeneralDeductionPercent() {
        return superGeneralDeductionPercent;
    }

    public void setSuperGeneralDeductionPercent(BigDecimal superGeneralDeductionPercent) {
        this.superGeneralDeductionPercent = superGeneralDeductionPercent;
    }

    public BigDecimal getSuperGeneralDeduction() {
        return superGeneralDeduction;
    }

    public void setSuperGeneralDeduction(BigDecimal superGeneralDeduction) {
        this.superGeneralDeduction = superGeneralDeduction;
    }

    public BigDecimal getSuperWaterDeduction() {
        return superWaterDeduction;
    }

    public void setSuperWaterDeduction(BigDecimal superWaterDeduction) {
        this.superWaterDeduction = superWaterDeduction;
    }

    public BigDecimal getSuperCoarseLeaves() {
        return superCoarseLeaves;
    }

    public void setSuperCoarseLeaves(BigDecimal superCoarseLeaves) {
        this.superCoarseLeaves = superCoarseLeaves;
    }

    public BigDecimal getSuperBoiledLeaves() {
        return superBoiledLeaves;
    }

    public void setSuperBoiledLeaves(BigDecimal superBoiledLeaves) {
        this.superBoiledLeaves = superBoiledLeaves;
    }

    public BigDecimal getSuperNetWeight() {
        return superNetWeight;
    }

    public void setSuperNetWeight(BigDecimal superNetWeight) {
        this.superNetWeight = superNetWeight;
    }

    public int getSuperCrates() {
        return superCrates;
    }

    public void setSuperCrates(int superCrates) {
        this.superCrates = superCrates;
    }

    public int getSuperBags() {
        return superBags;
    }

    public void setSuperBags(int superBags) {
        this.superBags = superBags;
    }

    public int getSuperPolyBags() {
        return superPolyBags;
    }

    public void setSuperPolyBags(int superPolyBags) {
        this.superPolyBags = superPolyBags;
    }

    public int getRoute() {
        return route;
    }

    public void setRoute(int route) {
        this.route = route;
    }

    public int getRouteOfficer() {
        return routeOfficer;
    }

    public void setRouteOfficer(int routeOfficer) {
        this.routeOfficer = routeOfficer;
    }

    public int getRouteHelper() {
        return routeHelper;
    }

    public void setRouteHelper(int routeHelper) {
        this.routeHelper = routeHelper;
    }

    public int getVehicle() {
        return vehicle;
    }

    public void setVehicle(int vehicle) {
        this.vehicle = vehicle;
    }

    public Collection<TGreenLeaveWeighDetail> getGreenLeaveWeighDetails() {
        return greenLeaveWeighDetails;
    }

    public void setGreenLeaveWeighDetails(Collection<TGreenLeaveWeighDetail> greenLeaveWeighDetails) {
        this.greenLeaveWeighDetails = greenLeaveWeighDetails;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (indexNo != null ? indexNo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof TGreenLeaveWeigh)) {
            return false;
        }
        TGreenLeaveWeigh other = (TGreenLeaveWeigh) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mac.green_leaves.v1.transaction.green_leaves_weigh.model.TGreenLeaveWeigh[ indexNo=" + indexNo + " ]";
    }

}
