/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.service.supplier;

import com.mac.green_leaves.v1.master.model.supplier.MSupplier;
import com.mac.green_leaves.v1.master.repository.supplier.SupplierRepository;
import com.mac.green_leaves.v1.exception.DuplicateEntityException;
import com.mac.green_leaves.v1.transaction.zmaster.client.model.MClient;
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
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public List<MSupplier> getAllSupplier(Integer branch) {
        return supplierRepository.findAll();
    }

    public MSupplier saveSupplier(MSupplier supplier) {
        if (isNotDuplicate(supplier)) {
            return supplierRepository.save(supplier);
        } else {
            throw new DuplicateEntityException("supplier already exists");
        }
    }

    public void deleteSupplier(Integer indexNo) {
        supplierRepository.delete(indexNo);
    }

    //validation
    private boolean isNotDuplicate(MSupplier supplier) {
        List<MSupplier> suppliers;
        if (supplier.getIndexNo() == null) {
            suppliers = supplierRepository.findByCompanyName(supplier.getCompanyName());
        } else {
            suppliers = supplierRepository.findByCompanyNameAndIndexNoNot(supplier.getCompanyName(), supplier.getIndexNo());
        }
        return suppliers.isEmpty();
    }
}
