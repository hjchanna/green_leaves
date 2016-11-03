/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.brand.service;

import com.mac.gl.master.brand.model.brand.MBrand;
import com.mac.gl.master.brand.repository.BrandRepository;
import com.mac.gl.system.exception.DuplicateEntityException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Don
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    //save brand
    public MBrand saveBrand(MBrand mBrand) {
        if (isNotDuplicate(mBrand)) {
            return brandRepository.save(mBrand);
        } else {
            //this is a duplicate entry - checked by 
            throw new DuplicateEntityException("Brand already exists");
        }
    }

    //get all brand
    public List<MBrand> getAllBrand() {
        return brandRepository.findAll();
    }

    //delete brand
    public void deleteBrand(Integer indexNo) {
        brandRepository.delete(indexNo);
    }

    //validation
    private boolean isNotDuplicate(MBrand mBrand) {
        List<MBrand> brand;
        if (mBrand.getIndexNo() == null) {
            brand = brandRepository.findByName(mBrand.getName());
        } else {
            brand = brandRepository.findByNameAndIndexNoNot(mBrand.getName(), mBrand.getIndexNo());
        }

        return brand.isEmpty();
    }
}
