/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.dashboard.receive_dashboard_2;

import com.mac.green_leaves.v1.dashboard.receive_dashboard_2.model.ReceiveSummary2;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author hjcha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ReceiveDashboard2Service {

    @Autowired
    private ReceiveDetail2Repository receiveDetail2Repository;

    public ReceiveSummary2 findReceiveSummary(Date fromDate, Date toDate, Integer branch) {
        ReceiveSummary2 receiveSummary2 = new ReceiveSummary2();

        receiveSummary2.setReceiveDetails(receiveDetail2Repository.findReceiveDetails(fromDate, toDate, branch));

        return receiveSummary2;
    }

}
