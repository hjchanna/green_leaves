/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.fertilizer_item;

import com.mac.green_leaves.v1.master.fertilizer_item.model.MFertilizerItem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kavish Manjitha
 */
public interface FertilizerItemRepository extends JpaRepository<MFertilizerItem, Integer>{
    
}
