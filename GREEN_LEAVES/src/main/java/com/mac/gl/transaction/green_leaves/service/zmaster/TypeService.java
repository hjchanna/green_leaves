/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.service.zmaster;

import com.mac.gl.transaction.green_leaves.model.zmaster.MType;
import com.mac.gl.transaction.green_leaves.repository.zmaster.TypeRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Nidura Prageeth
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class TypeService {

    @Autowired
    private TypeRepository typeRepository;

    public List<MType> findAll() {
        return typeRepository.findAll();
    }

    public MType saveType(MType type) {
        return typeRepository.save(type);
    }

    public void deleteType(Integer indexNo) {
        typeRepository.delete(indexNo);
    }

}
