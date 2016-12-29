/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.sub_Distribution;

import com.mac.green_leaves.v1.zexception.DuplicateEntityException;
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
public class SubDistributionService {

    @Autowired
    private SubDistributionRepository subDistributionRepository;
    
    
    public List<MSubDistribution> findAllSubDistribution() {
        return subDistributionRepository.findAll();
    }
    
    private  MSubDistribution findByName(String name) {
        List<MSubDistribution> subDistributionList = subDistributionRepository.findByName(name);
        if (subDistributionList.isEmpty()) {
            return null;
        }
        return subDistributionList.get(0);
    }

    public MSubDistribution saveSubDistribution(MSubDistribution subDistribution) {
        MSubDistribution mSubDistribution = findByName(subDistribution.getName());
        if (mSubDistribution == null) {
            return subDistributionRepository.save(subDistribution);
        } else {
            if (mSubDistribution.getIndexNo().equals(subDistribution.getIndexNo())) {//is update get update Object?
                return subDistribution;
            }
            throw new DuplicateEntityException("Sub Distribution already exists");
        }

    }


    void deleteSubDistribution(Integer indexNo) {
        try {
            subDistributionRepository.delete(indexNo);
        } catch (Exception e) {
            throw  new RuntimeException("Cannot delete this sub Distribution because there are details in other transaction");
        }
    }

}
