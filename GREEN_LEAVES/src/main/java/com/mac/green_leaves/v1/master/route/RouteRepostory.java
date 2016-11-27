/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.route;

import com.mac.green_leaves.v1.master.route.model.MRoute;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Nidura Prageeth
 */
public interface RouteRepostory extends JpaRepository<MRoute, Serializable>{

    public List<MRoute> findByName(String name);
    
}
