/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.transaction.green_leaves_receive;

import com.mac.green_leaves.v1.transaction.green_leaves_receive.model.TGreenLeavesReceive;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface GreenLeavesReceiveRepository extends JpaRepository<TGreenLeavesReceive, Integer> {
}