/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.repository.client_advance;

import com.mac.gl.transaction.green_leaves.model.client_advance.TClientAdvanceRequest;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mohan
 */
public interface ClientAdvanceRequestRepository extends JpaRepository<TClientAdvanceRequest, Integer> {

    public List<TClientAdvanceRequest> findByNumberAndBranch(Integer number, Integer branch);

    @Query(value = "SELECT MAX(number) FROM t_client_advance_request WHERE branch=:branch", nativeQuery = true)
    public Integer getMaximumNumberByBranch(@Param("branch") Integer branch);

    public List<TClientAdvanceRequest> findByBranchAndStatus(Integer branch, String status);
}
