/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.green_leaves_receive.repository;

import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.MEmployee;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author Don
 */
public interface EmployeeRepository extends JpaRepository<MEmployee, Integer> {

    //sql query - SELECT e.* from m_route r LEFT JOIN m_employee e ON r.route_officer = e.index_no;
    @Query("SELECT e from MRoute r LEFT JOIN MEmployee e ON r.routeOfficer = e.indexNo")
    public List<MEmployee> findAllByRouteOfficer();

    //sql quary - SELECT e.* from m_route r LEFT JOIN m_employee e ON r.route_helper = e.index_no;
    @Query("SELECT e from MRoute r LEFT JOIN MEmployee e ON r.routeHelper = e.indexNo")
    public List<MEmployee> findByHelpers();

}
