/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_receive;

import com.mac.green_leaves.v1.exception.EntityNotFoundException;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceive;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetail;
import java.math.BigDecimal;
import java.util.Date;
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

    private final String PENDING_STATUS = "PENDING";
    private final String APPROVE_STATUS = "APPROVE";

    public TGreenLeavesReceive getReceive(Integer branch, Integer number) {
        List<TGreenLeavesReceive> receives = greenLeavesReceiveRepository.findByBranchAndNumber(branch, number);

        if (receives.isEmpty()) {
            throw new EntityNotFoundException("Green leaves receive not found for number " + number);
        }

        return receives.get(0);
    }

    @Transactional
    public Integer saveGreenLeaveReceiveDetails(TGreenLeavesReceive greenLeavesReceive) {
        if (greenLeavesReceive.getIndexNo() == null) {
            Integer maxNumber = greenLeavesReceiveRepository.getMaximumNumberByBranch(greenLeavesReceive.getBranch());
            if (maxNumber == null) {
                maxNumber = 0;
            }
            greenLeavesReceive.setNumber(maxNumber + 1);
        }

        //green leaves approve status change
        List<TGreenLeavesReceiveDetail> list = greenLeavesReceive.getGreenLeavesReceiveDetails();
        String status = APPROVE_STATUS;

        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getClient() == null) {
                status = PENDING_STATUS;
            }
        }

        greenLeavesReceive.setStatus(status);

        //TODO:transaction
        for (TGreenLeavesReceiveDetail greenLeavesReceiveDetail : greenLeavesReceive.getGreenLeavesReceiveDetails()) {
            greenLeavesReceiveDetail.setGreenLeavesReceive(greenLeavesReceive);
        }

        greenLeavesReceive = greenLeavesReceiveRepository.save(greenLeavesReceive);
        return greenLeavesReceive.getIndexNo();
    }

    public Object[] getTotalSuperLeavesAndNormalLeaves(Integer branch, Integer route, Date date) {
        List<Object[]> getTotalList = greenLeavesReceiveRepository.getSuperLeavesTotalAndNormalLeaveTotal(branch, route, date);

        Object total[];
        if (!getTotalList.isEmpty()) {
            total = getTotalList.get(0);
        } else {
            total = new Object[]{0, 0};
        }

        return total;
    }

    public List<TGreenLeavesReceive> findByBranchAndRouteAndDateAndGreenLeavesReceiveDetailsClient(Integer branch, Date date, Integer client) {
        return greenLeavesReceiveRepository.findByBranchAndDateAndGreenLeavesReceiveDetailsClient(branch, date, client);
    }

    @Transactional
    public Integer updateNormalLeafAndSuperLeaf(Integer indexNo, BigDecimal normalLeavesTotal, BigDecimal superLeavesTotal) {
        return greenLeavesReceiveRepository.updateNormalLeafAndSuperLeaf(indexNo, normalLeavesTotal, superLeavesTotal);
    }

    public TGreenLeavesReceive findByBranchAndRouteAndDate(Integer branch, Integer route, Date date) {
        List<TGreenLeavesReceive> receives = greenLeavesReceiveRepository.findByBranchAndRouteAndDate(branch, route, date);
        if (receives.isEmpty()) {
            throw new EntityNotFoundException("Green leaves receive not found");
        }
        return receives.get(0);
    }

    public void deleteGreenLeavesReceive(Integer indexNo) {
        TGreenLeavesReceive tGreenLeavesReceive = greenLeavesReceiveRepository.getOne(indexNo);
        tGreenLeavesReceive.setStatus("DELETED");
        greenLeavesReceiveRepository.save(tGreenLeavesReceive);
    }
}
