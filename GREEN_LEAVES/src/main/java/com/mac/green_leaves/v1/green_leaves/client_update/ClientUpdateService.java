/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_update;

import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.GLGreenLeavesReceiveDetailRepository;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetail;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Don
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ClientUpdateService {

    @Autowired
    private GLGreenLeavesReceiveDetailRepository greenLeavesReceiveDetailRepository;
    
    List<TGreenLeavesReceiveDetail> remarkGreenLeavesReceives() {
        return greenLeavesReceiveDetailRepository.findByRemarkNotNull();
    }
}
