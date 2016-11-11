/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.controller.zmaster;

import com.mac.gl.transaction.green_leaves.model.zmaster.MType;
import com.mac.gl.transaction.green_leaves.service.zmaster.TypeService;
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
 * @author Nidura Prageeth
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/type")
public class TypeController {

    @Autowired
    private TypeService typeService;

    public List<MType> findAll() {
        return typeService.findAll();
    }

    @RequestMapping(value = "/save-type", method = RequestMethod.POST)
    public MType saveType(@RequestBody MType type) {
        return typeService.saveType(type);
    }

    @RequestMapping(value = "/delete-type/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteType(@PathVariable Integer indexNo) {
        typeService.deleteType(indexNo);
        return indexNo;
    }
}
