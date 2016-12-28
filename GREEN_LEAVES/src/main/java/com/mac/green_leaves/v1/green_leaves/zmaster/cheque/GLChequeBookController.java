/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zmaster.cheque;

import com.mac.green_leaves.v1.green_leaves.zmaster.cheque.model.MChequeBook;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Nidura Prageeth
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/green-leaves/master/chequebook")
public class GLChequeBookController {
    
    @Autowired
    private GLChequeBookService chequeBookService; 
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MChequeBook> findAll(){
       return chequeBookService.findAll();
    }
}
