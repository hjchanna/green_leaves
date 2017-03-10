/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.dashboard;

import com.mac.green_leaves.v1.dashboard.model.greenLeavesSummry;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceive;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeigh;
import com.mac.green_leaves.v1.zexception.EntityNotFoundException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
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

    public TGreenLeavesWeigh getGreenLeavesWeighSummryByIndexNo(Integer indexNo) {
        return dashboardRepository.findOne(indexNo);
    }

    List<TGreenLeavesWeigh> getGeenLeavesWeighTotalSummary(greenLeavesSummry leavesSummry) {
        Criteria criteria = entityManager.unwrap(Session.class).createCriteria(TGreenLeavesWeigh.class);
        criteria.add(Restrictions.eq("type", leavesSummry.getType()));

        if (leavesSummry.getFromDate() != null && leavesSummry.getToDate() != null) {
            criteria.add(Restrictions.between("date", leavesSummry.getFromDate(), leavesSummry.getToDate()));
        }

        if (leavesSummry.getRoute() != null) {
            criteria.add(Restrictions.eq("route", leavesSummry.getRoute()));
        }

        if (!"null".equals(leavesSummry.getStatus())) {
            if (leavesSummry.getStatus() != null) {
                criteria.add(Restrictions.eq("status", leavesSummry.getStatus()));
            }
        }

        if (leavesSummry.getClient() != null) {
            criteria.add(Restrictions.eq("client", leavesSummry.getClient()));
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

        if (leavesSummry.getFromDate() == null
                && leavesSummry.getToDate() == null
                && leavesSummry.getRoute() == null
                && leavesSummry.getClient() == null
                && leavesSummry.getRouteOfficer() == null
                && leavesSummry.getRouteHelper() == null
                && leavesSummry.getVehicle() == null) {
            throw new EntityNotFoundException("green leaves weigh not found");
        }

        criteria.setResultTransformer(DetachedCriteria.DISTINCT_ROOT_ENTITY);
        criteria.addOrder(Order.asc("date"));
        criteria.add(Restrictions.ne("status", "DELETED"));
        List<TGreenLeavesWeigh> greenLeavesWeigh = criteria.list();
        return greenLeavesWeigh;
    }

    List<TGreenLeavesReceive> getGeenLeavesReceiveTotalSummary(greenLeavesSummry leavesSummry) {
        if ("client".equals(leavesSummry.getType())) {
            Criteria criteria = entityManager.unwrap(Session.class).createCriteria(TGreenLeavesReceive.class);

            if (leavesSummry.getFromDate() != null && leavesSummry.getToDate() != null) {
                criteria.add(Restrictions.between("date", leavesSummry.getFromDate(), leavesSummry.getToDate()));
            }

            if (!"null".equals(leavesSummry.getStatus())) {
                if (leavesSummry.getStatus() != null) {
                    criteria.add(Restrictions.eq("status", leavesSummry.getStatus()));
                }
            }

            if (leavesSummry.getRoute() != null) {
                criteria.add(Restrictions.eq("route", leavesSummry.getRoute()));
            }

            if (leavesSummry.getClient() != null) {
                System.out.println(leavesSummry.getClient());
                criteria.createAlias("greenLeavesReceiveDetails", "glrd");
                criteria.add(Restrictions.eq("glrd.client", leavesSummry.getClient()));
            }

            if (leavesSummry.getClient() == null && leavesSummry.getRoute() == null && leavesSummry.getFromDate() == null && leavesSummry.getToDate() == null) {
                throw new EntityNotFoundException("green leaves receive not found");
            }

            criteria.setResultTransformer(DetachedCriteria.DISTINCT_ROOT_ENTITY);
            criteria.addOrder(Order.asc("date"));
            criteria.add(Restrictions.isNotNull("route"));
            criteria.add(Restrictions.ne("status", "DELETED"));
            List<TGreenLeavesReceive> greenLeavesReceives = criteria.list();
            return greenLeavesReceives;
        } else {
            Criteria criteria = entityManager.unwrap(Session.class).createCriteria(TGreenLeavesReceive.class);

            if (leavesSummry.getFromDate() != null && leavesSummry.getToDate() != null) {
                criteria.add(Restrictions.between("date", leavesSummry.getFromDate(), leavesSummry.getToDate()));
            }

            if (!"null".equals(leavesSummry.getStatus())) {
                if (leavesSummry.getStatus() != null) {
                    criteria.add(Restrictions.eq("status", leavesSummry.getStatus()));
                }
            }

            if (leavesSummry.getRoute() != null) {
                criteria.add(Restrictions.eq("route", leavesSummry.getRoute()));
            }

            if (leavesSummry.getClient() == null && leavesSummry.getRoute() == null && leavesSummry.getFromDate() == null && leavesSummry.getToDate() == null) {
                throw new EntityNotFoundException("green leaves receive not found");
            }

            criteria.setResultTransformer(DetachedCriteria.DISTINCT_ROOT_ENTITY);
            criteria.addOrder(Order.asc("date"));
            criteria.add(Restrictions.isNotNull("route"));
            criteria.add(Restrictions.ne("status", "DELETED"));
            List<TGreenLeavesReceive> greenLeavesReceives = criteria.list();
            return greenLeavesReceives;
        }
    }

    List<TGreenLeavesReceive> getCrossEntryGreenLeavesReceive(greenLeavesSummry leavesSummry) {
        Criteria criteria = entityManager.unwrap(Session.class).createCriteria(TGreenLeavesReceive.class);

        if (leavesSummry.getClient() != null) {
            criteria.createAlias("greenLeavesReceiveDetails", "glrd");
            criteria.add(Restrictions.eq("glrd.client", leavesSummry.getClient()));
        }

        if (leavesSummry.getFromDate() != null && leavesSummry.getToDate() != null) {
            criteria.add(Restrictions.between("date", leavesSummry.getFromDate(), leavesSummry.getToDate()));
        }

        if (leavesSummry.getClient() == null && leavesSummry.getRoute() == null && leavesSummry.getFromDate() == null && leavesSummry.getToDate() == null) {
            throw new EntityNotFoundException("green leaves receive not found");
        }

        if (!"null".equals(leavesSummry.getStatus())) {
            if (leavesSummry.getStatus() != null) {
                criteria.add(Restrictions.eq("status", leavesSummry.getStatus()));
            }
        }

        criteria.setResultTransformer(DetachedCriteria.DISTINCT_ROOT_ENTITY);
        criteria.addOrder(Order.asc("date"));
        criteria.add(Restrictions.isNotNull("route"));
        List<TGreenLeavesReceive> greenLeavesReceives = criteria.list();
        return greenLeavesReceives;
    }

    public HashMap<String, Object> getSummryData(Date date) {
        HashMap<String, Object> summaryData = new HashMap<>();

        List<Object[]> dailyFactory = dashboardRepository.getGreenLeavesReceiveFactoryTotalToDate(date);
        List<Object[]> monthlyFactory = dashboardRepository.getGreenLeavesReceiveFactoryTotalMonth(date);
        List<Object[]> dailyRouteWise = dashboardRepository.getGreenLeavesReceiveRouteWiseTotalDaily(date);
        List<Object[]> monthlyRouteWise = dashboardRepository.getGreenLeavesReceiveRouteWiseTotalMonth(date);

        summaryData.put("dailyFactory", dailyFactory.get(0));
        summaryData.put("monthlyFactory", monthlyFactory.get(0));
        summaryData.put("dailyRouteWise", dailyRouteWise.get(0));
        summaryData.put("monthlyRouteWise", monthlyRouteWise.get(0));
        return summaryData;
    }
}
