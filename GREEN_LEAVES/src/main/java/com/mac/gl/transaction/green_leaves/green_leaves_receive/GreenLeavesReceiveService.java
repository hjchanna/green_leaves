
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
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesWeighDetail;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.repository.ClientRepository;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.repository.EmployeeRepository;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.repository.RouteRepository;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.repository.GreenLeavesReceiveDetailsRepository;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.repository.GreenLeavesWeighDetailRepository;

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
    private EmployeeRepository employeeRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private GreenLeavesWeighDetailRepository greenLeavesWeighDetailRepository;

    @Autowired
    private GreenLeavesReceiveDetailsRepository tGreenLeavesReceiveDetailsRepository;

    public List<MRoute> getRoutes(Integer branch) {
        List<MRoute> routelist = routeRepository.findByBranch(branch);
        return routelist;
    }

    public List<MEmployee> getRouteOfficers(Integer branch, String type) {
        List<MEmployee> officerList = employeeRepository.findByBranchAndType(branch, type);
        return officerList;
    }

    public List<MEmployee> getHelpers(Integer branch,String type) {
        List<MEmployee> helpersList = employeeRepository.findByBranchAndType(branch, type);
        return helpersList;
    }

    public List<MClient> getSuppliers() {
        List<MClient> suppliersList = clientRepository.findAll();
        return suppliersList;
    }

    public TGreenLeavesWeighDetail getTotalLeavesWeighByNormalLeavesAndSuperLeaves(Integer routeIndexNo, Date date, Integer branch) {
        List<Object[]> greenLeavesReceiveDetailsList = greenLeavesWeighDetailRepository.getTotalLeavesWeighByNormalLeavesAndSuperLeaves(routeIndexNo, date, branch);
        Double normalLeavesQuantity = Double.parseDouble(greenLeavesReceiveDetailsList.get(0).toString());
        Double superLeavesQuantity = Double.parseDouble(greenLeavesReceiveDetailsList.get(1).toString());
        return new TGreenLeavesWeighDetail(normalLeavesQuantity, superLeavesQuantity);
    }

    public List<TGreenLeavesReceiveDetails> getLeavesInfoMaction(Integer routeIndexNo, Date date, Integer branch) {
        List<TGreenLeavesReceiveDetails> tGreenLeavesReceiveDetailsRepositorys = tGreenLeavesReceiveDetailsRepository.getTotalLeaves(routeIndexNo, date, branch);
        return tGreenLeavesReceiveDetailsRepositorys;
    }

    public boolean updateTGreenLeavesReceiveDetails(TGreenLeavesReceiveDetails tGreenLeavesReceiveDetails) {
        tGreenLeavesReceiveDetailsRepository.save(tGreenLeavesReceiveDetails);
        return true;
    }
}
