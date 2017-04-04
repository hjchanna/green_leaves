/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zmaster.vehicle;

import com.mac.green_leaves.v1.green_leaves.zmaster.vehicle.model.MVehicle;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Mohan
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/green-leaves/master/vehicles")
public class GLVehicleController {

    @Autowired
    private GLVehicleService vehicleService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MVehicle> findAll() {
        return vehicleService.findVehicleByBranch(SecurityUtil.getCurrentUser().getBranch());
    }

    @RequestMapping(value = "/{branch}", method = RequestMethod.GET)
    public List<MVehicle> findAll(@PathVariable Integer branch) {
        return vehicleService.findVehicleByBranch(branch);
    }

}
