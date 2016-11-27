package com.mac.green_leaves.v1.green_leaves.zmaster.client;

import com.mac.green_leaves.v1.green_leaves.zmaster.client.model.MClient;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Don
 */
@Repository
public interface GLClientRepository extends JpaRepository<MClient, Integer> {

    public List<MClient> findByBranch(Integer branch);

}
