/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.fertilizer;

import com.mac.green_leaves.v1.green_leaves.fertilizer.model.TFertilizer;
import com.mac.green_leaves.v1.green_leaves.fertilizer.model.TFertilizerDetail;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
import java.util.Date;
import java.util.List;
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
 * @author Don
 */
@CrossOrigin
@RestController
@RequestMapping("/api/v1/green-leaves/fertilizer")
public class FertilizerController {

    @Autowired
    private FertilizerService fertilizerService;

    @RequestMapping(value = "/{number}", method = RequestMethod.GET)
    public TFertilizer getFertilizer(@PathVariable Integer number) {
        return fertilizerService.getFertilizer(number);
    }

    @RequestMapping(value = "/save-fertilizer", method = RequestMethod.POST)
    public Integer saveFertilizer(@RequestBody TFertilizer fertilizer) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        fertilizer.setBranch(branch);
        return fertilizerService.saveFertilizer(fertilizer);
    }

//    @RequestMapping(value = "/delete-fertilizer/{indexNo}", method = RequestMethod.DELETE)
//    public Integer deleteFertilizer(@PathVariable Integer indexNo) {
//        fertilizerService.deleteFertilizer(indexNo);
//        return indexNo;
//    }

    @RequestMapping(value = "/delete-fertilizer-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteGreenLeavesReceiveDetail(@PathVariable Integer indexNo) {
        fertilizerService.deleteFertilizerDetail(indexNo);
        return indexNo;
    }

    @RequestMapping(value = "/approve-or-reject-fertilizer/{indexNo}/{status}", method = RequestMethod.GET)
    public Integer approveFertilizer(@PathVariable Integer indexNo, @PathVariable String status) {
        fertilizerService.approveOrRejectFertilizer(indexNo, status);
        return indexNo;
    }

    @RequestMapping(value = "/pending-fertilizer-request", method = RequestMethod.GET)
    public List<Object[]> getPendingRequest() {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        return fertilizerService.getPendingFertilizerRequests(branch);
    }

    @RequestMapping(value = "/pending-fertilizer-request-details/{date}", method = RequestMethod.GET)
    public List<TFertilizerDetail> getPendingRequestDataByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return fertilizerService.getPendingRequestDataByDate(date);
    }

}
