/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.product;

import com.mac.green_leaves.v1.exception.DuplicateEntityException;
import com.mac.green_leaves.v1.master.product.model.MProduct;
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
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<MProduct> getAllProduct() {
        return productRepository.findAll();
    }

    public MProduct saveProduct(MProduct product) {
       MProduct mProduct = findByProductNo(product.getProductNo(),product.getName());
        if (mProduct == null) {
            return productRepository.save(product);
        } else {
            if (mProduct.getIndexNo().equals(product.getIndexNo())) {
                return productRepository.save(product);
            }
            throw new DuplicateEntityException("product already exists");
        }
    }
    
    //validation
    private MProduct findByProductNo(String productNo, String name) {
        List<MProduct> products = productRepository.findByProductNoOrName(productNo, name);
        if (products.isEmpty()) {
            return null;
        }
        return products.get(0);
    }

    public void deleteProduct(Integer indexNo) {
        productRepository.delete(indexNo);
    }
}
