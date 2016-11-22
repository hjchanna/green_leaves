/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.transaction.zmaster.client;

import com.mac.green_leaves.v1.exception.DuplicateEntityException;
import com.mac.green_leaves.v1.transaction.zmaster.client.model.MClient;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Mohan
 */
@Service
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<MClient> findByBranch(Integer branch) {
        return clientRepository.findByBranch(branch);
    }

    //save supplier
    public MClient saveSupplier(MClient client) {
        if (isNotDuplicate(client)) {
            return clientRepository.save(client);
        } else {
            throw new DuplicateEntityException("supplier already exists");
        }
    }

    public List<MClient> getAllSuppliier() {
        return clientRepository.findAll();
    }

    public void deleteSupplier(Integer indexNo) {
        clientRepository.delete(indexNo);
    }

    //validation
    private boolean isNotDuplicate(MClient client) {
//        List<MClient> clients;
//        if (client.getIndexNo() == null) {
//            clients = clientRepository.findByNicNumber(client.getNicNumber());
//        } else {
//            clients = clientRepository.findByNicNumberAndIndexNoNot(client.getNicNumber(), client.getIndexNo());
//        }
//
//        return clients.isEmpty();
        return false;
    }
}
