/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.payroll.employee_advance;

import com.mac.green_leaves.v1.payroll.employee_advance.model.TEmployeeAdvanceRequest;
import com.mac.green_leaves.v1.payroll.employee_advance.model.TEmployeeAdvanceRequestDetails;
import com.mac.green_leaves.v1.zutil.SecurityUtil;
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
 * @author L T430
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/green-leaves/employee-advance")
public class PREmployeeAdvanceController {

    @Autowired
    private PREmployeeAdvanceService employeeAdvanceService;

    @Autowired
    private PREmployeeAdvanceRequestRepository advanceRequestRepository;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Integer saveAdvanceRequest(@RequestBody TEmployeeAdvanceRequest employeeAdvanceRequest) {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        TEmployeeAdvanceRequest findLastRow = advanceRequestRepository.findFirst1ByOrderByIndexNoDesc();

        System.out.println(employeeAdvanceRequest.getEmployeeAdvanceRequestDetail().size()+"#######S################");
        if (findLastRow != null) {
            employeeAdvanceRequest.setNumber(findLastRow.getNumber() + 1);
        } else {
            employeeAdvanceRequest.setNumber(1);
        }
        employeeAdvanceRequest.setBranch(branch);
        System.out.println("save controller");
        employeeAdvanceService.saveAdvanceRequest(employeeAdvanceRequest);

        return null;
    }
    
    //approve
    @RequestMapping(value = "/pending-requests")
    public List<Object[]> getPendingAdvanceRequests() {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        return employeeAdvanceService.getPendingAdvanceRequests(branch);
    }
    
    @RequestMapping(value = "/pending-requests-by-status")
    public List<TEmployeeAdvanceRequestDetails> getPendingAdvanceRequestList() {
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        return employeeAdvanceService.getPendingAdvanceRequestList(branch);
    }
    
    @RequestMapping(value = "/pending-requests-by-date/{date}")
    public List<TEmployeeAdvanceRequestDetails> getPendingAdvanceRequest(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        System.out.println("Date c");
        System.out.println(date);
        Integer branch = SecurityUtil.getCurrentUser().getBranch();
        return employeeAdvanceService.getPendingAdvanceRequestList(branch,date);
    }
    
    @RequestMapping(value = "/approve-request-detail/{indexNo}")
    public void approveAdvanceRequestDetail(@PathVariable Integer indexNo) {
        employeeAdvanceService.approveAdvanceRequestDetail(indexNo);
    }
    
    @RequestMapping(value = "/reject-request-detail/{indexNo}")
    public void rejectAdvanceRequestDetail(@PathVariable Integer indexNo) {
        employeeAdvanceService.rejectAdvanceRequestDetail(indexNo);
    }
}
