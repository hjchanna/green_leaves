/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.dashboard.receive_dashboard;

import com.mac.green_leaves.v1.dashboard.receive_dashboard.model.greenLeavesSummry;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceive;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeigh;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Don
 */
@RestController
@CrossOrigin
@RequestMapping("/api/dash-board")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @RequestMapping(value = "/find-green-leave-weigh-dashboard-summary", method = RequestMethod.POST)
    public List<TGreenLeavesWeigh> getGeenLeavesWeighTotalSummary(@RequestBody greenLeavesSummry leavesSummry) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        leavesSummry.setBranch(branch);
        return dashboardService.getGeenLeavesWeighTotalSummary(leavesSummry);
    }

    @RequestMapping(value = "/find-green-leave-receive-dashboard-summary", method = RequestMethod.POST)
    public List<TGreenLeavesReceive> getGeenLeavesReceiveTotalSummary(@RequestBody greenLeavesSummry leavesSummry) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        leavesSummry.setBranch(branch);
        return dashboardService.getGeenLeavesReceiveTotalSummary(leavesSummry);
    }

    @RequestMapping(value = "/summry-details/{date}", method = RequestMethod.GET)
    public HashMap<String, Object> getCrossEntry(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        return dashboardService.getSummryData(date,branch);
    }

}
