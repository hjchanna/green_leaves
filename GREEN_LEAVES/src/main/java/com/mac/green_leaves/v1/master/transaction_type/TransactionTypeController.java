/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.transaction_type;

import com.mac.green_leaves.v1.master.transaction_type.model.TransactionType;
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
@RequestMapping("/api/green-leaves/master/trasaction-type")
public class TransactionTypeController {
    
    @Autowired
    private TransactionTypeService transactionTypeService;

    @RequestMapping(value = "/findOne/{indexNo}", method = RequestMethod.DELETE)
    public TransactionType getTransactionType(@PathVariable Integer indexNo) {
        TransactionType transactionType = transactionTypeService.findByIndexNo(indexNo);
        return transactionType;
    }
    
}
