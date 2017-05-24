/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.dashboard.receive_dashboard_2.model;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedNativeQuery;
import javax.persistence.SqlResultSetMapping;

/**
 *
 * @author hjcha
 */
@Entity
@SqlResultSetMapping(
        name = "receiveSummaryMapping",
        classes = {
            @ConstructorResult(
                    targetClass = ReceiveDetail2.class,
                    columns = {
                        @ColumnResult(name = "route_index_no")
                        ,@ColumnResult(name = "route_name")
                        ,@ColumnResult(name = "factory_normal")
                        ,@ColumnResult(name = "factory_super")
                        ,@ColumnResult(name = "collection_normal")
                        ,@ColumnResult(name = "collection_super")
                    }
            )
        }
)
@NamedNativeQuery(name = "ReceiveDetail2.findReceiveDetails",
        query = "select\n"
        + "	route.index_no as route_index_no,\n"
        + "	route.name as route_name,\n"
        + "\n"
        + "	(select ifnull(sum(weigh1.normal_net_weight),0.0) from t_green_leaves_weigh weigh1 where weigh1.route = route.index_no and weigh1.`type` = 'BULK' and weigh1.`status` <> 'DELETED' and weigh1.date between :fromDate and :toDate) as factory_normal,\n"
        + "	(select ifnull(sum(weigh2.super_net_weight),0.0) from t_green_leaves_weigh weigh2 where weigh2.route = route.index_no and weigh2.`type` = 'BULK' and weigh2.`status` <> 'DELETED' and weigh2.date between :fromDate and :toDate) as factory_super,\n"
        + "\n"
        + "	(select ifnull(sum(receive_detail1.normal_leaves_quantity),0.0) from t_green_leaves_receive receive1 left join t_green_leaves_receive_detail receive_detail1 on receive_detail1.green_leaves_receive = receive1.index_no where receive1.route = route.index_no and receive1.`type` = 'BULK' and receive1.`status` <> 'DELETED' and receive1.date between :fromDate and :toDate) as collection_normal,\n"
        + "	(select ifnull(sum(receive_detail2.super_leaves_quantity),0.0) from t_green_leaves_receive receive2 left join t_green_leaves_receive_detail receive_detail2 on receive_detail2.green_leaves_receive = receive2.index_no where receive2.route = route.index_no and receive2.`type` = 'BULK' and receive2.`status` <> 'DELETED' and receive2.date between :fromDate and :toDate) as collection_super\n"
        + "from\n"
        + "	m_route route\n"
        + "where\n"
        + "	route.branch = :branch",
        resultSetMapping = "receiveSummaryMapping"
)
public class ReceiveDetail2 implements Serializable {

    @Id
    private Integer routeIndexNo;
    private String routeName;
    private BigDecimal factoryNormal;
    private BigDecimal factorySuper;
    private BigDecimal collectionNormal;
    private BigDecimal collectionSuper;

    public ReceiveDetail2() {
    }

    public ReceiveDetail2(Integer routeIndexNo, String routeName, BigDecimal factoryNormal, BigDecimal factorySuper, BigDecimal collectionNormal, BigDecimal collectionSuper) {
        this.routeIndexNo = routeIndexNo;
        this.routeName = routeName;
        this.factoryNormal = factoryNormal;
        this.factorySuper = factorySuper;
        this.collectionNormal = collectionNormal;
        this.collectionSuper = collectionSuper;
    }

    public Integer getRouteIndexNo() {
        return routeIndexNo;
    }

    public void setRouteIndexNo(Integer routeIndexNo) {
        this.routeIndexNo = routeIndexNo;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public BigDecimal getFactoryNormal() {
        return factoryNormal;
    }

    public void setFactoryNormal(BigDecimal factoryNormal) {
        this.factoryNormal = factoryNormal;
    }

    public BigDecimal getFactorySuper() {
        return factorySuper;
    }

    public void setFactorySuper(BigDecimal factorySuper) {
        this.factorySuper = factorySuper;
    }

    public BigDecimal getCollectionNormal() {
        return collectionNormal;
    }

    public void setCollectionNormal(BigDecimal collectionNormal) {
        this.collectionNormal = collectionNormal;
    }

    public BigDecimal getCollectionSuper() {
        return collectionSuper;
    }

    public void setCollectionSuper(BigDecimal collectionSuper) {
        this.collectionSuper = collectionSuper;
    }

}
