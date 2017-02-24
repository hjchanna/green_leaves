/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.fertilizer;

import com.mac.green_leaves.v1.green_leaves.fertilizer.model.TFertilizer;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Don
 */
public interface FertilizerRepository extends JpaRepository<TFertilizer, Integer> {

    @Query(value = "SELECT MAX(number) FROM t_fertilizer WHERE branch=:branch", nativeQuery = true)
    public Integer getMaximumNumberByBranch(@Param("branch") Integer branch);

    @Query(value = "SELECT \n"
            + "route_officer,\n"
            + "sum(amount),"
            + "count(*)\n"
            + "FROM t_fertilizer  \n"
            + "WHERE branch = :branch and status = \"PENDING\"\n"
            + "GROUP BY t_fertilizer.route_officer;", nativeQuery = true)
    public List<Object[]> getPendingRequest(@Param("branch") Integer branch);

    public TFertilizer findByDateAndNumberAndStatusNot(Date date, Integer number, String status);

    public List<TFertilizer> findByBranchAndStatusAndRouteOfficer(Integer branch, String status, Integer routeOfficer);

    @Modifying(clearAutomatically = true)
    @Query(value = "delete from t_fertilizer_detail where index_no = :indexNo", nativeQuery = true)
    public void deleteFertilizerDetail(@Param("indexNo") Integer indexNo);
}
