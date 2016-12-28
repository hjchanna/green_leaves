/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.dashboard;

import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeigh;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
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

    @RequestMapping(value = "/find-green-leave-dashboard-summary/{fromDate}/{toDate}/{route}/{routeOfficer}/{routeHelper}/{vehicle}", method = RequestMethod.GET)
    public HashMap<String, Object> getGeenLeavesTotalSummary(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date fromDate, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date toDate, @PathVariable Integer route, @PathVariable Integer routeOfficer, @PathVariable Integer routeHelper, @PathVariable Integer vehicle) {
        return dashboardService.getGeenLeavesTotalSummary(fromDate, toDate, route, routeOfficer, routeHelper, vehicle);
    }

    @RequestMapping(value = "/find-green-leave-dashboard-weigh/{fromDate}/{toDate}/{route}/{routeOfficer}/{routeHelper}/{vehicle}/{type}", method = RequestMethod.GET)
    public List<Object[]> getBulkGreenLeavesWeighSummry(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date fromDate, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date toDate, @PathVariable Integer route, @PathVariable Integer routeOfficer, @PathVariable Integer routeHelper, @PathVariable Integer vehicle, @PathVariable String type) {
        return dashboardService.getGreenLeavesWeighSummry(fromDate, toDate, route, routeOfficer, routeHelper, vehicle, type);
    }

    @RequestMapping(value = "/find-green-leave-dashboard-weigh-by-indexNo/{indexNo}", method = RequestMethod.GET)
    public List<TGreenLeavesWeigh> getBulkGreenLeavesWeighSummry(@PathVariable Integer indexNo) {
        return dashboardService.getGreenLeavesWeighSummryByIndexNo(indexNo);
    }
}
