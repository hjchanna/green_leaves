/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.chequeBook;

import com.mac.green_leaves.v1.master.chequeBook.model.ChequeBook;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Supervision
 */
public interface ChequeBookRepository extends JpaRepository<ChequeBook, Integer>{
    
}
