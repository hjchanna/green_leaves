/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.price_setting;

import com.mac.green_leaves.v1.green_leaves.price_setting.model.TPriceSetting;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Mohan
 */
@CrossOrigin
@RestController
@RequestMapping("/api/v1/green-leaves/price-setting")
public class GLPriceSettingController {

    private static final Integer branch = 1;

    @Autowired
    private GLPriceSettingService priceSettingService;

    @RequestMapping(value = "/{year}/{month}", method = RequestMethod.GET)
    public TPriceSetting findPriceSetting(@PathVariable Integer year, @PathVariable Integer month) {
        return priceSettingService.findPriceSetting(branch, year, month);
    }

    @RequestMapping(value = "/get-green-leaves-total/{year}/{month}", method = RequestMethod.GET)
    public List<Object[]> finByRouteAndYearAndMonth(@PathVariable Integer year, @PathVariable Integer month) {
        return priceSettingService.findRouteReceiveSummaryByBranchAndYearAndMonth(branch, year, month);
    }

    @RequestMapping(value = "/save-price-setting", method = RequestMethod.POST)
    public Integer save(@RequestBody TPriceSetting priceSetting) {
        return priceSettingService.save(priceSetting);
    }

}
