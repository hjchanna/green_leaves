/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.subCategory;

import com.mac.gl.master.model.subCategory.SubCategory;
import com.mac.gl.master.service.subCategory.SubCategoryService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

//    @RequestMapping(value = "/save-subCategory",method = RequestMethod. POST)
//    public SubCategory saveCategory(@RequestBody SubCategory subCategory){
//        return subCategoryService.SaveSubCategory(subCategory);
//    }
    //Save subCategory
    @RequestMapping(value = "/save-subCategory", method = RequestMethod.POST)
    public SubCategory saveSubCategory(SubCategory subCategory) {
//        return subCategoryService.SaveSubCategory(subCategory);
        return null;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<SubCategory> findAllCategory() {
        return subCategoryService.findAllSubCategory();
    }
}
