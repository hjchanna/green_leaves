/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.zmaster.client;

import com.mac.green_leaves.v1.green_leaves.zmaster.client.model.MClient;
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
public class GLClientService {

    @Autowired
    private GLClientRepository clientRepository;

    public List<MClient> findByBranch(Integer branch) {
        return clientRepository.findByBranch(branch);
    }

    public Integer deleteCustomer(Integer indexNo) {
        clientRepository.delete(indexNo);
        return indexNo;
    }

}
