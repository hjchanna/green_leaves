package com.mac.gl.transaction.green_leaves.green_leaves_receive.repository;

import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.MClient;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface ClientRepository extends JpaRepository<MClient, Integer> {

    public List<MClient> findByBranch(Integer branch);
}
