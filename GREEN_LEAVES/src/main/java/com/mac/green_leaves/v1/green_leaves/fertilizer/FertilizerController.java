/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.fertilizer;

import com.mac.green_leaves.v1.green_leaves.fertilizer.model.TFertilizer;
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

    @RequestMapping(method = RequestMethod.GET)
    public List<TFertilizer> gelAll() {
        return fertilizerService.gelAll();
    }

    @RequestMapping(value = "/{date}/{number}", method = RequestMethod.GET)
    public TFertilizer getFertilizer(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @PathVariable Integer number) {
        return fertilizerService.getFertilizer(date, number);
    }

    @RequestMapping(value = "/save-fertilizer", method = RequestMethod.POST)
    public Integer saveFertilizer(@RequestBody TFertilizer fertilizer) {
        fertilizer.setTransaction(1);
        fertilizer.setBranch(1);
        System.out.println(fertilizer);
        return fertilizerService.saveFertilizer(fertilizer);
    }

    @RequestMapping(value = "/delete-fertilizer/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteFertilizer(@PathVariable Integer indexNo) {
        fertilizerService.deleteFertilizer(indexNo);
        return indexNo;
    }
    
    @RequestMapping(value = "/approve-or-reject-fertilizer/{indexNo}/{status}", method = RequestMethod.GET)
    public Integer approveFertilizer(@PathVariable Integer indexNo,@PathVariable String status) {
        fertilizerService.approveOrRejectFertilizer(indexNo, status);
        return indexNo;
    }

    @RequestMapping(value = "/pending-route-vise-fertilizer", method = RequestMethod.GET)
    public List<Object[]> getPendingRequestByRouteVise() {
        return fertilizerService.getPendingRequestBtROuteOfficer(1);
    }
    
    @RequestMapping(value = "/pending-fertilizer/{routeOfficer}", method = RequestMethod.GET)
    public List<TFertilizer> getPendingRequest(@PathVariable Integer routeOfficer) {
        return fertilizerService.getPendingRequestByBranchAndROuteOfficer(1,routeOfficer);
    }
}
