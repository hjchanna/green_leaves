/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_receive;

import com.mac.green_leaves.v1.exception.EntityNotFoundException;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceive;
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
public class GLGreenLeavesReceiveService {

    @Autowired
    private GLGreenLeavesReceiveRepository greenLeavesReceiveRepository;

    public TGreenLeavesReceive getReceive(Integer branch, Integer number) {
        List<TGreenLeavesReceive> receives = greenLeavesReceiveRepository.findByBranchAndNumber(branch, number);

        if (receives.isEmpty()) {
            throw new EntityNotFoundException("Green leaves receive not found for number " + number);
        }

        return receives.get(0);
    }

    @Transactional
    public Integer saveGreenLeaveReceiveDetails(TGreenLeavesReceive greenLeavesReceive, Integer branch) {
        greenLeavesReceive.setBranch(branch);
        Integer maxNumber = greenLeavesReceiveRepository.getMaximumNumberByBranch(branch);
        if (maxNumber == null) {
            maxNumber = 0;
        }
        greenLeavesReceive.setNumber(maxNumber + 1);

        //TODO:transaction
        for (TGreenLeavesReceiveDetail greenLeavesReceiveDetail : greenLeavesReceive.getGreenLeavesReceiveDetails()) {
            greenLeavesReceiveDetail.setGreenLeavesReceive(greenLeavesReceive);
        }

        greenLeavesReceive = greenLeavesReceiveRepository.save(greenLeavesReceive);
        return greenLeavesReceive.getIndexNo();
    }
}
