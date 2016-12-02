/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.chequeBook;

import com.mac.green_leaves.v1.master.chequeBook.model.ChequeBook;
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
public class ChequeBookService {

    @Autowired
    private ChequeBookRepository chequeBookRepository;

    public List<ChequeBook> findAllChequeBook() {
        return chequeBookRepository.findAll();
    }

    ChequeBook saveChequeBook(ChequeBook chequeBook) {
        
        return chequeBookRepository.save(chequeBook);
    }

    void deleteChequeBook(Integer indexNo) {
        try {
            chequeBookRepository.delete(indexNo);
        } catch (Exception e) {
            throw  new RuntimeException("Cannot delete this Cheque Book Issue Result because there are details in other transaction");
        }
    }
}
