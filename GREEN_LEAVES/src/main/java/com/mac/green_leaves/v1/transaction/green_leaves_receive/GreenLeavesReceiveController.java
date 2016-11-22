/*
 *  GreenLeavesReceiveController.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 25, 2016, 9:32:28 AM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.green_leaves.v1.transaction.green_leaves_receive;

import com.mac.green_leaves.v1.transaction.green_leaves_receive.model.TGreenLeavesReceive;
import com.mac.green_leaves.v1.transaction.green_leaves_receive.model.TGreenLeavesReceiveDetail;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Mohan
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/green-leaves-receive")
public class GreenLeavesReceiveController {
    
    @Autowired
    private GreenLeavesReceiveService greenLeavesReceiveService;
    
    @RequestMapping(value = "/save-green-leaves-receive", method = RequestMethod.POST)
    public void saveGreenLeavesReceive(@RequestBody TGreenLeavesReceive greenLeavesReceive) {
        greenLeavesReceive.setIndexNo(1);
        System.out.println(greenLeavesReceive.getIndexNo());
        System.out.println(greenLeavesReceive.getBranch());
        System.out.println(greenLeavesReceive.getRoute());
        System.out.println(greenLeavesReceive.getNumber());
        System.out.println(greenLeavesReceive.getDate());
        System.out.println(greenLeavesReceive.getTransaction());
        
//         List<TGreenLeavesReceiveDetail> getGreenLeavesReceiveDetailsList = greenLeavesReceive.getGreenLeavesReceiveDetails();
//         for (TGreenLeavesReceiveDetail tGreenLeavesReceiveDetail : getGreenLeavesReceiveDetailsList) {
//             System.out.println("--------green leaves details-------");
//             System.out.println(tGreenLeavesReceiveDetail.getIndexNo());
//             System.out.println(tGreenLeavesReceiveDetail.getBranch());
//             System.out.println(tGreenLeavesReceiveDetail.getGreenLeavesReceive());
//             System.out.println(tGreenLeavesReceiveDetail.getSuperLeavesQuantity());
//             System.out.println(tGreenLeavesReceiveDetail.getNormalLeavesQuantity());
//             System.out.println(tGreenLeavesReceiveDetail.getClient());
//        }
         
        greenLeavesReceiveService.saveGreenLeaveReceiveDetails(greenLeavesReceive);
    }
    
}
