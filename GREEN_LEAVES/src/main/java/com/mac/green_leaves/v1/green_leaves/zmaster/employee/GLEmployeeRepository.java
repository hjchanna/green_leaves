package com.mac.green_leaves.v1.green_leaves.zmaster.employee;

import com.mac.green_leaves.v1.green_leaves.zmaster.employee.model.MEmployee;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Don
 */
public interface GLEmployeeRepository extends JpaRepository<MEmployee, Integer> {

    public List<MEmployee> findByBranch(Integer branch);

    public List<MEmployee> findByBranchAndType(Integer branch, String type);
}
