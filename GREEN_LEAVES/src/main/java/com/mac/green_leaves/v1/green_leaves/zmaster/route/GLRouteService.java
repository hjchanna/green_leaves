/*
 *  GLRouteService.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 11, 2016, 1:53:02 PM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.green_leaves.v1.green_leaves.zmaster.route;

import com.mac.green_leaves.v1.green_leaves.zmaster.route.model.MRoute;
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
public class GLRouteService {

    @Autowired
    private GLRouteRepository routeRepository;

    public List<MRoute> findByBranch(Integer branch) {
        return routeRepository.findByBranch(branch);
    }
}
