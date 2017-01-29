/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.price_setting;

import com.mac.green_leaves.v1.green_leaves.price_setting.model.TClientLedgerBalance;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author hjcha
 */
public interface GLClientLedgerBalanceRepository extends JpaRepository<TClientLedgerBalance, String> {

    public List<TClientLedgerBalance> findClientLedgerBalance(@Param("branch") Integer branch);
}
