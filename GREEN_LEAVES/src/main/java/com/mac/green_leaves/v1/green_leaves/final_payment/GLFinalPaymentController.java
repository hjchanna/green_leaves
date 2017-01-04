/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.final_payment;

import com.mac.green_leaves.v1.green_leaves.final_payment.model.TAccountTransaction;
import com.mac.green_leaves.v1.green_leaves.zmaster.client.GLClientService;
import com.mac.green_leaves.v1.green_leaves.zmaster.client.model.MClient;
import com.mac.green_leaves.v1.green_leaves.zmaster.employee.GLEmployeeService;
import com.mac.green_leaves.v1.green_leaves.zmaster.employee.model.MEmployee;
import com.mac.green_leaves.v1.master.employee.EmployeeService;
import com.mac.green_leaves.v1.master.transaction_type.TransactionTypeService;
import com.mac.green_leaves.v1.master.transaction_type.model.TransactionType;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Supervision
 */
@CrossOrigin
@RestController
@RequestMapping("/api/v1/green-leaves/final-payment")
public class GLFinalPaymentController {
    
    private static final Integer branch = 1;
    
    @Autowired
    private GLFinalPaymentService finalPaymentService;
    
    @Autowired
    private TransactionTypeService transactionTypeService;
    
    @Autowired
    private GLClientService clientService;
    
    @Autowired
    private GLEmployeeService emploueeService;
    

    @RequestMapping(value = "/{year}/{month}", method = RequestMethod.GET)
    public List<TAccountTransaction> getAccountTransactionsFromDate(@PathVariable String year, @PathVariable String month) {

        return finalPaymentService.getAccountTransactionsFromDate(year, month);
    }
    @RequestMapping(value = "/find-transaction-type/{indexNo}", method = RequestMethod.GET)
    public TransactionType findTransactionType(@PathVariable("indexNo") Integer indexNo) {
        return transactionTypeService.findByIndexNo(indexNo);
    }
    @RequestMapping(value = "/all-transaction-type", method = RequestMethod.GET)
    public List<TransactionType> allTransactionType() {
        return transactionTypeService.findAll();
    }
    @RequestMapping(value = "/get-account-transactions-from-description/{year}/{month}/{typeId}", method = RequestMethod.GET)
    public List<TAccountTransaction> getAccountTransactionsFromDescription(@PathVariable String year,@PathVariable String month,@PathVariable Integer typeId) {
        return finalPaymentService.getAccountTransactionsFromDescription(year, month, typeId);
    }
    @RequestMapping(value = "/get-all-client/{branch}", method = RequestMethod.GET)
    public List<MClient> getAllClientFromBranch(@PathVariable Integer branch) {
        return clientService.findByBranch(branch);
    }
    @RequestMapping(value = "/get-all-emplouee/{branch}", method = RequestMethod.GET)
    public List<MEmployee> getAllEmploueeFromBranch(@PathVariable Integer branch) {
        return emploueeService.findAllEmployees(branch);
    }
}
