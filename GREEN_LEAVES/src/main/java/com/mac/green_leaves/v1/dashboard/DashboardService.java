/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.dashboard;

import com.mac.green_leaves.v1.dashboard.model.greenLeavesSummry;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeigh;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
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

    @PersistenceContext
    protected EntityManager entityManager;

//    public HashMap<String, Object> getGeenLeavesTotalSummary(Date fromDate, Date toDate, Integer route, Integer routeOfficer, Integer routeHelper, Integer vehicle) {
//        HashMap<String, Object> getTotalSummaryMap = new HashMap<>();
//        List<Object[]> getTotalList = dashboardRepository.getBulkGreenLeavesWeighTotal(fromDate, toDate, route, routeOfficer, routeHelper, vehicle);
//        Object total[] = getTotalList.get(0);
//        getTotalSummaryMap.put("totalNormalWeigh", 0.0);
//        getTotalSummaryMap.put("totalSuperWeigh", 0.0);
//        getTotalSummaryMap.put("totalNormalReceive", 0.0);
//        getTotalSummaryMap.put("totalSuperReceive", 0.0);
//        getTotalSummaryMap.put("bulkWeighNormalTotal", total[0]);
//        getTotalSummaryMap.put("bulkWeighSuperTotal", total[1]);
//        getTotalSummaryMap.put("bulkReceiveNormalTotal", 0.0);
//        getTotalSummaryMap.put("bulkReceiveSuperTotal", 0.0);
//        getTotalSummaryMap.put("supplierWeighNormalTotal", 0.0);
//        getTotalSummaryMap.put("supplierWeighSuperTotal", 0.0);
//        getTotalSummaryMap.put("supplierReceiveSuperTotal", 0.0);
//        getTotalSummaryMap.put("supplierReceiveNormalTotal", 0.0);
//        return getTotalSummaryMap;
//    }
    public List<Object[]> getGreenLeavesWeighSummry(Date fromDate, Date toDate, Integer route, Integer routeOfficer, Integer routeHelper, Integer vehicle, String type) {
        return dashboardRepository.getGreenLeavesWeighSummry(fromDate, toDate, route, routeOfficer, routeHelper, vehicle, type);
    }

    public TGreenLeavesWeigh getGreenLeavesWeighSummryByIndexNo(Integer indexNo) {
        return dashboardRepository.findOne(indexNo);
    }

    List<TGreenLeavesWeigh> getGeenLeavesWeighTotalSummary(greenLeavesSummry leavesSummry) {
        Criteria criteria = entityManager.unwrap(Session.class).createCriteria(TGreenLeavesWeigh.class);

        //search only route
        if (leavesSummry.getRoute() != null) {
            criteria.add(Restrictions.eq("route", leavesSummry.getRoute()));
        }
        if (leavesSummry.getRouteOfficer() != null) {
            criteria.add(Restrictions.eq("routeOfficer", leavesSummry.getRouteOfficer()));
        }
        if (leavesSummry.getRouteHelper() != null) {
            criteria.add(Restrictions.eq("routeHelper", leavesSummry.getRouteHelper()));
        }
        if (leavesSummry.getVehicle() != null) {
            criteria.add(Restrictions.eq("vehicle", leavesSummry.getVehicle()));
        }

        criteria.setResultTransformer(DetachedCriteria.DISTINCT_ROOT_ENTITY);
        List<TGreenLeavesWeigh> greenLeavesWeigh = criteria.list();
        return greenLeavesWeigh;
    }
}
