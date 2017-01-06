(function () {
    angular.module("appModule")
            .factory("GreenLeavesDashBoardModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "fromDate": null,
                        "toDate": null,
                        "route": null,
                        "routeOfficer": null,
                        "routeHelper": null,
                        "vehicle": null
                    };
                    return data;
                };
                
                factory.totalSummry = function () {
                    var data = {
                        "totalNormalWeigh": 0.0,
                        "totalSuperWeigh": 0.0,
                        "totalNormalReceive": 0.0,
                        "totalSuperReceive": 0.0,
                        "bulkWeighNormalTotal": 0.0,
                        "bulkWeighSuperTotal": 0.0,
                        "bulkReceiveNormalTotal": 0.0,
                        "bulkReceiveSuperTotal": 0.0,
                        "supplierWeighNormalTotal": 0.0,
                        "supplierWeighSuperTotal": 0.0,
                        "supplierReceiveSuperTotal": 0.0,
                        "                                                                                                                                ": 0.0
                    };
                    return data;
                };
                
                factory.newGreenLeavesWeigh = function () {
                    var data = {
                        "indexNo": 0,
                        "branch": null,
                        "route": null,
                        "date": null,
                        "client": null,
                        "routeOfficer": null,
                        "routeHelper": null,
                        "vehicle": null,
                        "number": null,
                        "status": null,
                        "type": null,
                        "greenLeaveWeighDetails": [
                            /*{
                             "indexNo": 0,
                             "quantity": 0,
                             "crates": 0,
                             "bags": 0,
                             "polyBags": 0,
                             "type": "NORMAL"//or SUPER
                             }*/
                        ],
                        //normal leaves summary
                        "normalTotalWeight": 0.0,
                        "normalTareCalculated": 0.0,
                        "normalTareDeduction": 0.0,
                        "normalGeneralDeductionPercent": 4.0,
                        "normalGeneralDeduction": 0.0,
                        "normalWaterDeduction": 0.0,
                        "normalCoarseLeaves": 0.0,
                        "normalBoiledLeaves": 0.0,
                        "normalNetWeight": 0.0,
                        //normal tare summary
                        "normalCrates": 0,
                        "normalBags": 0,
                        "normalPolyBags": 0,
                        //super leaves summary
                        "superTotalWeight": 0.0,
                        "superTareCalculated": 0.0,
                        "superTareDeduction": 0.0,
                        "superGeneralDeductionPercent": 4.0,
                        "superGeneralDeduction": 0.0,
                        "superWaterDeduction": 0.0,
                        "superCoarseLeaves": 0.0,
                        "superBoiledLeaves": 0.0,
                        "superNetWeight": 0.0,
                        //super tare summary
                        "superCrates": 0,
                        "superBags": 0,
                        "superPolyBags": 0
                    };

                    return data;
                };
                return factory;
            });
}());