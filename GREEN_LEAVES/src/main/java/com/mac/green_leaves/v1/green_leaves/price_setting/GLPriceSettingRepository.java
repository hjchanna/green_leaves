/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.price_setting;

import com.mac.green_leaves.v1.green_leaves.price_setting.model.TPriceSetting;
import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mohan
 */
public interface GLPriceSettingRepository extends JpaRepository<TPriceSetting, Integer> {

    public List<TPriceSetting> findByYearAndMonthAndBranch(Integer year, Integer month, Integer branch);

    @Query(value = "SELECT MAX(number) FROM t_price_setting WHERE branch=:branch", nativeQuery = true)
    public Integer getMaximumNumberByBranch(@Param("branch") Integer branch);

    @Query(value = "SELECT \n"
            + "	t_green_leaves_receive.route,\n"
            + "	sum(t_green_leaves_receive_detail.normal_leaves_quantity), \n"
            + "	sum(t_green_leaves_receive_detail.super_leaves_quantity) \n"
            + "FROM \n"
            + "	t_green_leaves_receive\n"
            + "	LEFT JOIN t_green_leaves_receive_detail ON t_green_leaves_receive.index_no = t_green_leaves_receive_detail.green_leaves_receive \n"
            + "where \n"
            + "	t_green_leaves_receive.branch = :branch\n"
            + "	and year(t_green_leaves_receive.date)= :year\n"
            + "	and month(t_green_leaves_receive.date) = :month\n"
            + "GROUP BY \n"
            + "	t_green_leaves_receive.route", nativeQuery = true)
    public List<Object[]> findGreenLeavesReceiveSummaryGroupByRoute(@Param("branch") Integer branch, @Param("year") Integer year, @Param("month") Integer month);

    @Query(value = "SELECT \n"
            + "	t_green_leaves_receive_detail.`client`,\n"
            + "	cast(sum((t_green_leaves_receive_detail.normal_leaves_quantity) * (select \n"
            + "		t_price_setting_detail.normal_rate \n"
            + "	from \n"
            + "		t_price_setting_detail \n"
            + "		left join t_price_setting on t_price_setting.index_no = t_price_setting_detail.price_setting \n"
            + "	where t_price_setting.year = :year \n"
            + "			and t_price_setting.month = :month "
            + "                 and t_price_setting.branch = :branch\n"
            + "			and t_price_setting_detail.route = t_green_leaves_receive.route))\n"
            + "			+\n"
            + "	sum((t_green_leaves_receive_detail.super_leaves_quantity) * (select \n"
            + "		t_price_setting_detail.super_rate \n"
            + "	from \n"
            + "		t_price_setting_detail \n"
            + "		left join t_price_setting on t_price_setting.index_no = t_price_setting_detail.price_setting \n"
            + "	where t_price_setting.year = :year \n"
            + "			and t_price_setting.month = :month \n"
            + "                 and t_price_setting.branch = :branch\n"
            + "			and t_price_setting_detail.route = t_green_leaves_receive.route)) as decimal(10,4))\n"
            + "			\n"
            + "FROM \n"
            + "	t_green_leaves_receive_detail\n"
            + "	LEFT JOIN t_green_leaves_receive ON t_green_leaves_receive.index_no = t_green_leaves_receive_detail.green_leaves_receive \n"
            + "where \n"
            + "	t_green_leaves_receive.branch = :branch\n"
            + "	and year(t_green_leaves_receive.date)= :year\n"
            + "	and month(t_green_leaves_receive.date) = :month\n"
            + "GROUP BY \n"
            + "	t_green_leaves_receive_detail.`client`", nativeQuery =  true)
    public List<Object[]> findGreenLeavesReceiveValueGroupByClient(@Param("branch") Integer branch, @Param("year") Integer year, @Param("month") Integer month);

    @Query(value = "select index_no from m_route", nativeQuery = true)
    public List<Integer> findRoutes();

}
