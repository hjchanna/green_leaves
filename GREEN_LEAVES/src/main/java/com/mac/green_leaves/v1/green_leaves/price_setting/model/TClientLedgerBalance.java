/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.price_setting.model;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedNativeQuery;

/**
 *
 * @author hjcha
 */
@Entity
@NamedNativeQuery(
        name = "TClientLedgerBalance.findClientLedgerBalance",
        //        query = "SELECT * FROM TClientLedgerBalance"
        query
        = "select\n"
        + "	concat(t_client_ledger.`client`,'-',t_client_ledger.settlement_type) as id,\n"
        + "	t_client_ledger.`client`,\n"
        + "	t_client_ledger.settlement_type,\n"
        + "	t_client_ledger.settlement_order,\n"
        + "	sum(t_client_ledger.debit_amount - t_client_ledger.credit_amount) as balance\n"
        + "from\n"
        + "	t_client_ledger\n"
        + "where\n"
        + "	t_client_ledger.branch = :branch\n"
        + "	and t_client_ledger.`status` = 'ACTIVE'\n"
        + "group by\n"
        + "	t_client_ledger.`client`, t_client_ledger.settlement_type\n"
        + "order by\n"
        + "	t_client_ledger.`client`, balance, t_client_ledger.settlement_order",
        resultClass = TClientLedgerBalance.class
)
public class TClientLedgerBalance implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private String id;

    @Column(name = "client")
    private Integer client;

    @Column(name = "settlement_type")
    private String settlementType;

    @Column(name = "settlement_order")
    private Integer settlementOrder;

    @Column(name = "balance")
    private BigDecimal balance;

    public TClientLedgerBalance() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getClient() {
        return client;
    }

    public void setClient(Integer client) {
        this.client = client;
    }

    public String getSettlementType() {
        return settlementType;
    }

    public void setSettlementType(String settlementType) {
        this.settlementType = settlementType;
    }

    public Integer getSettlementOrder() {
        return settlementOrder;
    }

    public void setSettlementOrder(Integer settlementOrder) {
        this.settlementOrder = settlementOrder;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

}
