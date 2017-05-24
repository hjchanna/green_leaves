/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author hjcha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class MasterService<Model> {

    @Autowired
    private MasterRepository<Model> masterRepository;

    public List<Model> list(String keyword, Integer pageNumber, Integer branch, Class modelClass) {
        return masterRepository.list(keyword, pageNumber, branch, modelClass);
    }

    public int totalItems(String keyword, Integer branch, Class modelClass) {
        return masterRepository.totalItems(keyword, branch, modelClass);
    }
    
    
    @Transactional
    public int save(Model model) {
        return masterRepository.save(model);
    }

    @Transactional
    public int delete(Integer indexNo, Class modelClass) {
        return masterRepository.delete(indexNo, modelClass);
    }
}
