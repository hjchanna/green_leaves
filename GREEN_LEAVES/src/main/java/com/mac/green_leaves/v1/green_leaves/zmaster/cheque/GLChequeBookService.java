/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zmaster.cheque;

import com.mac.green_leaves.v1.green_leaves.zmaster.cheque.model.MChequeBook;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Nidura Prageeth
 */
@Service
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class GLChequeBookService {

    @Autowired
    private GLChequeBookRepository chequeBookRepository;

    public List<MChequeBook> findAll() {
        return chequeBookRepository.findAll();
    }

}
