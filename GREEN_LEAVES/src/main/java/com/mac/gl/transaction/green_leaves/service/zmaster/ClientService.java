/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.service.zmaster;

import com.mac.gl.system.exception.DuplicateEntityException;
import com.mac.gl.transaction.green_leaves.model.zmaster.MClient;
import com.mac.gl.transaction.green_leaves.repository.zmaster.ClientRepository;
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
        List<MClient> clients;
        if (client.getIndexNo() == null) {
            clients = clientRepository.findByBranchAndClientNoOrNameOrNicNumber(client.getBranch(), client.getClientNo(), client.getName(), client.getNicNumber());
        } else {
            clients = clientRepository.findByBranchAndClientNoAndIndexNoNot(client.getBranch(), client.getClientNo(), client.getIndexNo());
        }
        return clients.isEmpty();
    }
}
