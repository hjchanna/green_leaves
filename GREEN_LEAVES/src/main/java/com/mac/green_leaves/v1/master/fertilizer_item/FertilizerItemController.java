/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master.fertilizer_item;

import com.mac.green_leaves.v1.master.fertilizer_item.model.MFertilizerItem;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kavish Manjitha
 */
@CrossOrigin
@RestController
@RequestMapping("/api/v1/green-leaves/fertilizer-item")
public class FertilizerItemController {

    @Autowired
    private FertilizerItemService fertilizerService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MFertilizerItem> getAllList() {
        return fertilizerService.getAllList();
    }
}
