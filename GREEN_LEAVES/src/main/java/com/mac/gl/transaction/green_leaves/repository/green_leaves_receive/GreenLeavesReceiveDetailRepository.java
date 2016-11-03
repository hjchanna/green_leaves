/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.repository.green_leaves_receive;

import com.mac.gl.transaction.green_leaves.model.green_leaves_receive.TGreenLeavesReceiveDetail;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface GreenLeavesReceiveDetailRepository extends JpaRepository<TGreenLeavesReceiveDetail, Integer> {
    
}
