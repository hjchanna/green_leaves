/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.dashboard.receive_dashboard_2;

import com.mac.green_leaves.v1.dashboard.receive_dashboard_2.model.ReceiveSummary2;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hjcha
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/dashboard/receive-dashboard-2")
public class ReceiveDashboard2Controller {

    @Autowired
    private ReceiveDashboard2Service receiveDashboard2Service;

    @RequestMapping(value = "/receive-summary/{fromDate}/{toDate}", method = RequestMethod.GET)
    public ReceiveSummary2 findReceiveDetails(
            @PathVariable("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fromDate,
            @PathVariable("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date toDate) {
        return receiveDashboard2Service.findReceiveSummary(fromDate, toDate, SecurityUtil.getCurrentUser().getBranch());
    }

}
