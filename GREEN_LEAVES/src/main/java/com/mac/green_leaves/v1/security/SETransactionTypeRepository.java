/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.security;

import com.mac.green_leaves.v1.security.model.RTransactionType;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Mohan
 */
public interface SETransactionTypeRepository extends JpaRepository<RTransactionType, Integer>{
    
}
