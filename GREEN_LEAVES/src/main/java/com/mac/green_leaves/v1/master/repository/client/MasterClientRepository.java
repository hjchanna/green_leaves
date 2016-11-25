/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.repository.client;
import com.mac.green_leaves.v1.master.model.client.MClient;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface MasterClientRepository extends JpaRepository<MClient, Integer> {

    public List<MClient> findByBranch(Integer branch);

    public List<MClient> findByClientNumberOrName(Integer clientNumber,String name);

    public List<MClient> findByClientNumberOrNameAndIndexNoNot(Integer clientNumber,String name, Integer indexNo);
}
