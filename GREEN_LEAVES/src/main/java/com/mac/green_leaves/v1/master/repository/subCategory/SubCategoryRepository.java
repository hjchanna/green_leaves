/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.repository.subCategory;

import com.mac.green_leaves.v1.master.model.category.MCategory;
import com.mac.green_leaves.v1.master.model.subCategory.MSubCategory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kalum
 */
public interface SubCategoryRepository extends JpaRepository<MSubCategory, Integer> {

    public List<MSubCategory> findByCategory(MCategory category);

}
