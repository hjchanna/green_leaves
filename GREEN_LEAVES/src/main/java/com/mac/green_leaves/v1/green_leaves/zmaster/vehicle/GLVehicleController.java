/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zmaster.vehicle;

import com.mac.green_leaves.v1.green_leaves.zmaster.vehicle.model.MVehicle;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Mohan
 */
@RestController
@RequestMapping("/api/v1/green-leaves/vehicle")
public class GLVehicleController {
    
    private static final Integer branch = 1;
    
    @Autowired
    private GLVehicleService vehicleService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MVehicle> findAll() {
        return vehicleService.findVehicleByBranch(branch);
    }
    
}
