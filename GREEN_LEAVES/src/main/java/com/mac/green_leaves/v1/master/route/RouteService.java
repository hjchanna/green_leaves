/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.route;

import com.mac.green_leaves.v1.master.route.model.MRoute;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Nidura Prageeth
 */
@Service
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class RouteService {

    @Autowired
    RouteRepostory routeRepostory;

    public List<MRoute> findAll() {
        return routeRepostory.findAll();
    }

    public MRoute findByName(String name) {
        List<MRoute> routeList = routeRepostory.findByName(name);
        if (routeList.isEmpty()) {
            return null;
        }
        return routeList.get(0);
    }

    public MRoute saveRoute(MRoute mRoute) {
        MRoute findByName = findByName(mRoute.getName());

        if (findByName == null) {//is'nt already exsist by name
            return routeRepostory.save(mRoute);
        } else {//is already exsist by name
            if (findByName.getIndexNo().equals(mRoute.getIndexNo())) {//is update get update Object?
                return mRoute;
            }
            throw new RuntimeException("duplicate");
        }
    }

    public void deleteRoute(Integer indexNo) {
        routeRepostory.delete(indexNo);
    }

}
