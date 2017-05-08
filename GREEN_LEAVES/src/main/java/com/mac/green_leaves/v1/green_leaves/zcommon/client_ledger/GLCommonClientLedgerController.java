/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger;

import com.mac.green_leaves.v1.zutil.SecurityUtil;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hjcha
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/green-leaves/common")
public class GLCommonClientLedgerController {

    @Autowired
    private GLCommonClientLedgerService clientInformationService;

    //common
    @RequestMapping(value = "/client-ledger/{client}/{date}", method = RequestMethod.GET)
    public List<Object[]> clientLedgerHistory(@PathVariable Integer client, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();

        return clientInformationService.clientLedgerHistory(client, date, branch);
    }

    @RequestMapping(value = "/receive-summary/{date}/{client}", method = RequestMethod.GET)
    public List<Object[]> findGreenLeavesReceiveSummary(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @PathVariable Integer client) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        return clientInformationService.findGreenLeavesReceiveSummary(branch, date, client);
    }
}
