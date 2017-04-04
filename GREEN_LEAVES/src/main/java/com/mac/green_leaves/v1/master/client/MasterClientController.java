/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.client;

import com.mac.green_leaves.v1.master.client.model.MClient;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
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
 * @author Don
 */
@CrossOrigin
@RestController
@RequestMapping("/api/v1/green-leaves/clients")
public class MasterClientController {

    @Autowired
    private MasterClientService clientService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MClient> listClients() {
        return clientService.findByBranch(1);
    }

    @RequestMapping(value = "/save-client", method = RequestMethod.POST)
    public MClient saveSupplier(@RequestBody MClient client) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        client.setBranch(branch);
        return clientService.saveSupplier(client);
    }

    @RequestMapping(value = "/delete-client/{indexNo}", method = RequestMethod.DELETE)
    public void deleteSupplier(@PathVariable Integer indexNo) {
        clientService.deleteSupplier(indexNo);
    }

    @RequestMapping(value = "/next-client-number", method = RequestMethod.GET)
    public Integer getMaximumNumberByBranch() {
        return clientService.getMaximumNumberByBranch(1);
    }

}
