/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger;

import com.mac.green_leaves.v1.zexception.EntityNotFoundException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hjcha
 */
@Service
public class GLCommonClientLedgerService {

    @Autowired
    private GLCommonClientLedgerRepository clientInformationRepository;

    public List<Object[]> clientLedgerHistory(Integer client, Date asAtDate, Integer branch) {
        Calendar c = Calendar.getInstance();
        c.setTime(asAtDate);

        c.set(Calendar.DATE, c.getActualMinimum(Calendar.DATE));
        Date fromDate = c.getTime();

        c.set(Calendar.DATE, c.getActualMaximum(Calendar.DATE));
        Date toDate = c.getTime();

        return clientInformationRepository.clientLedgerHistory(client, fromDate, toDate, branch);
    }

    public List<Object[]> findGreenLeavesReceiveSummary(Integer branch, Date date, Integer client) {
        List<Object[]> advanceRequests = clientInformationRepository.findGreenLeavesReceiveSummary(branch, date, client);
        if (advanceRequests.isEmpty()) {
            throw new EntityNotFoundException("Green Leaves Client Request Not Found");
        }
        return advanceRequests;
    }
}
