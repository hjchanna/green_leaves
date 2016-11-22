/*
 *  RouteService.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 11, 2016, 1:53:02 PM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.green_leaves.v1.transaction.zmaster.route;

import com.mac.green_leaves.v1.exception.DuplicateEntityException;
import com.mac.green_leaves.v1.transaction.zmaster.route.model.MRoute;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Mohan
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    public List<MRoute> findAll() {
        return routeRepository.findAll();
    }

    public List<MRoute> findByBranch(Integer branch) {
        return routeRepository.findByBranch(branch);
    }

    public MRoute findByName(String name) {
        List<MRoute> routes = routeRepository.findByName(name);
        if (routes.isEmpty()) {
            return null;
        }
        return routes.get(0);
    }

    public MRoute saveRoute(MRoute route) {
        MRoute mRoute = findByName(route.getName());
        if (mRoute == null) {
            return routeRepository.save(route);
        } else {
            if (mRoute.getIndexNo().equals(route.getIndexNo())) {//is update get update Object?
                return route;
            }
            throw new DuplicateEntityException("route already exists");
        }
    }

    public void deleteRoute(Integer indexNo) {
        routeRepository.delete(indexNo);
    }

}