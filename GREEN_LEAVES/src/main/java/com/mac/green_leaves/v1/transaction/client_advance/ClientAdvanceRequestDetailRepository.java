/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.transaction.client_advance;

import com.mac.green_leaves.v1.transaction.client_advance.model.TClientAdvanceRequestDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Mohan
 */
public interface ClientAdvanceRequestDetailRepository extends JpaRepository<TClientAdvanceRequestDetail, Integer> {

    public List<TClientAdvanceRequestDetail> findByClientAdvanceRequestRoute(Integer route);
}
