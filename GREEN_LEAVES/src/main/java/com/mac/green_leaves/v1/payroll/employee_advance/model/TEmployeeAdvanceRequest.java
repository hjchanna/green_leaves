package com.mac.green_leaves.v1.payroll.employee_advance.model;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author L T430
 */
@Entity
@Table(name = "t_employee_advance_request")
public class TEmployeeAdvanceRequest implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @Column(name = "branch")
    private int branch;

    @Basic(optional = false)
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Basic(optional = false)
    @Column(name = "number")
    private int number;

    @Basic(optional = false)
    @Column(name = "transaction")
    private int transaction;

    @Basic(optional = false)
    @Column(name = "status")
    private String status;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "advanceRequest", fetch = FetchType.LAZY)
    private List<TEmployeeAdvanceRequestDetails> tEmployeeAdvanceRequestDetailsList;

    public TEmployeeAdvanceRequest() {
    }

    public TEmployeeAdvanceRequest(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TEmployeeAdvanceRequest(Integer indexNo, int branch, Date date, int number, int transaction, String status) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.date = date;
        this.number = number;
        this.transaction = transaction;
        this.status = status;
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

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getTransaction() {
        return transaction;
    }

    public void setTransaction(int transaction) {
        this.transaction = transaction;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<TEmployeeAdvanceRequestDetails> getTEmployeeAdvanceRequestDetailsList() {
        return tEmployeeAdvanceRequestDetailsList;
    }

    public void setTEmployeeAdvanceRequestDetailsList(List<TEmployeeAdvanceRequestDetails> tEmployeeAdvanceRequestDetailsList) {
        this.tEmployeeAdvanceRequestDetailsList = tEmployeeAdvanceRequestDetailsList;
    }
}
