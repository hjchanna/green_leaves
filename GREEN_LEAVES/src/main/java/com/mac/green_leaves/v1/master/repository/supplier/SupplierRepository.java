/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.repository.supplier;

import com.mac.green_leaves.v1.master.model.supplier.MSupplier;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface SupplierRepository extends JpaRepository<MSupplier, Integer> {

    public List<MSupplier> findByName(String name);

    public List<MSupplier> findByNameAndIndexNoNot(String name, Integer indexNo);
}
