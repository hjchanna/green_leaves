/*
 *  GLGreenLeavesReceiveController.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 25, 2016, 9:32:28 AM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_receive;

import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceive;
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
public class GLGreenLeavesReceiveController {

    @Autowired
    private GLGreenLeavesReceiveService greenLeavesReceiveService;

    @RequestMapping(value = "/save-green-leaves-receive", method = RequestMethod.POST)
    public TGreenLeavesReceive saveGreenLeavesReceive(@RequestBody TGreenLeavesReceive greenLeavesReceive) {
        greenLeavesReceive.setNumber(1);
        greenLeavesReceive.setTransaction(1);
        System.out.println(greenLeavesReceive);
        return greenLeavesReceiveService.saveGreenLeaveReceiveDetails(greenLeavesReceive);
    }

}
