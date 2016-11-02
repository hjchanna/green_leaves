/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.service.green_leaves_receive;

import com.mac.gl.transaction.green_leaves.model.green_leaves_receive.TGreenLeavesReceive;
import com.mac.gl.transaction.green_leaves.repository.green_leaves_receive.GreenLeavesReceiveRepository;
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
public class GreenLeavesReceiveService {

    @Autowired
    private GreenLeavesReceiveRepository greenLeavesReceiveRepository;

    public void saveGreenLeaveReceiveDetails(TGreenLeavesReceive greenLeavesReceive) {
        greenLeavesReceive = greenLeavesReceiveRepository.save(greenLeavesReceive);
    }
}
