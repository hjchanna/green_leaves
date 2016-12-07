/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.main_Distribution;

import com.mac.green_leaves.v1.master.main_Distribution.model.MMainDistribution;
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
 * @author kalum
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/main-distribution")
public class MainDistributionController {
    @Autowired
    private MainDistributionService mainDistributionService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MMainDistribution> findAllMainDistribution() {
        return mainDistributionService.findAllMainDistribution();
    }

    
    @RequestMapping(value = "/save-main-distribution", method = RequestMethod.POST)
    public MMainDistribution saveMainDistribution(@RequestBody MMainDistribution mMainDistribution) {
        return mainDistributionService.saveMainDistribution(mMainDistribution);
    }
    
    @RequestMapping(value = "/delete-main-distribution/{indexNo}", method = RequestMethod.DELETE)
    public void deleteMainDistribution(@PathVariable Integer indexNo) {
        mainDistributionService.deleteMainDistribution(indexNo);
    }
    
}
