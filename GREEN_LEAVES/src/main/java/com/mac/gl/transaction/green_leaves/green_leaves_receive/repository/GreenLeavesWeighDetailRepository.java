/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.green_leaves_receive.repository;

import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesWeighDetail;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Don
 */
public interface GreenLeavesWeighDetailRepository extends JpaRepository<TGreenLeavesWeighDetail, Integer> {

    @Query("select sum(ts.normalLeavesQuantity),sum(ts.superLeavesQuantity) from TGreenLeavesWeighDetail ts, TGreenLeavesWeigh t where t.route :route and t.date :date and branch = :branch")
    public List<Object[]> getTotalLeavesWeighByNormalLeavesAndSuperLeaves(@Param("route")Integer route,@Param("date") Date date,@Param("branch") Integer branch);
}
