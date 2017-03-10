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

    @Query(value = "select \n"
            + " t_fertilizer.date,\n"
            + " sum(t_fertilizer_detail.amount),\n"
            + " count(*)\n"
            + "from\n"
            + " t_fertilizer\n"
            + "inner join \n"
            + " t_fertilizer_detail\n"
            + "on \n"
            + " t_fertilizer.index_no =  t_fertilizer_detail.fertilizer\n"
            + "where\n"
            + " t_fertilizer.branch = :branch and t_fertilizer_detail.status = \"PENDING\""
            + "and"
            + " t_fertilizer.status <> \"DELETED\""
            + "group by t_fertilizer.date;", nativeQuery = true)
    public List<Object[]> getPendingRequest(@Param("branch") Integer branch);

    public TFertilizer findByNumberAndStatusNot(Integer number, String status);

    @Modifying(clearAutomatically = true)
    @Query(value = "delete from t_fertilizer_detail where index_no = :indexNo", nativeQuery = true)
    public void deleteFertilizerDetail(@Param("indexNo") Integer indexNo);
}
