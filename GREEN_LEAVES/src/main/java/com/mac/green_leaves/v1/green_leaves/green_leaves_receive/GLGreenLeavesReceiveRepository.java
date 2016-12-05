/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_receive;

import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceive;
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
public interface GLGreenLeavesReceiveRepository extends JpaRepository<TGreenLeavesReceive, Integer> {

    public List<TGreenLeavesReceive> findByBranchAndNumber(Integer branch, Integer number);

    @Query(value = "SELECT MAX(number) FROM t_green_leaves_receive WHERE branch=:branch", nativeQuery = true)
    public Integer getMaximumNumberByBranch(@Param("branch") Integer branch);

    @Query(value = "select\n"
            + "	sum(t_green_leaves_weigh.normal_net_weight),\n"
            + "	sum(t_green_leaves_weigh.super_net_weight)\n"
            + "from\n"
            + "	t_green_leaves_weigh\n"
            + "where\n"
            + "	t_green_leaves_weigh.branch = :branch\n"
            + "	and t_green_leaves_weigh.route = :route\n"
            + "	and t_green_leaves_weigh.date = :date", nativeQuery = true)
    public List<Object[]> findByBranchAndRouteAndDate(@Param("branch") Integer branch, @Param("route") Integer route, @Param("date") @Temporal(TemporalType.DATE) Date date);
}
