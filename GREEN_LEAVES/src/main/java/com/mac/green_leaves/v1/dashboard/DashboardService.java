/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.dashboard;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Don
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class DashboardService {

    @Autowired
    private DashboardRepository dashboardRepository;

    public HashMap<String, Object> getGeenLeavesTotalSummary(Date fromDate, Date toDate, Integer route, Integer routeOfficer, Integer routeHelper, Integer vehicle) {
        HashMap<String, Object> getTotalSummaryMap = new HashMap<>();
        List<Object[]> getTotalList = dashboardRepository.getBulkGreenLeavesWeighSummary(fromDate, toDate, route, routeOfficer, routeHelper, vehicle);
        Object total[] = getTotalList.get(0);
        getTotalSummaryMap.put("bulkWeighNormalTotal", total[0]);
        getTotalSummaryMap.put("bulkWeighSuperTotal", total[1]);
        return getTotalSummaryMap;
    }

}
