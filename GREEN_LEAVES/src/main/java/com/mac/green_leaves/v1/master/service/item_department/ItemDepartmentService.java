/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.service.item_department;

import com.mac.green_leaves.v1.master.model.item_department.MItemDepartment;
import com.mac.green_leaves.v1.master.repository.item_department.ItemDepartmentRepository;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author KAZA
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ItemDepartmentService {

    @Autowired
    private ItemDepartmentRepository departmentRepository;

    public List<MItemDepartment> findAll() {
        return departmentRepository.findAll();
    }

    public MItemDepartment findByName(String name) {
        System.out.println(name);
        List<MItemDepartment> departmentList = departmentRepository.findByName(name);
        if (departmentList.isEmpty()) {
            return null;
        }
        return departmentList.get(0);
    }

    public MItemDepartment saveItemDepartment(MItemDepartment departmentModal) {
        MItemDepartment findByName = findByName(departmentModal.getName());

        if (findByName == null) {//is'nt already exsist by name
            return departmentRepository.save(departmentModal);
        } else {//is already exsist by name
            if (findByName.getIndexNo().equals(departmentModal.getIndexNo())) {//is update get update Object?
                return departmentModal;
            }
            throw new RuntimeException("duplicate");
        }
    }

    public void deleteItemDepartment(Integer indexNo) {
        departmentRepository.delete(indexNo);
    }
}
