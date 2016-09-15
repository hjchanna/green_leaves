/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.green_leaves_receive;

import com.mac.gl.system.http.HttpRespondBuilder;
import com.mac.gl.system.http.HttpRespondModel;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.http.request.FactoryQuantityRequest;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.MClient;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.MEmployee;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.MRoute;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetails;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesWeighDetails;
import java.sql.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Don
 */
@RestController
@RequestMapping("/api/green-leaves/green-leaves-receive")
public class GreenLeavesReceiveController {

    @Autowired
    private GreenLeavesReceiveService greenLeavesReceiveService;

    private static final int branch = 1;
    private static final int route = 2;
    private static final Date date = java.sql.Date.valueOf("2016-09-13");

    //Returns all active routes
    @RequestMapping(value = "/routes", method = RequestMethod.GET)
    public HttpRespondModel allRoutes() {
        List<MRoute> routeResponds = greenLeavesReceiveService.getRoutes(branch);
        return HttpRespondBuilder.successRespond(routeResponds);
    }

    //Returns all active route officers
    @RequestMapping(value = "/route-officers", method = RequestMethod.GET)
    public HttpRespondModel routeOfficers() {
        List<MEmployee> employeeResponds = greenLeavesReceiveService.getRouteOfficers();
        return HttpRespondBuilder.successRespond(employeeResponds);
    }

    //Returns all active route helper
    @RequestMapping(value = "/route-helpers", method = RequestMethod.GET)
    public HttpRespondModel routeHelpers() {
        List<MEmployee> routeResponds = greenLeavesReceiveService.getHelpers();
        return HttpRespondBuilder.successRespond(routeResponds);
    }

    //Returns all active green leaves suppliers
    @RequestMapping(value = "/clients", method = RequestMethod.GET)
    public HttpRespondModel clients() {
        List<MClient> clientRespond = greenLeavesReceiveService.getSuppliers();
        return HttpRespondBuilder.successRespond(clientRespond);
    }

    //Returns total green leaves weigh summary for specified date and route
    @RequestMapping(value = "/factory-quantity", method = RequestMethod.POST)
    public HttpRespondModel factoryQuantity(@RequestBody FactoryQuantityRequest factoryQtyRequest) {
        TGreenLeavesWeighDetails greenLeavesWeighDetails = greenLeavesReceiveService.getTotalLeavesWeighByNormalLeavesAndSuperLeaves(factoryQtyRequest.getRoute(), factoryQtyRequest.getDate(), branch);
        return HttpRespondBuilder.successRespond(greenLeavesWeighDetails);
    }

    //Returns green leaves receive information for specified date and route
    @RequestMapping(value = "/get", method = RequestMethod.POST)
    public HttpRespondModel get(@RequestBody FactoryQuantityRequest factoryQtyRequest) {
        List<TGreenLeavesReceiveDetails> tGreenLeavesReceiveDetails = greenLeavesReceiveService.getLeavesInfoMaction(factoryQtyRequest.getRoute(), factoryQtyRequest.getDate(), branch);
        return HttpRespondBuilder.successRespond(tGreenLeavesReceiveDetails);
    }

//    //Save or update green leaves receive information
//    @RequestMapping(value = "/save-or-update", method = RequestMethod.POST)
//    public void saveOrUpdate(@RequestBody SaveOrUpdateGreenLeavesReceive saveOrUpdateGreenLeavesReceive) {
//        boolean saveOrUpdate = greenLeavesReceiveService.updateTGreenLeavesReceiveDetails(saveOrUpdateGreenLeavesReceive);
//        if (saveOrUpdate) {
//            System.out.println("saveOrUpdate sucsses");
//        } else {
//            System.out.println("saveOrUpdate fail");
//        }
//    }
}
