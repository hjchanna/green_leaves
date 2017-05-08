/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_advance;

import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequest;
import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequestDetail;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
@RequestMapping("/api/v1/green-leaves/client-advance")
public class GLClientAdvanceController {

    @Autowired
    private GLClientAdvanceService clientAdvanceService;

    //request
    @RequestMapping(value = "/{number}", method = RequestMethod.GET)
    public TClientAdvanceRequest getAdvanceRequestByNumber(@PathVariable Integer number) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();

        return clientAdvanceService.getAdvanceRequestByNumber(number, branch);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Integer saveAdvanceRequest(@RequestBody TClientAdvanceRequest advanceRequest) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();

        System.out.println(advanceRequest.getDate() + "--------------");
        for (TClientAdvanceRequestDetail clientAdvanceRequestDetail : advanceRequest.getClientAdvanceRequestDetails()) {
            System.out.println(clientAdvanceRequestDetail.getAmount() + "-----------------");
        }

        return clientAdvanceService.saveAdvanceRequest(advanceRequest, branch);
    }

    @RequestMapping(value = "/delete/{indexNo}", method = RequestMethod.DELETE)
    public void deleteAdvanceRequest(@PathVariable Integer indexNo) {
        clientAdvanceService.deleteAdvanceRequest(indexNo);
    }

    @RequestMapping(value = "/delete-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteAdvanceRequestDetail(@PathVariable Integer indexNo) {
        clientAdvanceService.deleteAdvanceRequestDetail(indexNo);
        return indexNo;
    }

//    approve ------------------------------------------------------------------
    @RequestMapping(value = "/pending-requests")
    public List<Object[]> getPendingAdvanceRequests() {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        return clientAdvanceService.getPendingAdvanceRequests(branch);
    }

    @RequestMapping(value = "/pending-requests-by-route/{route}")
    public List<TClientAdvanceRequest> getPendingAdvanceRequests(@PathVariable Integer route) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        return clientAdvanceService.getPendingAdvanceRequests(branch, route);
    }

    @RequestMapping(value = "/approve-request-detail/{indexNo}")
    public void approveAdvanceRequestDetail(@PathVariable Integer indexNo) {
        clientAdvanceService.approveAdvanceRequestDetail(indexNo);
    }

    @RequestMapping(value = "/update-request-amount/{indexNo}/{amount}")
    public void approveAdvanceRequestDetail(@PathVariable Integer indexNo, @PathVariable BigDecimal amount) {
        clientAdvanceService.updateAdvanceRequestAmount(indexNo, amount);
    }

    @RequestMapping(value = "/reject-request-detail/{indexNo}")
    public void rejectAdvanceRequestDetail(@PathVariable Integer indexNo) {
        clientAdvanceService.rejectAdvanceRequestDetail(indexNo);
    }
}
