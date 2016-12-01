/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.client;

import com.mac.green_leaves.v1.exception.DuplicateEntityException;
import com.mac.green_leaves.v1.master.client.model.MClient;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Don
 */
@Service
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class MasterClientService {

    @Autowired
    private MasterClientRepository masterClientRepository;

    public List<MClient> findByBranch(Integer branch) {
        return masterClientRepository.findByBranch(branch);
    }

    //save supplier
    public MClient saveSupplier(MClient client) {
        MClient getClient = findByClientNoAndNicNumber(client.getClientNumber(), client.getNicNumber());
        if (getClient == null) {
            return masterClientRepository.save(client);
        } else {
            if (getClient.getIndexNo().equals(client.getIndexNo())) {
                if (getClient.getClientNumber()==client.getClientNumber()) {
                    return masterClientRepository.save(client);
                    
                }
            } 
            throw new DuplicateEntityException("client already exists");
        }
    }

    public List<MClient> getAllSuppliier() {
        return masterClientRepository.findAll();
    }

    public void deleteSupplier(Integer indexNo) {
        try {
            masterClientRepository.delete(indexNo);
        } catch (Exception e) {
            throw  new RuntimeException("Cannot delete this Client because there are details in other transaction");
        }
    }

    //validation
    private MClient findByClientNoAndNicNumber(Integer clientNo, String name) {
        List<MClient> clients = masterClientRepository.findByClientNumberOrNicNumber(clientNo, name);
        if (clients.isEmpty()) {
            return null;
        }
        return clients.get(0);
    }
}
