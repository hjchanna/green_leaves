/*
 *  GreenLeavesWeighRepository.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 20, 2016, 10:56:57 AM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.green_leaves.v1.transaction.green_leaves_weigh;

import com.mac.green_leaves.v1.transaction.green_leaves_weigh.model.TGreenLeaveWeigh;
import java.util.Date;
import java.util.List;
import javax.persistence.TemporalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mohan
 */
public interface GreenLeavesWeighRepository extends JpaRepository<TGreenLeaveWeigh, Integer> {

    public List<TGreenLeaveWeigh> findByBranchAndNumber(Integer branch, Integer number);

    @Query(value = "SELECT MAX(number) FROM t_green_leave_weigh WHERE branch=:branch", nativeQuery = true)
    public int getMaximumNumberByBranch(@Param("branch") Integer branch);

    @Query(value = "SELECT sum(normal_total_weight) as total_normal_leaves_quantity, sum(super_total_weight) as total_super_leaves_quantity FROM t_green_leave_weigh where branch =:branch and route =:route and date =:date", nativeQuery = true)
    public List<Object[]> getTotalLeves(@Param("branch") Integer branch, @Param("route") Integer route, @Param("date") @Temporal(TemporalType.DATE) Date date);

}
