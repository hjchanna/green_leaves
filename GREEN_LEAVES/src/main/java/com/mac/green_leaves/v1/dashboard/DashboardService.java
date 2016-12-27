/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.dashboard;

import java.util.Date;
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

    public Object[] getBulkGreenLeavesWeighSummary(Date fromDate, Date toDate, Integer route, Integer routeOfficer, Integer routeHelper, Integer vehicle) {
        List<Object[]> getTotalList = dashboardRepository.getBulkGreenLeavesWeighSummary(fromDate, toDate, route, routeOfficer, routeHelper, vehicle);
        Object total[];
        if (!getTotalList.isEmpty()) {
            total = getTotalList.get(0);
        } else {
            total = new Object[]{0, 0};
        }
        return total;
    }

}
