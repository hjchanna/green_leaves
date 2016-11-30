/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.sub_category;

import com.mac.green_leaves.v1.master.sub_category.model.MSubCategory;
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
 * @author kalum
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/sub-category")
public class SubCategoryController {

    @Autowired
    private SubCategoryService subCategoryService;


    @RequestMapping(value = "/save-subCategory", method = RequestMethod.POST)
    public MSubCategory saveSubCategory(@RequestBody MSubCategory subCategory) {
        return subCategoryService.saveSubCategory(subCategory);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<MSubCategory> findAllCategory() {
        return subCategoryService.findAllSubCategory();
    }

    @RequestMapping(value = "/delete-sub-category/{indexNo}", method = RequestMethod.DELETE)
    public void deleteSubCategory(@PathVariable Integer indexNo) {
        subCategoryService.deleteSubCategory(indexNo);
    }
    
}
