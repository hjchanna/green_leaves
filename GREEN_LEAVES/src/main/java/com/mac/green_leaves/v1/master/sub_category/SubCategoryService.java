/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.sub_category;

import com.mac.green_leaves.v1.master.sub_category.model.MSubCategory;
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
    private SubCategoryRepository subCategoryRepository;

    public List<MSubCategory> findAllSubCategory() {
        return subCategoryRepository.findAll();
    }

    public MSubCategory saveSubCategory(MSubCategory subCategory) {
        return subCategoryRepository.save(subCategory);

    }

    public void deleteSubCategory(Integer indexNo) {
        subCategoryRepository.delete(indexNo);
    }

//    public List<MSubCategory> findByCategory(MCategory category) {
//        return subCategoryRepository.findByCategory(category);
//    }

}
