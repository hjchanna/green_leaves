/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.dashboard.receive_dashboard_2;

import com.mac.green_leaves.v1.dashboard.receive_dashboard_2.model.ReceiveDetail2;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author hjcha
 */
public interface ReceiveDetail2Repository extends JpaRepository<ReceiveDetail2, Integer> {

    public List<ReceiveDetail2> findReceiveDetails(@Param("fromDate") Date fromDate,
            @Param("toDate") Date toDate,
            @Param("branch") Integer branch);
}
