/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.green_leaves_receive;

import com.mac.gl.system.http.HttpRespondBuilder;
import com.mac.gl.system.http.HttpRespondModel;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.http.request.FactoryQtyRequest;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.MClient;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.MEmployee;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.MRoute;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetails;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesWeighDetail;
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
    private static final String type = "";

    //Returns all active routes
    @RequestMapping(value = "/routes", method = RequestMethod.GET)
    public HttpRespondModel allRoutes() {
        List<MRoute> routeResponds = greenLeavesReceiveService.getRoutes(branch);
        return HttpRespondBuilder.successRespond(routeResponds);
    }

    //Returns all active route officers
    @RequestMapping(value = "/route-officers", method = RequestMethod.GET)
    public HttpRespondModel routeOfficers() {
        List<MEmployee> employeeResponds = greenLeavesReceiveService.getRouteOfficers(branch, type);
        return HttpRespondBuilder.successRespond(employeeResponds);
    }

    //Returns all active route helper
    @RequestMapping(value = "/route-helpers", method = RequestMethod.GET)
    public HttpRespondModel routeHelpers() {
        List<MEmployee> routeResponds = greenLeavesReceiveService.getRouteOfficers(branch, type);
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
    public HttpRespondModel factoryQuantity(@RequestBody FactoryQtyRequest factoryQtyRequest) {
        TGreenLeavesWeighDetail tGreenLeavesWeighDetail = greenLeavesReceiveService.getTotalLeavesWeighByNormalLeavesAndSuperLeaves(factoryQtyRequest.getRoute(), factoryQtyRequest.getDate(), branch);
        return HttpRespondBuilder.successRespond(tGreenLeavesWeighDetail);
    }

    //Returns green leaves receive information for specified date and route
    @RequestMapping(value = "/get", method = RequestMethod.POST)
    public HttpRespondModel get(@RequestBody FactoryQtyRequest factoryQtyRequest) {
        List<TGreenLeavesReceiveDetails> tGreenLeavesReceiveDetails = greenLeavesReceiveService.getLeavesInfoMaction(factoryQtyRequest.getRoute(), factoryQtyRequest.getDate(), branch);
        return HttpRespondBuilder.successRespond(tGreenLeavesReceiveDetails);
    }

    //Save or update green leaves receive information
    @RequestMapping(value = "/save-or-update", method = RequestMethod.POST)
    public void saveOrUpdate(@RequestBody TGreenLeavesReceiveDetails tGreenLeavesReceiveDetails) {
        boolean saveOrUpdate = greenLeavesReceiveService.updateTGreenLeavesReceiveDetails(tGreenLeavesReceiveDetails);
        if (saveOrUpdate) {
            System.out.println("saveOrUpdate sucsses");
        } else {
            System.out.println("saveOrUpdate fail");
        }
    }
}
