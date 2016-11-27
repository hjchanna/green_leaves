/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zmaster.client;

import com.mac.green_leaves.v1.green_leaves.zmaster.client.model.MClient;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



/**
 *
 * @author Mohan
 */
@CrossOrigin
@RestController
@RequestMapping("/api/v1/green-leaves/master/clients")
public class GLClientController {
    
    private static final Integer branch = 1;
    
    @Autowired
    private GLClientService clientService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MClient> listClients() {
        return clientService.findByBranch(branch);
    }
}
