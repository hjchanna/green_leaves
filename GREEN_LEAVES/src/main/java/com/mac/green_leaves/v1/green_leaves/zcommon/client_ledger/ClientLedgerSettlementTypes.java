/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger;

/**
 *
 * @author hjcha
 */
public class ClientLedgerSettlementTypes {

    public static final ClientLedgerSettlementType GREEN_LEAVES = new ClientLedgerSettlementType("GREEN_LEAVES", 1000);
    public static final ClientLedgerSettlementType ADVANCE = new ClientLedgerSettlementType("ADVANCE", 2);

    public static class ClientLedgerSettlementType {

        private String settlementType;
        private Integer settlementOrder;

        public ClientLedgerSettlementType(String settlementType, Integer settlementOrder) {
            this.settlementType = settlementType;
            this.settlementOrder = settlementOrder;
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

    }
}
