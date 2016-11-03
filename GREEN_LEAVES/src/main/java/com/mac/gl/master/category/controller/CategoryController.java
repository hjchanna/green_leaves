/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.category.controller;

import com.mac.gl.master.category.model.MCategory;
import com.mac.gl.master.category.service.CategoryService;
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
@RequestMapping("/api/green-leaves/master/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MCategory> findAllCategory() {
        return categoryService.findAllCategory();
    }

    @RequestMapping(value = "/save-category", method = RequestMethod.POST)
    public Integer saveCategory(@RequestBody MCategory category) {
        category = categoryService.saveCategory(category);
        return category.getIndexNo();
    }

    @RequestMapping(value = "/delete-category/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteCategory(@PathVariable Integer indexNo) {
        categoryService.deleteCategory(indexNo);

        return indexNo;
    }

}