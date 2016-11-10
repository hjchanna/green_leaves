package com.mac.gl.transaction.green_leaves.repository.zmaster;

import com.mac.gl.transaction.green_leaves.model.zmaster.MClient;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Don
 */
@Repository
public interface ClientRepository extends JpaRepository<MClient, Integer> {

    public List<MClient> findByBranch(Integer branch);

    public List<MClient> findByNicNumber(String nicNumber);

    public List<MClient> findByNicNumberAndIndexNoNot(String nicNumber, Integer indexNo);
}
