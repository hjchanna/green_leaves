(function () {
    var factory = function (GreenLeavesWeighService) {
        function GreenLeavesWeighModel(data) {
            if (!data) {
                data = {
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
            }

            this.constructor(data);
        }

        //prototype functions
        GreenLeavesWeighModel.prototype = {
            //weigh data
            data: {},
            //route information
            routes: [],
            //route officer information
            routeOfficers: [],
            //route helper information
            routeHelpers: [],
            //vehicle information
            vehicles: [],
            //temp input
            tempData: {},

            //constructor
            constructor: function (data) {
                angular.extend(this.data, data);

                //load default values
                GreenLeavesWeighService.loadRoutes()
                        .success(function (data) {
                            this.routes = data;
                        });

                GreenLeavesWeighService.loadRouteOfficers()
                        .success(function (data) {
                            this.routeOfficers = data;
                        });

                GreenLeavesWeighService.loadRouteHelpers()
                        .success(function (data) {
                            this.routeHelpers = data;
                        });

                GreenLeavesWeighService.loadVehicles()
                        .success(function (data) {
                            this.vehicles = data;
                        });
            },

            //clear all data
            clear: function () {
                this.data = {};
                this.tempData = {};
            },

            load: function () {
                var number = this.data.number;
                GreenLeavesWeighService.loadWeigh(number)
                        .success(function (data) {
                            this.data = {};
                            angular.extend(this.data, data);
                        });
            }
        };

        return GreenLeavesWeighModel;
    };

    angular.module("appModule")
            .factory("GreenLeavesWeighModel", factory);
}());