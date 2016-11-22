/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.model.client_advance;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.math.BigDecimal;
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
@Table(name = "t_client_advance_request_detail")
public class TClientAdvanceRequestDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "client")
    private int client;

    @Basic(optional = false)
    @NotNull
    @Column(name = "as_at_date")
    @Temporal(TemporalType.DATE)
    private Date asAtDate;

    @Basic(optional = false)
    @NotNull
    @Column(name = "amount")
    private BigDecimal amount;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "status")
    private String status;

    @JsonIgnore
    @JoinColumn(name = "client_advance_request", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private TClientAdvanceRequest clientAdvanceRequest;

    public TClientAdvanceRequestDetail() {
    }

    public TClientAdvanceRequestDetail(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TClientAdvanceRequestDetail(Integer indexNo, int client, Date asAtDate, BigDecimal amount, String status) {
        this.indexNo = indexNo;
        this.client = client;
        this.asAtDate = asAtDate;
        this.amount = amount;
        this.status = status;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public int getClient() {
        return client;
    }

    public void setClient(int client) {
        this.client = client;
    }

    public Date getAsAtDate() {
        return asAtDate;
    }

    public void setAsAtDate(Date asAtDate) {
        this.asAtDate = asAtDate;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public TClientAdvanceRequest getClientAdvanceRequest() {
        return clientAdvanceRequest;
    }

    public void setClientAdvanceRequest(TClientAdvanceRequest clientAdvanceRequest) {
        this.clientAdvanceRequest = clientAdvanceRequest;
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
        if (!(object instanceof TClientAdvanceRequestDetail)) {
            return false;
        }
        TClientAdvanceRequestDetail other = (TClientAdvanceRequestDetail) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mac.gl.transaction.green_leaves.model.client_advance.TClientAdvanceRequestDetail[ indexNo=" + indexNo + " ]";
    }

}
