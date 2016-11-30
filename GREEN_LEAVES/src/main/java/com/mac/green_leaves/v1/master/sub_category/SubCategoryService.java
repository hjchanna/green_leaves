/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.sub_category;

import com.mac.green_leaves.v1.exception.DuplicateEntityException;
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

    public MSubCategory findByName(String name) {
        List<MSubCategory> subCategorysList = subCategoryRepository.findByName(name);
        if (subCategorysList.isEmpty()) {
            return null;
        }
        return subCategorysList.get(0);
    }

    public MSubCategory saveSubCategory(MSubCategory subCategory) {
        MSubCategory mSubCategory = findByName(subCategory.getName());
        if (mSubCategory == null) {
            return subCategoryRepository.save(subCategory);
        } else {
            if (mSubCategory.getIndexNo().equals(subCategory.getIndexNo())) {//is update get update Object?
                return subCategory;
            }
            throw new DuplicateEntityException("Sub Category already exists");
        }

    }

    public void deleteSubCategory(Integer indexNo) {
        subCategoryRepository.delete(indexNo);
    }
}
