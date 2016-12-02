/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.bank;

import com.mac.green_leaves.v1.master.bank.model.MBank;
import com.mac.green_leaves.v1.master.item_department.ItemDepartmentService;
import com.mac.green_leaves.v1.master.item_department.model.MItemDepartment;
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
 * @author Supervision
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/bank")
public class BankController {
    
    @Autowired
    private BankService bankService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MBank> findAll() {
        return bankService.findAll();
    }

    @RequestMapping(value = "/insert-detail", method = RequestMethod.POST)
    public MBank insertItemDepartment(@RequestBody MBank bank) {
        return bankService.saveDetail(bank);
    }

    @RequestMapping(value = "/delete-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteItemDepartment(@PathVariable Integer indexNo) {
        bankService.deleteDetail(indexNo);
        return indexNo;
    }
}
