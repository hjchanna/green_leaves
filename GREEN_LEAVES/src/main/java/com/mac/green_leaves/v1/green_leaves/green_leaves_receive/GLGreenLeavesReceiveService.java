/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_receive;

import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceive;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetail;
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
public class GLGreenLeavesReceiveService {

    @Autowired
    private GLGreenLeavesReceiveRepository greenLeavesReceiveRepository;

    public TGreenLeavesReceive saveGreenLeaveReceiveDetails(TGreenLeavesReceive greenLeavesReceive) {
        for (TGreenLeavesReceiveDetail greenLeavesReceiveDetail : greenLeavesReceive.getGreenLeavesReceiveDetails()) {
            greenLeavesReceiveDetail.setGreenLeavesReceive(greenLeavesReceive);
        }

        TGreenLeavesReceive getGreenLeavesReceive = greenLeavesReceiveRepository.save(greenLeavesReceive);
        return getGreenLeavesReceive;
    }
}
