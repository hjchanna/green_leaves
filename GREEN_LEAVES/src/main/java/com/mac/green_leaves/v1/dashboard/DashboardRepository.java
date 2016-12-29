/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.dashboard;

import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeigh;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.TemporalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Don
 */
public interface DashboardRepository extends JpaRepository<TGreenLeavesWeigh, Serializable> {

    @Query(value = "SELECT \n"
            + "sum(t_green_leaves_weigh.normal_net_weight),\n"
            + "sum(t_green_leaves_weigh.super_net_weight)\n"
            + "FROM  t_green_leaves_weigh \n"
            + "WHERE \n"
            + "(date BETWEEN :formDate AND :toDate) \n"
            + "AND route = :route \n"
            + "AND route_officer = :routeOfficer \n"
            + "AND route_helper = :routeHelper \n"
            + "AND vehicle = :vehicle \n"
            + "AND type = 'BULK'", nativeQuery = true)
    public List<Object[]> getBulkGreenLeavesWeighTotal(@Param("formDate") @Temporal(TemporalType.DATE) Date fromDate, @Param("toDate") @Temporal(TemporalType.DATE) Date toDate, @Param("route") Integer route, @Param("routeOfficer") Integer routeOfiicer, @Param("routeHelper") Integer routeHelper, @Param("vehicle") Integer vehicle);

    @Query(value = "SELECT \n"
            + "t_green_leaves_weigh.index_no,\n"
            + "t_green_leaves_weigh.route,\n"
            + "t_green_leaves_weigh.date,\n"
            + "sum(t_green_leaves_weigh.normal_net_weight),\n"
            + "sum(t_green_leaves_weigh.super_net_weight) \n"
            + "FROM  t_green_leaves_weigh \n"
            + "WHERE (date BETWEEN :formDate AND :toDate) \n"
            + "AND route = :route \n"
            + "AND route_officer = :routeOfficer \n"
            + "AND route_helper = :routeHelper \n"
            + "AND vehicle = :vehicle \n"
            + "AND type = :type GROUP BY t_green_leaves_weigh.route", nativeQuery = true)
    public List<Object[]> getGreenLeavesWeighSummry(@Param("formDate") @Temporal(TemporalType.DATE) Date fromDate, @Param("toDate") @Temporal(TemporalType.DATE) Date toDate, @Param("route") Integer route, @Param("routeOfficer") Integer routeOfiicer, @Param("routeHelper") Integer routeHelper, @Param("vehicle") Integer vehicle, @Param("type") String type);
}
