/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.security;

import com.mac.green_leaves.v1.security.model.MUserRole;
import com.mac.green_leaves.v1.security.model.RTransactionType;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Mohan
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class SecurityService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionTypeRepository transactionTypeRepository;

    public Set<RTransactionType> findTransactionTypesForUser(Integer indexNo) {
        Set<MUserRole> userRoles = userRepository.findOne(indexNo).getUserRoles();

        Set<RTransactionType> transactionTypes = new HashSet<>();
        for (MUserRole userRole : userRoles) {
            transactionTypes.addAll(userRole.getRTransactionTypeSet());
        }

        return transactionTypes;
    }

}
