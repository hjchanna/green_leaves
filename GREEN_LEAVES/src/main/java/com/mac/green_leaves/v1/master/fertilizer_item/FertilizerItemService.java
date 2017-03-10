/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.fertilizer_item;

import com.mac.green_leaves.v1.master.fertilizer_item.model.MFertilizerItem;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kavish Manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class FertilizerItemService {

    @Autowired
    private FertilizerItemRepository fertilizerItemRepository;

    public List<MFertilizerItem> getAllList() {
        return fertilizerItemRepository.findAll();
    }
}
