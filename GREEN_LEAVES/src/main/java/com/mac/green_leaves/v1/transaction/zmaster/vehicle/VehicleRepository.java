package com.mac.green_leaves.v1.transaction.zmaster.vehicle;

import com.mac.green_leaves.v1.transaction.zmaster.vehicle.model.MVehicle;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Mohan
 */
public interface VehicleRepository extends JpaRepository<MVehicle, Integer> {

    public List<MVehicle> findByBranch(Integer branch);
}
