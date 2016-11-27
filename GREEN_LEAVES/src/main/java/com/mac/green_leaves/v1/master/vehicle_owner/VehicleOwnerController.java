/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.vehicle_owner;

import com.mac.green_leaves.v1.master.vehicle_owner.model.MVehicleOwner;
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
 * @author Supervision
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/vehicle-owner")
public class VehicleOwnerController {

    @Autowired
    private VehicleOwnerService vehicleOwnerService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MVehicleOwner> findAll() {
        return vehicleOwnerService.findAll();
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public MVehicleOwner saveVehicleOwner(@RequestBody MVehicleOwner vehicleOwner) {
        return vehicleOwnerService.saveVehicleOwner(vehicleOwner);
    }

    @RequestMapping(value = "/delete-vehicle-owner/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteVehicleOwner(@PathVariable Integer indexNo) {
        System.out.println(indexNo);
        vehicleOwnerService.deleteVehicleOwner(indexNo);
        return indexNo;

    }
}
