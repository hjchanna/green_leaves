/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.main_Distribution;

import com.mac.green_leaves.v1.master.main_Distribution.model.MMainDistribution;
import com.mac.green_leaves.v1.master.sub_Distribution.model.MSubDistribution;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kalum
 */
public interface MainDistributionRepository extends  JpaRepository<MMainDistribution, Serializable>  {

    public List<MMainDistribution> findByName(String name);
    
}
