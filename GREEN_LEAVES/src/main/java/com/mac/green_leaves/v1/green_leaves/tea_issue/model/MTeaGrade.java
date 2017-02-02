/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.tea_issue.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Don
 */
@Entity
@Table(name = "m_tea_grade")
public class MTeaGrade implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "name")
    private String name;

    @Basic(optional = false)
    @NotNull
    @Column(name = "price")
    private BigDecimal price;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "teaGrade", fetch = FetchType.EAGER)
    private List<TTeaIssue> tTeaIssueList;

    public MTeaGrade() {
    }

    public MTeaGrade(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MTeaGrade(Integer indexNo, String name, BigDecimal price) {
        this.indexNo = indexNo;
        this.name = name;
        this.price = price;
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public List<TTeaIssue> gettTeaIssueList() {
        return tTeaIssueList;
    }

    public void settTeaIssueList(List<TTeaIssue> tTeaIssueList) {
        this.tTeaIssueList = tTeaIssueList;
    }

}
