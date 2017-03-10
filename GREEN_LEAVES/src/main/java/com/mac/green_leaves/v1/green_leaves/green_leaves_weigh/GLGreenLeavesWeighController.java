/*
 *  GLGreenLeavesWeighController.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 20, 2016, 10:58:51 AM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_weigh;

import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeigh;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeighDetail;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
import java.util.List;
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
@RequestMapping("/api/v1/green-leaves/green-leaves-weigh")
public class GLGreenLeavesWeighController {

    @Autowired
    private GLGreenLeavesWeighService greenLeavesWeighService;

    @RequestMapping(value = "/{branch}/{number}/{type}", method = RequestMethod.GET)
    public TGreenLeavesWeigh getSummary(@PathVariable Integer number, @PathVariable Integer branch, @PathVariable String type) {
        return greenLeavesWeighService.getSummary(branch, number, type);
    }

    @RequestMapping(value = "/find-pending-weigh/{type}", method = RequestMethod.GET)
    public List<TGreenLeavesWeigh> findPendingWeighByWeighBranchAndType(@PathVariable String type) {
        return greenLeavesWeighService.findPendingWeighByWeighBranchAndType(SecurityUtil.getCurrentUser().getBranch(), type);
    }

    @RequestMapping(value = "/save-weigh", method = RequestMethod.POST)
    public Integer saveSummary(@RequestBody TGreenLeavesWeigh greenLeaveWeigh) {
        greenLeaveWeigh = greenLeavesWeighService.saveSummary(greenLeaveWeigh, SecurityUtil.getCurrentUser().getBranch());
        return greenLeaveWeigh.getIndexNo();
    }

    @RequestMapping(value = "/delete-green-leaves-weigh/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteGreenLeavesReceive(@PathVariable Integer indexNo) {
        greenLeavesWeighService.deleteGreenLeavesReceive(indexNo);
        return indexNo;
    }

    @RequestMapping(value = "/approve-weigh/{indexNo}", method = RequestMethod.GET)
    public Integer confirmWeigh(@PathVariable Integer indexNo) {
        greenLeavesWeighService.approveWeigh(indexNo);
        return indexNo;
    }

    @RequestMapping(value = "/insert-detail/{weighIndexNo}", method = RequestMethod.POST)
    public Integer insertWeigh(@PathVariable Integer weighIndexNo, @RequestBody TGreenLeavesWeighDetail greenLeaveWeighDetail) {
        greenLeaveWeighDetail = greenLeavesWeighService.insertWeigh(weighIndexNo, greenLeaveWeighDetail);
        return greenLeaveWeighDetail.getIndexNo();
    }

    @RequestMapping(value = "/delete-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteWeigh(@PathVariable Integer indexNo) {
        greenLeavesWeighService.deleteWeigh(indexNo);
        return indexNo;
    }

//    @RequestMapping(value = "/find-weight-by/{branch}/{route}/{date}", method = RequestMethod.GET)
//    public TGreenLeavesWeigh getSummaryBranchAndRouteAndDate(@PathVariable Integer branch, @PathVariable Integer route, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
//        return greenLeavesWeighService.findByBranchAndRouteAndDate(branch, route, date);
//    }
//
//    @RequestMapping(value = "/find-weight/{branch}/{date}/{client}", method = RequestMethod.GET)
//    public TGreenLeavesWeigh getSummaryBranchAndDateAndClient(@PathVariable Integer branch, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @PathVariable Integer client) {
//        return greenLeavesWeighService.findByBranchAndDateAndClient(branch, date, client);
//    }
}
