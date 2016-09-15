
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.green_leaves_receive;

import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.MClient;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.MEmployee;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.MRoute;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetails;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesWeighDetails;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.repository.ClientRepository;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.repository.RouteRepository;
import java.sql.Date;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Don
 */
@Service
@Transactional
public class GreenLeavesReceiveService {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EntityManager entityManager;

    public List<MRoute> getRoutes(Integer branch) {
        List<MRoute> routelist = routeRepository.findByBranch(branch);
        return routelist;
    }

    public List<MEmployee> getRouteOfficers() {
        String hql = "SELECT m_employee.* from m_route  LEFT JOIN m_employee ON m_route.route_officer = m_employee.index_no";
        List<MEmployee> results = entityManager.createNativeQuery(hql, MEmployee.class).getResultList();
        return results;
    }

    public List<MEmployee> getHelpers() {
        String hql = "SELECT m_employee.* from m_route  LEFT JOIN m_employee ON m_route.route_helper = m_employee.index_no";
        List<MEmployee> results = entityManager.createNativeQuery(hql, MEmployee.class).getResultList();
        return results;
    }

    public List<MClient> getSuppliers() {
        List<MClient> suppliersList = clientRepository.findAll();
        return suppliersList;
    }

    public TGreenLeavesWeighDetails getTotalLeavesWeighByNormalLeavesAndSuperLeaves(Integer routeIndexNo, Date date, Integer branch) {
        String hql = "SELECT sum(normal_leaves_quantity) as total_normal_leaves_quantity, sum(super_leaves_quantity) as total_super_leaves_quantity FROM t_green_leave_weigh LEFT JOIN t_green_leave_weigh_detail ON t_green_leave_weigh.index_no = t_green_leave_weigh_detail.green_leave_weigh where t_green_leave_weigh.index_no = :route and date = :date and t_green_leave_weigh.branch = :branch";
        List<Object[]> results = entityManager.createNativeQuery(hql).setParameter("route", routeIndexNo).setParameter("date", date).setParameter("branch", branch).getResultList();
        TGreenLeavesWeighDetails tGreenLeavesWeighDetails = new TGreenLeavesWeighDetails();
        for (Object[] greenLeavesWeighDetail : results) {
            tGreenLeavesWeighDetails.setNormalLeavesQuantity(Double.parseDouble(greenLeavesWeighDetail[0].toString()));
            tGreenLeavesWeighDetails.setSuperLeavesQuantity(Double.parseDouble(greenLeavesWeighDetail[1].toString()));
        }
        return tGreenLeavesWeighDetails;
    }

    public List<TGreenLeavesReceiveDetails> getLeavesInfoMaction(Integer routeIndexNo, Date date, Integer branch) {
        String hql = "SELECT t_green_leaves_receive_details.*  FROM t_green_leaves_receive LEFT JOIN t_green_leaves_receive_details ON t_green_leaves_receive.index_no = t_green_leaves_receive_details.green_leaves_receive where t_green_leaves_receive.index_no = :route and date = :date and t_green_leaves_receive.branch = :branch";
        List<TGreenLeavesReceiveDetails> results = entityManager.createNativeQuery(hql, TGreenLeavesReceiveDetails.class).setParameter("route", routeIndexNo).setParameter("date", date).setParameter("branch", branch).getResultList();
        return results;
    }

//    public boolean updateTGreenLeavesReceiveDetails(SaveOrUpdateGreenLeavesReceive saveOrUpdateGreenLeavesReceive) {
//        tGreenLeavesReceiveDetailsRepository.save(tGreenLeavesReceive);
//        return true;
//    }
}
