/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.price_setting;

import com.mac.green_leaves.v1.green_leaves.price_setting.model.TClientLedgerBalance;
import com.mac.green_leaves.v1.green_leaves.price_setting.model.TPriceSetting;
import com.mac.green_leaves.v1.green_leaves.price_setting.model.TPriceSettingDetail;
import com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger.ClientLedgerSettlementTypes;
import com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger.ClientLedgerStatus;
import com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger.model.TClientLedger;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import com.mac.green_leaves.v1.green_leaves.zcommon.client_ledger.GLCommonClientLedgerRepository;

/**
 *
 * @author Mohan
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class GLPriceSettingService {

    @Autowired
    private GLPriceSettingRepository priceSettingRepository;

    @Autowired
    private GLClientLedgerBalanceRepository clientLedgerBalanceRepository;

    @Autowired
    private GLCommonClientLedgerRepository clientLedgerRepository;

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
        return priceSettingRepository.findGreenLeavesReceiveSummaryGroupByRoute(branch, year, month);
    }

    @Transactional
    public Integer save(TPriceSetting priceSetting) {
        Integer year = priceSetting.getYear();
        Integer month = priceSetting.getMonth();
        Integer branch = priceSetting.getBranch();

        //TODO:transaction
        //
        //save current price setting
        for (TPriceSettingDetail priceSettingDetail : priceSetting.getPriceSettingDetails()) {
            priceSettingDetail.setPriceSetting(priceSetting);
        }
        priceSetting = priceSettingRepository.save(priceSetting);
        //done saving price setting

        //new client ledger settlement details and new gl value entry
        List<TClientLedger> clientLedgers = new ArrayList<>();

        //get client gl value for month
        List<Object[]> clientGLValue = priceSettingRepository
                .findGreenLeavesReceiveValueGroupByClient(branch, year, month);
        Map<Integer, Double> clientGLValueMap = new HashMap<>();

        for (Object[] objects : clientGLValue) {
            Integer client = (Integer) objects[0];
            BigDecimal value = (BigDecimal) objects[1];
            if (value == null) {
                value = BigDecimal.ZERO;
            }

            //create client ledger for green leave value
            if (value.doubleValue() != 0.0) {
                clientLedgers.add(newClientLedger(
                        ClientLedgerSettlementTypes.GREEN_LEAVES.getSettlementType(),
                        ClientLedgerSettlementTypes.GREEN_LEAVES.getSettlementOrder(),
                        client,
                        value.doubleValue(),
                        0.0));
            }

            clientGLValueMap.put(client, value.doubleValue());
        }
        //done reading client gl value for month

        //get client ledger balance
        List<TClientLedgerBalance> clientLedgerBalances = clientLedgerBalanceRepository.findClientLedgerBalance(branch);
        //done

        //currently settled amount from client gl valueclientLedgers
        Map<Integer, Double> clientSettlementMap = new HashMap<>();

        //generate settlement amounts for client balances for settlement types
        for (TClientLedgerBalance clientLedgerBalance : clientLedgerBalances) {
            //client green leaves value
            Double clientValue = clientGLValueMap.get(clientLedgerBalance.getClient());
            clientValue = clientValue == null ? 0.0 : clientValue;

            //currently settled amount
            Double clientSettlement = clientSettlementMap.get(clientLedgerBalance.getClient());
            clientSettlement = clientSettlement == null ? 0.0 : clientSettlement;

            //current settlement from gl value
            Double currentSettlement = Math.min(clientValue - clientSettlement, clientLedgerBalance.getBalance().doubleValue());

            //create client leder settlement amounts and add to the list
            if (currentSettlement != 0.0) {
                clientLedgers.add(newClientLedger(
                        clientLedgerBalance.getSettlementType(),
                        clientLedgerBalance.getSettlementOrder(),
                        clientLedgerBalance.getClient(),
                        0.0,
                        currentSettlement));
            }
            //done create client ledger settlement amounts

            //update currently settled amount
            clientSettlement = clientSettlement + currentSettlement;
            clientSettlementMap.put(clientLedgerBalance.getClient(), clientSettlement);
        }
        //done generating settled amounts

        //create client ledger settlement total
        for (Integer client : clientSettlementMap.keySet()) {
            Double value = clientSettlementMap.get(client);
            if (value != 0.0) {
                clientLedgers.add(newClientLedger(
                        ClientLedgerSettlementTypes.GREEN_LEAVES.getSettlementType(),
                        ClientLedgerSettlementTypes.GREEN_LEAVES.getSettlementOrder(),
                        client,
                        0.0,
                        value));
            }
        }
        //done

        //TODO:delete previous client ledger information
        
        //save client ledger information
        for (TClientLedger clientLedger : clientLedgers) {
            clientLedger.setBranch(branch);
            clientLedger.setTransaction(0);
            clientLedger.setDate(new Date());//TODO:date
            clientLedger.setStatus(ClientLedgerStatus.ACTIVE);

            clientLedgerRepository.save(clientLedger);
        }

        return priceSetting.getIndexNo();
    }

    private TClientLedger newClientLedger(
            String settlementType,
            Integer settlementOrder,
            Integer client,
            Double debitAmount,
            Double creditAmount
    ) {
        TClientLedger clientLedger = new TClientLedger();

        clientLedger.setSettlementType(settlementType);
        clientLedger.setSettlementOrder(settlementOrder);
        clientLedger.setClient(client);
        clientLedger.setDebitAmount(BigDecimal.valueOf(debitAmount));
        clientLedger.setCreditAmount(BigDecimal.valueOf(creditAmount));

        return clientLedger;
    }

}
