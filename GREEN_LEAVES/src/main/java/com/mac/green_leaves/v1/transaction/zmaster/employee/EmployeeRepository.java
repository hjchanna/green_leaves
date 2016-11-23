package com.mac.green_leaves.v1.transaction.zmaster.employee;

import com.mac.green_leaves.v1.transaction.zmaster.employee.model.MEmployee;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Don
 */
public interface EmployeeRepository extends JpaRepository<MEmployee, Integer> {

    public List<MEmployee> findByTypeAndBranch(String route_officer, Integer branch);

    public List<MEmployee> findByNicNumber(String nic);

}
