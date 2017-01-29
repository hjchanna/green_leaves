/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.transaction_type;

import com.mac.green_leaves.v1.master.transaction_type.model.TransactionType;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Supervision
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class TransactionTypeService {
    
    @Autowired
    private TransactionTypeRepository transactionTypeRepository;

    public TransactionType findByIndexNo(Integer indexNo) {
        return transactionTypeRepository.findOne(1);
    }
    
    public List<TransactionType> findAll() {
        return transactionTypeRepository.findAll();
    }
    
}
