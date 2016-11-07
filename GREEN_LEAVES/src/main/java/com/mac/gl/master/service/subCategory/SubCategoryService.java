/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.subCategory;

import com.mac.gl.master.model.subCategory.SubCategory;
import com.mac.gl.master.repository.subCategory.SubCategoryRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author kalum
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class SubCategoryService {
    
    @Autowired
    SubCategoryRepository subCategoryRepository;
    
    public List<SubCategory> findAllSubCategory() {
        return subCategoryRepository.findAll();
    }
    
//    public SubCategory SaveSubCategory(SubCategory subCategory){
//        return subCategoryRepository.save(subCategory);
//        
//    }
    
//    public boolean isNotDuplicate(SubCategory subCategory){
//        
//        List<SubCategory>categorys;
//        
//        if (subCategory.getIndexNo()== null) {
//            categorys=subCategoryRepository.findByName(subCategory.getName());
//        }
//        
//    }
    
}
