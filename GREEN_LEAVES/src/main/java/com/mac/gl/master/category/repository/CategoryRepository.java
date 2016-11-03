/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.category.repository;

import com.mac.gl.master.category.model.MCategory;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Nidura Prageeth
 */
public interface CategoryRepository extends JpaRepository<MCategory, Integer> {

    public MCategory findByName(String name);

}
