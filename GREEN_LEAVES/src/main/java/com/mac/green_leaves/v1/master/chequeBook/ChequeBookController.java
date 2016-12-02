/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.chequeBook;

import com.mac.green_leaves.v1.master.chequeBook.model.ChequeBook;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Supervision
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/cheque-book")
public class ChequeBookController {
    @Autowired
    private ChequeBookService chequeBookService;

    @RequestMapping(method = RequestMethod.GET)
    public List<ChequeBook> findAllDetail() {
        return chequeBookService.findAllChequeBook();
    }
    @RequestMapping(value = "/save-detail", method = RequestMethod.POST)
    public ChequeBook saveDetail(@RequestBody ChequeBook chequeBook) {
        chequeBook.setActive(true);
        chequeBook.setDate(new Date());
        return chequeBookService.saveChequeBook(chequeBook);
    }
     @RequestMapping(value = "/delete-cheque-book/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteChequeBook(@PathVariable Integer indexNo) {
        chequeBookService.deleteChequeBook(indexNo);
        return indexNo;
    }
}
