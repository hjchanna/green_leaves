/*
 *  GreenLeavesWeighController.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 20, 2016, 10:58:51 AM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.green_leaves.v1.transaction.green_leaves_weigh;

import com.mac.green_leaves.v1.transaction.green_leaves_weigh.model.TGreenLeaveWeigh;
import com.mac.green_leaves.v1.transaction.green_leaves_weigh.model.TGreenLeaveWeighDetail;
import java.math.BigDecimal;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/green-leaves/green-leaves-weigh")
public class GreenLeavesWeighController {

    @Autowired
    private GreenLeavesWeighService greenLeavesWeighService;

    private final Date DATE = new Date();
    private final Integer BRANCH = 1;
    private final Integer ROUTE = 1;

    @RequestMapping(value = "/{number}", method = RequestMethod.GET)
    public TGreenLeaveWeigh getSummary(@PathVariable Integer number) {
        return greenLeavesWeighService.getSummary(number);
    }
//

    @RequestMapping(value = "/save-summary", method = RequestMethod.POST)
    public Integer saveSummary(@RequestBody TGreenLeaveWeigh greenLeaveWeigh) {
        greenLeaveWeigh = greenLeavesWeighService.saveSummary(greenLeaveWeigh);
        return greenLeaveWeigh.getIndexNo();
    }

    @RequestMapping(value = "/insert-detail", method = RequestMethod.POST)
    public Integer insertWeigh(@RequestBody TGreenLeaveWeighDetail greenLeaveWeighDetail) {
        greenLeaveWeighDetail = greenLeavesWeighService.insertWeigh(greenLeaveWeighDetail);
        return greenLeaveWeighDetail.getIndexNo();
    }

    @RequestMapping(value = "/delete-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteWeigh(@PathVariable Integer indexNo) {
        greenLeavesWeighService.deleteWeigh(indexNo);
        return indexNo;
    }

    @RequestMapping(value = "/get-total-leaves", method = RequestMethod.POST)
    public Object[] getTotalLeaves(@RequestBody TGreenLeaveWeigh greenLeaveWeigh) { 
        return greenLeavesWeighService.getTotalSuperLeavesAndNormalLeaves(BRANCH, greenLeaveWeigh.getRoute(), greenLeaveWeigh.getDate());
    }
}
