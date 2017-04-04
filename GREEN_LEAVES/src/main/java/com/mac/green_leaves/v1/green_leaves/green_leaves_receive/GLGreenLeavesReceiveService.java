/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_receive;

import com.mac.green_leaves.v1.zexception.EntityNotFoundException;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceive;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetail;
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

    @Autowired
    GLGreenLeavesReceiveDetailRepository gLGreenLeavesReceiveDetailRepository;

    private final String PENDING_STATUS = "PENDING";
    private final String APPROVE_STATUS = "APPROVE";
    private final String DELETE_STATUS = "DELETED";
    //
    private final String BULK_TYPE = "BULK";
    private final String SUPPLIER_TYPE = "SUPPLIER";

    public TGreenLeavesReceive getReceive(Integer branch, Integer number) {
        List<TGreenLeavesReceive> receives = greenLeavesReceiveRepository.findByBranchAndNumberAndTypeAndStatusNot(branch, number, BULK_TYPE, DELETE_STATUS);

        if (receives.isEmpty()) {
            throw new EntityNotFoundException("Green leaves receive not found for number " + number);
        }

        return receives.get(0);
    }

    @Transactional
    public Integer saveGreenLeaveReceiveDetails(TGreenLeavesReceive greenLeavesReceive) {
        if (greenLeavesReceive.getIndexNo() == null) {
            Integer maxNumber = greenLeavesReceiveRepository.getMaximumNumberByBranchAndType(greenLeavesReceive.getBranch(), BULK_TYPE);
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
        return greenLeavesReceive.getNumber();
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

//    public TGreenLeavesReceive findByBranchAndRouteAndDate(Integer branch, Integer route, Date date) {
//        List<TGreenLeavesReceive> receives = greenLeavesReceiveRepository.findByBranchAndRouteAndDateAndStatusNot(branch, route, date, DELETE_STATUS);
//        if (receives.isEmpty()) {
//            throw new EntityNotFoundException("Green leaves receive not found");
//        }
//        return receives.get(0);
//    }

    public void deleteGreenLeavesReceive(Integer indexNo) {
        TGreenLeavesReceive tGreenLeavesReceive = greenLeavesReceiveRepository.getOne(indexNo);
        tGreenLeavesReceive.setStatus(DELETE_STATUS);
        greenLeavesReceiveRepository.save(tGreenLeavesReceive);
    }

    @Transactional
    public void deleteGreenLeavesReceiveDetail(Integer indexNo) {
        greenLeavesReceiveRepository.deleteGreenLeavesReceiveDetail(indexNo);

//        TGreenLeavesReceiveDetail greenLeavesReceiveDetail = gLGreenLeavesReceiveDetailRepository.getOne(indexNo);
//        Integer greenLeavesReceiveIndexNo = greenLeavesReceiveDetail.getGreenLeavesReceive().getIndexNo();
//        TGreenLeavesReceive greenLeavesReceive = greenLeavesReceiveRepository.getOne(greenLeavesReceiveIndexNo);
//        greenLeavesReceive.getGreenLeavesReceiveDetails().remove(greenLeavesReceiveDetail);
//        gLGreenLeavesReceiveDetailRepository.delete(greenLeavesReceiveDetail);
//        greenLeavesReceiveRepository.save(greenLeavesReceive);
    }
}
