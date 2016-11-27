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
        if (isNotDuplicate(client)) {
            return masterClientRepository.save(client);
        } else {
            throw new DuplicateEntityException("supplier already exists");
        }
    }

    public List<MClient> getAllSuppliier() {
        return masterClientRepository.findAll();
    }

    public void deleteSupplier(Integer indexNo) {
        masterClientRepository.delete(indexNo);
    }

    //validation
    private boolean isNotDuplicate(MClient client) {
        List<MClient> clients;
        if (client.getIndexNo() == null) {
            clients = masterClientRepository.findByClientNumber(client.getClientNumber());
        } else {
            clients = masterClientRepository.findByClientNumberAndIndexNoNot(client.getClientNumber(), client.getIndexNo());
        }
        return clients.isEmpty();
    }
}
