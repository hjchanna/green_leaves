/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.client_advance;

import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequest;
import com.mac.green_leaves.v1.green_leaves.client_advance.model.TransactionType;
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

    private static final int BRANCH = 1;

    @Autowired
    private GLClientAdvanceService clientAdvanceService;

    @RequestMapping(value = "/{number}", method = RequestMethod.GET)
    public TClientAdvanceRequest getAdvanceRequestByNumber(@PathVariable Integer number) {
        return clientAdvanceService.getAdvanceRequestByNumber(number, BRANCH);
    }

    @RequestMapping(value = "/find-by/{route}/{date}", method = RequestMethod.GET)
    public TClientAdvanceRequest findByRouteAndDate(@PathVariable Integer route, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return clientAdvanceService.findByBranchAndRouteAndDate(BRANCH, route, date);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Integer saveAdvanceRequest(@RequestBody TClientAdvanceRequest advanceRequest) {
        return clientAdvanceService.saveAdvanceRequest(advanceRequest, BRANCH);
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
    public List<TClientAdvanceRequest> getPendingAdvanceRequests() {
        return clientAdvanceService.getPendingAdvanceRequests(BRANCH);
    }

    @RequestMapping(value = "/approve-request-detail/{indexNo}")
    public void approveAdvanceRequestDetail(@PathVariable Integer indexNo) {
        clientAdvanceService.approveAdvanceRequestDetail(indexNo);
    }

    @RequestMapping(value = "/reject-request-detail/{indexNo}")
    public void rejectAdvanceRequestDetail(@PathVariable Integer indexNo) {
        clientAdvanceService.rejectAdvanceRequestDetail(indexNo);
    }

    // slide bar client history
    @RequestMapping(value = "/find-client-account-transaction-history/{date}/{client}")
    List<Object[]> findByBranchAndDateAndClient(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @PathVariable Integer client) {
        return clientAdvanceService.findByBranchAndDateAndClient(BRANCH, date, client);
    }

    // bootom route and year and month wise route totatal summry
    @RequestMapping(value = "/find-client-wise-receive-history/{route}/{date}/{client}")
    List<Object[]> findByDateAndRoute(@PathVariable Integer route, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @PathVariable Integer client) {
        return clientAdvanceService.findByBranchAndRouteDateAndClient(BRANCH, route, date, client);
    }

    @RequestMapping(value = "/transaction-type")
    List<TransactionType> findByBranchAndDateAndClient() {
        return clientAdvanceService.findTransactionTypeAll();
    }

}
