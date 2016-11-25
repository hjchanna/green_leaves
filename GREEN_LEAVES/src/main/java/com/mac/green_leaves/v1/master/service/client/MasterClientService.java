/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.service.client;

import com.mac.green_leaves.v1.exception.DuplicateEntityException;
import com.mac.green_leaves.v1.master.model.client.MClient;
import com.mac.green_leaves.v1.master.repository.client.MasterClientRepository;
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
        MClient getClient = findByProductNo(client.getClientNumber(), client.getName());
        if (getClient == null) {
            return masterClientRepository.save(client);
        } else {
            if (getClient.getIndexNo().equals(client.getIndexNo())) {
                return masterClientRepository.save(client);
            }
            throw new DuplicateEntityException("client already exists");
        }
    }

    public List<MClient> getAllSuppliier() {
        return masterClientRepository.findAll();
    }

    public void deleteSupplier(Integer indexNo) {
        masterClientRepository.delete(indexNo);
    }

    //validation
    private MClient findByProductNo(Integer clientNo, String name) {
        List<MClient> clients = masterClientRepository.findByClientNumberOrName(clientNo, name);
        if (clients.isEmpty()) {
            return null;
        }
        return clients.get(0);
    }
}
