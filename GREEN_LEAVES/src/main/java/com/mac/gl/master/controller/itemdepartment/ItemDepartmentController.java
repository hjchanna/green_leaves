/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.itemdepartment;

import com.mac.gl.master.model.itemdepartment.MItemDepartment;
import com.mac.gl.master.service.itemDepartment.ItemDepartmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author KAZA
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/item-departments")
public class ItemDepartmentController {

    @Autowired
    private ItemDepartmentService departmentService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MItemDepartment> findAll() {
        return departmentService.findAll();
    }

    @RequestMapping(value = "/insert-detail", method = RequestMethod.POST)
    public MItemDepartment insertItemDeoartment(@RequestBody MItemDepartment departmentModel) {
        return departmentService.saveItemDepartment(departmentModel);
    }

    @RequestMapping(value = "/delete-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteItemDepartment(@PathVariable Integer indexNo) {
        departmentService.deleteItemDepartment(indexNo);

        return indexNo;
    }
}
