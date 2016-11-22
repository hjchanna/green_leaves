/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.repository.zmaster;

import com.mac.gl.transaction.green_leaves.model.zmaster.MType;
import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Nidura Prageeth
 */
public interface TypeRepository extends JpaRepository<MType, Serializable>{
    
}
