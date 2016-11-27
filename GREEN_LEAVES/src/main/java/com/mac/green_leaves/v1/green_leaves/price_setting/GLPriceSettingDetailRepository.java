/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.price_setting;

import com.mac.green_leaves.v1.green_leaves.price_setting.model.TPriceSettingDetail;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Mohan
 */
public interface GLPriceSettingDetailRepository extends JpaRepository<TPriceSettingDetail, Integer>{
    
}
