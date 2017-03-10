/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.green_leaves_supplier_weigh;

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
 * @author hjcha
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/green-leaves/green-leaves-supplier-weigh")
public class GLGreenLeavesSupplierWeighController {

    @Autowired
    private GLGreenLeavesSupplierWeighService greenLeavesSupplierWeighService;

    @RequestMapping(value = "/{number}/{type}", method = RequestMethod.GET)
    public TGreenLeavesWeigh getSummary(@PathVariable Integer number, @PathVariable String type) {
        return greenLeavesSupplierWeighService.getSummary(SecurityUtil.getCurrentUser().getBranch(), number, type);
    }

    @RequestMapping(value = "/find-pending-weigh", method = RequestMethod.GET)
    public List<TGreenLeavesWeigh> findPendingWeighByWeighBranchAndType() {
        return greenLeavesSupplierWeighService.findPendingWeighByWeighBranchAndType(SecurityUtil.getCurrentUser().getBranch());
    }

    @RequestMapping(value = "/save-weigh", method = RequestMethod.POST)
    public Integer saveSummary(@RequestBody TGreenLeavesWeigh greenLeaveWeigh) {
        greenLeaveWeigh = greenLeavesSupplierWeighService.saveSummary(greenLeaveWeigh, SecurityUtil.getCurrentUser().getBranch());
        return greenLeaveWeigh.getIndexNo();
    }

    @RequestMapping(value = "/insert-detail/{weighIndexNo}", method = RequestMethod.POST)
    public Integer insertWeigh(@PathVariable Integer weighIndexNo, @RequestBody TGreenLeavesWeighDetail greenLeaveWeighDetail) {
        greenLeaveWeighDetail = greenLeavesSupplierWeighService.insertWeigh(weighIndexNo, greenLeaveWeighDetail);
        return greenLeaveWeighDetail.getIndexNo();
    }

    @RequestMapping(value = "/delete-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteWeigh(@PathVariable Integer indexNo) {
        greenLeavesSupplierWeighService.deleteWeigh(indexNo);
        return indexNo;
    }

    @RequestMapping(value = "/approve-weigh/{indexNo}", method = RequestMethod.GET)
    public Integer confirmWeigh(@PathVariable Integer indexNo) {
        greenLeavesSupplierWeighService.approveWeigh(indexNo);
        return indexNo;
    }

    @RequestMapping(value = "/delete-green-leaves-weigh/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteGreenLeavesReceive(@PathVariable Integer indexNo) {
        greenLeavesSupplierWeighService.deleteGreenLeavesReceive(indexNo);
        return indexNo;
    }
}
