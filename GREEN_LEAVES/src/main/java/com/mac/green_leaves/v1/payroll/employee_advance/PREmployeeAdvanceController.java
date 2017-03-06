/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_advance;

import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequest;
import com.mac.green_leaves.v1.green_leaves.client_advance.model.TClientAdvanceRequestDetail;
import com.mac.green_leaves.v1.payroll.employee_advance.model.TEmployeeAdvanceRequest;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author L T430
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/green-leaves/employee-advance")
public class PREmployeeAdvanceController {

    @Autowired
    private PREmployeeAdvanceService advanceService;
    
    @Autowired
    private PREmployeeAdvanceRequestRepository advanceRequestRepository;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Integer saveAdvanceRequest(@RequestBody TEmployeeAdvanceRequest employeeAdvanceRequest) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        TEmployeeAdvanceRequest findLastRow = advanceRequestRepository.findFirst1ByOrderByIndexNoDesc();
        
        employeeAdvanceRequest.setNumber(1);
        if (findLastRow!=null) {
            employeeAdvanceRequest.setNumber(findLastRow.getNumber()+1);
        }
        employeeAdvanceRequest.setBranch(branch);
        
        Integer advanceRequestIndex = advanceService.saveAdvanceRequest(employeeAdvanceRequest);
        
        advanceService.saveAdvanceRequestDetails(employeeAdvanceRequest.getTEmployeeAdvanceRequestDetailsList(),advanceRequestIndex);
        
        
        return null;
    }
}
