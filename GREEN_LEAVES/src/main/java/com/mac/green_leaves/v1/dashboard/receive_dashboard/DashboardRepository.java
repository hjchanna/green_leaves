/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.dashboard.receive_dashboard;

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

//--------------------------- factory - supplicer ---------------------------
    @Query(value = "select\n"
            + "  cast(ifnull(sum(t_green_leaves_receive_detail.normal_leaves_quantity),0.0) as decimal(10,4)),\n"
            + "  cast(ifnull(sum(t_green_leaves_receive_detail.super_leaves_quantity),0.0) as decimal(10,4))\n"
            + "from\n"
            + "  t_green_leaves_receive\n"
            + "inner join\n"
            + "  t_green_leaves_receive_detail\n"
            + "on\n"
            + "  t_green_leaves_receive.index_no = t_green_leaves_receive_detail.green_leaves_receive\n"
            + "where \n"
            + "  t_green_leaves_receive.date = :date\n"
            + "and \n"
            + "  t_green_leaves_receive.branch = :branch\n"
            + "and \n"
            + "  t_green_leaves_receive.type =  'SUPPLIER'\n"
            + "and \n"
            + "  t_green_leaves_receive.status <> 'DELETED'", nativeQuery = true)
    public List<Object[]> getGreenLeavesReceiveFactoryTotalToDate(@Param("date") @Temporal(TemporalType.DATE) Date date, @Param("branch") Integer branch);

    @Query(value = "select\n"
            + "  cast(ifnull(sum(t_green_leaves_receive_detail.normal_leaves_quantity),0.0) as decimal(10,4)),\n"
            + "  cast(ifnull(sum(t_green_leaves_receive_detail.super_leaves_quantity),0.0) as decimal(10,4))\n"
            + "from\n"
            + "  t_green_leaves_receive\n"
            + "inner join\n"
            + "  t_green_leaves_receive_detail\n"
            + "on\n"
            + "  t_green_leaves_receive.index_no = t_green_leaves_receive_detail.green_leaves_receive\n"
            + "where \n"
            + "  month(t_green_leaves_receive.date) = month(:date)\n"
            + "and \n"
            + "  t_green_leaves_receive.branch = :branch\n"
            + "and \n"
            + "  t_green_leaves_receive.type =  'SUPPLIER'\n"
            + "and \n"
            + "  t_green_leaves_receive.status <> 'DELETED'", nativeQuery = true)
    public List<Object[]> getGreenLeavesReceiveFactoryTotalMonth(@Param("date") @Temporal(TemporalType.DATE) Date date, @Param("branch") Integer branch);

//--------------------------- route - bulk ---------------------------    
    @Query(value = "select\n"
            + "  cast(ifnull(sum(t_green_leaves_receive_detail.normal_leaves_quantity),0.0) as decimal(10,4)),\n"
            + "  cast(ifnull(sum(t_green_leaves_receive_detail.super_leaves_quantity),0.0) as decimal(10,4))\n"
            + "from\n"
            + "  t_green_leaves_receive\n"
            + "inner join\n"
            + "  t_green_leaves_receive_detail\n"
            + "on\n"
            + "  t_green_leaves_receive.index_no = t_green_leaves_receive_detail.green_leaves_receive\n"
            + "where \n"
            + "  month(t_green_leaves_receive.date) = month(:date)\n"
            + "and \n"
            + "  t_green_leaves_receive.branch = :branch\n"
            + "and \n"
            + "  t_green_leaves_receive.type =  'BULK'\n"
            + "and \n"
            + "  t_green_leaves_receive.status <> 'DELETED'", nativeQuery = true)
    public List<Object[]> getGreenLeavesReceiveRouteWiseTotalMonth(@Param("date") @Temporal(TemporalType.DATE) Date date, @Param("branch") Integer branch);

    @Query(value = "select\n"
            + "  cast(ifnull(sum(t_green_leaves_receive_detail.normal_leaves_quantity),0.0) as decimal(10,4)),\n"
            + "  cast(ifnull(sum(t_green_leaves_receive_detail.super_leaves_quantity),0.0) as decimal(10,4))\n"
            + "from\n"
            + "  t_green_leaves_receive\n"
            + "inner join\n"
            + "  t_green_leaves_receive_detail\n"
            + "on\n"
            + "  t_green_leaves_receive.index_no = t_green_leaves_receive_detail.green_leaves_receive\n"
            + "where \n"
            + "  t_green_leaves_receive.date = :date\n"
            + "and \n"
            + "  t_green_leaves_receive.branch = :branch\n"
            + "and \n"
            + "  t_green_leaves_receive.type =  'BULK'\n"
            + "and \n"
            + "  t_green_leaves_receive.status <> 'DELETED'", nativeQuery = true)
    public List<Object[]> getGreenLeavesReceiveRouteWiseTotalDaily(@Param("date") @Temporal(TemporalType.DATE) Date date, @Param("branch") Integer branch);
}
