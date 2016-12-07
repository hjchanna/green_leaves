/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.main_Distribution;

import com.mac.green_leaves.v1.exception.DuplicateEntityException;
import com.mac.green_leaves.v1.master.main_Distribution.model.MMainDistribution;
import com.mac.green_leaves.v1.master.sub_Distribution.model.MSubDistribution;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author kalum
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class MainDistributionService {

    @Autowired
    private MainDistributionRepository mainDistributionRepository;
    
    
    public List<MMainDistribution> findAllMainDistribution() {
        return mainDistributionRepository.findAll();
    }
    
    private  MMainDistribution findByName(String name) {
        List<MMainDistribution> mainDistributionList = mainDistributionRepository.findByName(name);
        if (mainDistributionList.isEmpty()) {
            return null;
        }
        return mainDistributionList.get(0);
    }

    public MMainDistribution saveMainDistribution(MMainDistribution mainDistribution) {
        MMainDistribution mMainDistribution = findByName(mainDistribution.getName());
        if (mMainDistribution == null) {
            return mainDistributionRepository.save(mainDistribution);
        } else {
            if (mMainDistribution.getIndexNo().equals(mainDistribution.getIndexNo())) {//is update get update Object?
                return mainDistribution;
            }
            throw new DuplicateEntityException("main Distribution already exists");
        }

    }


    void deleteMainDistribution(Integer indexNo) {
        try {
            mainDistributionRepository.delete(indexNo);
        } catch (Exception e) {
            throw  new RuntimeException("Cannot delete this main Distribution because there are details in other transaction");
        }}

}
