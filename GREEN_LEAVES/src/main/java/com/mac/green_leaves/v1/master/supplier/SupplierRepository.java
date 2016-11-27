/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.supplier;

import com.mac.green_leaves.v1.master.supplier.model.MSupplier;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface SupplierRepository extends JpaRepository<MSupplier, Integer> {

    public List<MSupplier> findByNicNumber(String nicNumber);

    public List<MSupplier> findByNicNumberAndIndexNoNot(String nicNumber, Integer indexNo);
}
