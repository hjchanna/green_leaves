/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.sub_Distribution;

import com.mac.green_leaves.v1.master.sub_Distribution.model.MSubDistribution;
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
@RequestMapping("/api/green-leaves/master/sub-distribution")
public class SubDistributionController {
    @Autowired
    private SubDistributionService subDistributionService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MSubDistribution> findAllSubDistribution() {
        return subDistributionService.findAllSubDistribution();
    }

    
    @RequestMapping(value = "/save-sub-distribution", method = RequestMethod.POST)
    public MSubDistribution saveSubDistribution(@RequestBody MSubDistribution mSubDistribution) {
        return subDistributionService.saveSubDistribution(mSubDistribution);
    }
    
    @RequestMapping(value = "/delete-sub-distribution/{indexNo}", method = RequestMethod.DELETE)
    public void deleteSubDistribution(@PathVariable Integer indexNo) {
        subDistributionService.deleteSubDistribution(indexNo);
    }
    
}
