/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.brand.repository;

import com.mac.gl.master.brand.model.brand.MBrand;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface BrandRepository extends JpaRepository<MBrand, Integer> {

    public List<MBrand> findByName(String name);

    public List<MBrand> findByNameAndIndexNoNot(String name, Integer indexNo);

}
