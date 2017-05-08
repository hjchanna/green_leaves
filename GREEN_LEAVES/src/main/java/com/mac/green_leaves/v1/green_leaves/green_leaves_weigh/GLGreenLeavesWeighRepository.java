/*
 *  GLGreenLeavesWeighRepository.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 20, 2016, 10:56:57 AM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_weigh;

import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeigh;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mohan
 */
public interface GLGreenLeavesWeighRepository extends JpaRepository<TGreenLeavesWeigh, Integer> {

    public List<TGreenLeavesWeigh> findByBranchAndNumberAndTypeAndStatusNot(Integer branch, Integer number, String type, String ststus);

    public List<TGreenLeavesWeigh> findByWeighBranchAndStatusAndType(Integer weighBranch, String status, String type);

    public List<TGreenLeavesWeigh> findByWeighBranchAndRouteAndDate(Integer weighBranch, Integer route, Date date);

    @Query(value = "SELECT MAX(number) FROM t_green_leaves_weigh WHERE branch=:branch and type=:type", nativeQuery = true)
    public Integer getMaximumNumberByBranchAndType(@Param("branch") Integer branch, @Param("type") String type);

    @Modifying(clearAutomatically = true)
    @Query(value = "update t_green_leaves_weigh set status = :status where index_no = :indexNo", nativeQuery = true)
    public Integer updateStatus(@Param("indexNo") Integer indexNo, @Param("status") String status);

//    public TGreenLeavesWeigh findByBranchAndRouteAndDateAndTypeAndStatusNot(Integer branch, Integer route, Date date, String type, String ststus);
//
//    public TGreenLeavesWeigh findByBranchAndDateAndClientAndTypeAndStatusNot(Integer branch, Date date, Integer client, String type, String ststus);

}
