/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.green_leaves_receive.repository;

import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesReceive;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetails;
import java.sql.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Don
 */
public interface GreenLeavesReceiveDetailsRepository extends JpaRepository<TGreenLeavesReceive, Integer> {

    //sql query = SELECT ts  FROM t_green_leaves_receive t LEFT JOIN t_green_leaves_receive_details ts ON t.index_no = ts.green_leaves_receive where t.index_no = 2 and t.date = "2016-09-13" and t.branch = 1;
    @Query("SELECT ts  FROM TGreenLeavesReceive t LEFT JOIN TGreenLeavesReceiveDetails ts ON t.indexNo = ts.greenLeavesReceive where t.indexNo = :route and t.date = :date and t.branch = :branch")
    public List<TGreenLeavesReceiveDetails> findByRouteAndDate(@Param("route") Integer route, @Param("date") Date date, @Param("branch") Integer branch);
}
