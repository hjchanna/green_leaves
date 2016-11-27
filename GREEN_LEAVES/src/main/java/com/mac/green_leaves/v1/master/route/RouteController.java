/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.route;

import com.mac.green_leaves.v1.master.route.model.MRoute;
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
 * @author Nidura Prageeth
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/routes")
public class RouteController {
    @Autowired
    private RouteService routeService;
    
    @RequestMapping (method = RequestMethod.GET)
    public List<MRoute> findAll() {
        return routeService.findAll();
    }

    @RequestMapping(value = "/save-route", method = RequestMethod.POST)
    public MRoute saveRoute(@RequestBody MRoute mRoute) {
        return routeService.saveRoute(mRoute);
    }

    @RequestMapping(value = "/delete-route/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteRoute(@PathVariable Integer indexNo) {
        System.out.println(indexNo + "sssssssssssssssssssssssssssssssss");
        routeService.deleteRoute(indexNo);
        return indexNo;
    }
    
    
}
