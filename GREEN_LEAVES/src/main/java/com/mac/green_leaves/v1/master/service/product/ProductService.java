/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.service.product;

import com.mac.green_leaves.v1.master.model.product.MProduct;
import com.mac.green_leaves.v1.master.repository.product.ProductRepository;
import com.mac.green_leaves.v1.exception.DuplicateEntityException;
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
        if (isNotDuplicate(product)) {
            return productRepository.save(product);
        } else {
            //this is a duplicate entry - checked by 
            throw new DuplicateEntityException("Product already exists");
        }

    }

    public void deleteProduct(Integer indexNo) {
        productRepository.delete(indexNo);
    }

    //validation
    private boolean isNotDuplicate(MProduct product) {
        List<MProduct> products;
        if (product.getIndexNo() == null) {
            products = productRepository.findByProductNoOrBarCodeOrName(product.getProductNo(), product.getBarCode(), product.getName());
        } else {
            products = productRepository.findByProductNoAndIndexNoNot(product.getProductNo(), product.getIndexNo());
        }
        return products.isEmpty();
    }
}
