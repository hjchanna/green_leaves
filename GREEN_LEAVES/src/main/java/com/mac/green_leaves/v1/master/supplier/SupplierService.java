/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.supplier;

import com.mac.green_leaves.v1.zexception.DuplicateEntityException;
import com.mac.green_leaves.v1.master.supplier.model.MSupplier;
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
        try {
            supplierRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete this Supplier because there are details in other transaction");
        }
    }

    //validation
    private boolean isNotDuplicate(MSupplier supplier) {
        List<MSupplier> suppliers;
        if (supplier.getIndexNo() == null) {
            suppliers = supplierRepository.findByNicNumber(supplier.getNicNumber());
        } else {
            suppliers = supplierRepository.findByNicNumberAndIndexNoNot(supplier.getNicNumber(), supplier.getIndexNo());
        }
        return suppliers.isEmpty();
    }
}
