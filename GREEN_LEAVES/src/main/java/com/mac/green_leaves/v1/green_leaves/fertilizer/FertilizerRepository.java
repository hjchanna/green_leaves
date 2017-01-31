/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.fertilizer;

import com.mac.green_leaves.v1.green_leaves.fertilizer.model.TFertilizer;
import java.util.Date;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Don
 */
public interface FertilizerRepository extends JpaRepository<TFertilizer, Integer> {

    @Query(value = "SELECT MAX(number) FROM t_fertilizer WHERE branch=:branch", nativeQuery = true)
    public Integer getMaximumNumberByBranch(@Param("branch") Integer branch);

    public TFertilizer findByDateAndNumber(Date date, Integer number);
}
