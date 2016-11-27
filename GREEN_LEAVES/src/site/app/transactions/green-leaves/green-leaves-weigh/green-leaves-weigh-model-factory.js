(function () {
    angular.module("appModule")
            .factory("GreenLeavesWeighModelFactory", function () {
                var factory = {};
                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "branch": null,
                        "route": null,
                        "date": null,
                        "routeOfficer": null,
                        "routeHelper": null,
                        "vehicle": null,
                        "number": null,
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

                factory.newTempData = function () {
                    var tempData = {
                        "indexNo": null,
                        "quantity": 0,
                        "crates": 0,
                        "bags": 0,
                        "polyBags": 0,
                        "type": "NORMAL"//or SUPER
                    };

                    return tempData;
                };

                return factory;
            });
}());