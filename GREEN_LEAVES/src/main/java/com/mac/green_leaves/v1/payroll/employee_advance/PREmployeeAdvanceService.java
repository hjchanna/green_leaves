/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_advance;

import com.mac.green_leaves.v1.payroll.employee_advance.model.TEmployeeAdvanceRequest;
import com.mac.green_leaves.v1.payroll.employee_advance.model.TEmployeeAdvanceRequestDetails;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author L T430
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class PREmployeeAdvanceService {

    public static final String ADVANCE_REQUEST_STATUS_PENDING = "PENDING";
    public static final String ADVANCE_REQUEST_STATUS_APPROVED = "APPROVED";
    public static final String ADVANCE_REQUEST_STATUS_REJECTED = "REJECTED";

    @Autowired
    private PREmployeeAdvanceRequestRepository advanceRequestRepository;

    @Autowired
    private PREmployeeAdvanceRequestDetailRepository detailRepository;

    Integer saveAdvanceRequest(TEmployeeAdvanceRequest employeeAdvanceRequest) {

        employeeAdvanceRequest = advanceRequestRepository.save(employeeAdvanceRequest);
        return employeeAdvanceRequest.getNumber();
    }

    void saveAdvanceRequestDetails(List<TEmployeeAdvanceRequestDetails> detailsList,Integer advanceRequestIndex) {
        
        for (TEmployeeAdvanceRequestDetails detail : detailsList) {
            detail.setAdvanceRequest(advanceRequestIndex);
            detailRepository.save(detail);
        }
        
    }

}
