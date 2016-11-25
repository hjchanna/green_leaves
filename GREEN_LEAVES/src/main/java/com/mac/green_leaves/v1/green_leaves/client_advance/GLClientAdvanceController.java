/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_advance;

import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequest;
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
@RestController
@CrossOrigin
@RequestMapping("/api/green-leaves/client-advance")
public class GLClientAdvanceController {

    private static final int branch = 1;

    @Autowired
    private GLClientAdvanceService clientAdvanceService;

    @RequestMapping(value = "/{number}", method = RequestMethod.GET)
    public TClientAdvanceRequest getAdvanceRequestByNumber(@PathVariable Integer number) {
        return clientAdvanceService.getAdvanceRequestByNumber(number, branch);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Integer saveAdvanceRequest(@RequestBody TClientAdvanceRequest advanceRequest) {
        return clientAdvanceService.saveAdvanceRequest(advanceRequest, branch);
    }

    @RequestMapping(value = "/delete/{indexNo}", method = RequestMethod.DELETE)
    public void deleteAdvanceRequest(@PathVariable Integer indexNo) {
        clientAdvanceService.deleteAdvanceRequest(indexNo);
    }

    @RequestMapping(value = "/delete-detail/{indexNo}", method = RequestMethod.DELETE)
    public void deleteAdvanceRequestDetail(@PathVariable Integer indexNo) {
        clientAdvanceService.deleteAdvanceRequestDetail(indexNo);
    }

    @RequestMapping(value = "/pending-requests")
    public List<TClientAdvanceRequest> getPendingAdvanceRequests() {
        return clientAdvanceService.getPendingAdvanceRequests(branch);
    }
}
