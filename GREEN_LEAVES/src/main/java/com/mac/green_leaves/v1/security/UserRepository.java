/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.security;

import com.mac.green_leaves.v1.security.model.MUser;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Mohan
 */
public interface UserRepository extends JpaRepository<MUser, Integer> {

    public List<MUser> findByUsername(String userName);
}
