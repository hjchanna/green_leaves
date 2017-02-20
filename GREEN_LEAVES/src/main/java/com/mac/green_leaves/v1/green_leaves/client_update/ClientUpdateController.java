/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_update;

import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceive;
import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetail;
import com.mac.green_leaves.v1.green_leaves.green_leaves_weigh.model.TGreenLeavesWeigh;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Don
 */
@CrossOrigin
@RestController
@RequestMapping("/api/v1/green-leaves/client-update")
public class ClientUpdateController {

    @Autowired
    private ClientUpdateService clientUpdateService;

    @RequestMapping(value = "/green-leaves-receive",method = RequestMethod.GET)
    public List<TGreenLeavesReceiveDetail> remarkGreenLeavesReceives() {
        return clientUpdateService.remarkGreenLeavesReceives();
    }
    @RequestMapping(value = "/green-leaves-weigh",method = RequestMethod.GET)
    public List<TGreenLeavesWeigh> remarkGreenLeavesWeigh() {
        return clientUpdateService.remarkGreenLeavesWeigh();
    }
}
