/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.product;

import com.mac.green_leaves.v1.master.product.model.MProduct;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface ProductRepository extends JpaRepository<MProduct, Integer> {
    public List<MProduct> findByProductNoOrName(String productNo, String name);
}
