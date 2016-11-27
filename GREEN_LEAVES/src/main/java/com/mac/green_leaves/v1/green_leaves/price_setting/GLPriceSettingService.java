/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.price_setting;

import com.mac.green_leaves.v1.green_leaves.green_leaves_receive.GLGreenLeavesReceiveRepository;
import com.mac.green_leaves.v1.green_leaves.price_setting.model.TPriceSetting;
import com.mac.green_leaves.v1.green_leaves.price_setting.model.TPriceSettingDetail;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Mohan
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class GLPriceSettingService {

    @Autowired
    private GLPriceSettingRepository priceSettingRepository;

    @Transactional
    public TPriceSetting findPriceSetting(Integer branch, Integer year, Integer month) {
        List<TPriceSetting> priceSettings = priceSettingRepository.findByYearAndMonthAndBranch(year, month, branch);

        TPriceSetting priceSetting;
        if (priceSettings.isEmpty()) {
            Integer maxNumber = priceSettingRepository.getMaximumNumberByBranch(branch);
            if (maxNumber == null) {
                maxNumber = 0;
            }

            priceSetting = new TPriceSetting();
            priceSetting.setBranch(branch);
            priceSetting.setNumber(maxNumber + 1);
            priceSetting.setTransaction(0);//TODO:transaction
            priceSetting.setYear(year);
            priceSetting.setMonth(month);

            priceSetting.setPriceSettingDetails(new ArrayList<>());
        } else {
            priceSetting = priceSettings.get(0);
        }

        List<Integer> routes = priceSettingRepository.findRoutes();

        for (Integer route : routes) {
            TPriceSettingDetail priceSettingDetail = null;
            if (priceSetting.getPriceSettingDetails() != null) {
                for (TPriceSettingDetail testPriceSettingDetail : priceSetting.getPriceSettingDetails()) {
                    if (Objects.equals(testPriceSettingDetail.getRoute(), route)) {
                        priceSettingDetail = testPriceSettingDetail;
                        break;
                    }
                }
            }

            if (priceSettingDetail == null) {
                priceSettingDetail = new TPriceSettingDetail();
                priceSettingDetail.setRoute(route);
                priceSettingDetail.setNormalRate(BigDecimal.ZERO);
                priceSettingDetail.setSuperRate(BigDecimal.ZERO);
                priceSettingDetail.setPriceSetting(priceSetting);

                priceSetting.getPriceSettingDetails().add(priceSettingDetail);
            }
        }

        priceSettingRepository.save(priceSetting);

        return priceSetting;
    }

    public List<Object[]> findRouteReceiveSummaryByBranchAndYearAndMonth(Integer branch, Integer year, Integer month) {
        return priceSettingRepository.findByYearAndMonth(branch, year, month);
    }

    public Integer save(TPriceSetting priceSetting) {
        for (TPriceSettingDetail priceSettingDetail : priceSetting.getPriceSettingDetails()) {
            priceSettingDetail.setPriceSetting(priceSetting);
        }

        priceSetting = priceSettingRepository.save(priceSetting);
        return priceSetting.getIndexNo();
    }

}
