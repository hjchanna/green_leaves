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
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
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
@RequestMapping("/api/v1/green-leaves/green-leaves-receive")
public class GLGreenLeavesReceiveController {

    @Autowired
    private GLGreenLeavesReceiveService greenLeavesReceiveService;

    @RequestMapping(value = "/{branch}/{number}", method = RequestMethod.GET)
    public TGreenLeavesReceive getReceive(@PathVariable Integer number, @PathVariable Integer branch) {
        return greenLeavesReceiveService.getReceive(branch, number);
    }

    @RequestMapping(value = "find-by/{branch}/{route}/{date}", method = RequestMethod.GET)
    public TGreenLeavesReceive findByBranchAndRouteAndDate(@PathVariable Integer branch, @PathVariable Integer route, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return greenLeavesReceiveService.findByBranchAndRouteAndDate(branch, route, date);
    }

    @RequestMapping(value = "/save-receive", method = RequestMethod.POST)
    public Integer saveReceive(@RequestBody TGreenLeavesReceive greenLeavesReceive) {
        System.out.println(greenLeavesReceive);
        return greenLeavesReceiveService.saveGreenLeaveReceiveDetails(greenLeavesReceive);
    }

    @RequestMapping(value = "/get-factory-quantity/{route}/{date}/{branch}", method = RequestMethod.GET)
    public Object[] getTotalSuperLeavesAndNormalLeaves(@PathVariable Integer route, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @PathVariable Integer branch) {
        return greenLeavesReceiveService.getTotalSuperLeavesAndNormalLeaves(branch, route, date);
    }

    @RequestMapping(value = "/delete-green-leaves-receive/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteGreenLeavesReceive(@PathVariable Integer indexNo) {
        greenLeavesReceiveService.deleteGreenLeavesReceive(indexNo);
        return indexNo;
    }

    @RequestMapping(value = "/delete-green-leaves-receive-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteGreenLeavesReceiveDetail(@PathVariable Integer indexNo) {
        greenLeavesReceiveService.deleteGreenLeavesReceiveDetail(indexNo);
        return indexNo;
    }
}
