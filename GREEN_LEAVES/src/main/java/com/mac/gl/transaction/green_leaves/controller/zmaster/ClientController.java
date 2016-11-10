/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.controller.zmaster;

import com.mac.gl.transaction.green_leaves.model.zmaster.MClient;
import com.mac.gl.transaction.green_leaves.service.zmaster.ClientService;
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
 * @author Mohan
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/clients")
public class ClientController {
    
    @Autowired
    private ClientService clientService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MClient> listClients() {
        return clientService.findByBranch(1);
    }
    
    @RequestMapping(value = "/save-client", method = RequestMethod.POST)
    public MClient saveSupplier(@RequestBody MClient client) {
        client.setBranch(1);
        return clientService.saveSupplier(client);
    }
    
    @RequestMapping(value = "/delete-client/{indexNo}", method = RequestMethod.DELETE)
    public void deleteSupplier(@PathVariable Integer indexNo) {
        clientService.deleteSupplier(indexNo);
    }
    
}
