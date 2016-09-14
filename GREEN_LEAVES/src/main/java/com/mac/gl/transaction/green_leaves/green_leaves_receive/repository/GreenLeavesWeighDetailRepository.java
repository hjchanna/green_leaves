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

    //sql query = SELECT sum(normal_leaves_quantity),sum(super_leaves_quantity) FROM t_green_leave_weigh LEFT JOIN t_green_leave_weigh_detail ON t_green_leave_weigh.index_no = t_green_leave_weigh_detail.green_leave_weigh where t_green_leave_weigh.index_no = 1 and date = "2016-09-14" and t_green_leave_weigh.branch = 1;
    @Query("SELECT sum(ts.normalLeavesQuantity),sum(ts.superLeavesQuantity) FROM TGreenLeavesWeigh t LEFT JOIN TGreenLeavesWeighDetail ts ON t.indexNo = ts.greenLeavesWeigh where t.indexNo = :route and t.date = :date and t.branch = :branch")
    public List<Object[]> getTotalLeavesWeighByNormalLeavesAndSuperLeaves(@Param("route") Integer route, @Param("date") Date date, @Param("branch") Integer branch);
}
