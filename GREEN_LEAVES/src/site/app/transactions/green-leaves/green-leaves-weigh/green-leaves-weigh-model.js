(function () {
    var factory = function (GreenLeavesWeighService, GreenLeavesWeighModelFactory, $q) {
        function GreenLeavesWeighModel() {
            this.constructor();
        }

        //prototype functions
        GreenLeavesWeighModel.prototype = {
            //weigh data
            data: {},
            //temp input
            tempData: {},
            //route information
            routes: [],
            //route officer information
            routeOfficers: [],
            //route helper information
            routeHelpers: [],
            //vehicle information
            vehicles: [],

            //constructor
            constructor: function () {
                var that = this;
                that.data = GreenLeavesWeighModelFactory.newData();
                that.tempData = GreenLeavesWeighModelFactory.newTempData();

                //load default values
                GreenLeavesWeighService.loadRoutes()
                        .success(function (data) {
                            that.routes = data;
                        });

                GreenLeavesWeighService.loadRouteOfficers()
                        .success(function (data) {
                            that.routeOfficers = data;
                        });

                GreenLeavesWeighService.loadRouteHelpers()
                        .success(function (data) {
                            that.routeHelpers = data;
                        });

                GreenLeavesWeighService.loadVehicles()
                        .success(function (data) {
                            that.vehicles = data;
                        });
            },

            //clear all data
            clear: function () {
                this.data = GreenLeavesWeighModelFactory.newData();
                this.tempData = GreenLeavesWeighModelFactory.newTempData();
            },

            //load from server
            load: function () {
                var defer = $q.defer();

                var that = this;
                var number = this.data.number;
                GreenLeavesWeighService.loadWeigh(number)
                        .success(function (data) {
                            that.data = {};
                            angular.extend(that.data, data);

                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });

                return defer.promise;
            },

            insertNormalDetail: function () {
                this.tempData.indexNo = null;
                this.tempData.type = 'NORMAL';

                return this.checkSummaryAndInsertDetail();
            },

            insertSuperDetail: function () {
                this.tempData.indexNo = null;
                this.tempData.type = 'SUPER';

                return this.checkSummaryAndInsertDetail();
            },

            deleteDetail: function (indexNo) {
                var that = this;
                GreenLeavesWeighService.deleteDetail(indexNo)
                        .success(function () {
                            var id = -1;
                            for (var i = 0; i < that.data.greenLeaveWeighDetails.length; i++) {
                                if (that.data.greenLeaveWeighDetails[i].indexNo === indexNo) {
                                    id = i;
                                }
                            }

                            that.data.greenLeaveWeighDetails.splice(id, 1);
                        });
            },

            checkSummaryAndInsertDetail: function () {
                var that = this;
                var defer = $q.defer();

                if (this.data.indexNo === null) {
                    GreenLeavesWeighService.saveWeigh(JSON.stringify(that.data))
                            .success(function (data) {
                                that.data.indexNo = data;

                                //insert detail
                                that.insertDetail()
                                        .then(function () {
                                            defer.resolve();
                                        });
                            })
                            .error(function (data) {
                                defer.reject();
                            });
                } else {
                    this.insertDetail()
                            .then(function () {
                                defer.resolve();
                            });
                }

                return defer.promise;
            },

            insertDetail: function () {
                var that = this;
                var defer = $q.defer();

                var quantity = this.tempData.quantity;
                var tareCount = this.tempData.crates
                        + this.tempData.bags
                        + this.tempData.polyBags;

                if (tareCount > 0 && quantity > 0) {
                    GreenLeavesWeighService.insertDetail(JSON.stringify(this.tempData), this.data.indexNo)
                            .success(function (data) {
                                that.tempData.indexNo = data;
                                that.data.greenLeaveWeighDetails.push(that.tempData);

                                that.tempData = GreenLeavesWeighModelFactory.newTempData();
                                that.validate();
                                defer.resolve();
                            })
                            .error(function (data) {
                                defer.reject();
                            });
                } else {
                    defer.reject();
                }

                return defer.promise;
            },

            validate: function () {
                var normalTotalWeight = 0.0;
                var superTotalWeight = 0.0;

                var normalCrates = 0;
                var normalBags = 0;
                var normalPolyBags = 0;

                var superCrates = 0;
                var superBags = 0;
                var superPolyBags = 0;
                angular.forEach(this.data.greenLeaveWeighDetails, function (value, key) {
                    if (value.type === 'NORMAL') {
                        normalTotalWeight = normalTotalWeight + parseFloat(value.quantity);

                        normalCrates = normalCrates + parseInt(value.crates);
                        normalBags = normalBags + parseInt(value.bags);
                        normalPolyBags = normalPolyBags + parseInt(value.polyBags);
                    } else if (value.type === 'SUPER') {
                        superTotalWeight = superTotalWeight + parseFloat(value.quantity);

                        superCrates = superCrates + parseInt(value.crates);
                        superBags = superBags + parseInt(value.bags);
                        superPolyBags = superPolyBags + parseInt(value.polyBags);
                    }
                });

                //general deduction
                var normalGeneralDeductionPercent = parseFloat(this.data.normalGeneralDeductionPercent);
                var normalGeneralDeduction = parseInt(normalGeneralDeductionPercent * normalTotalWeight / 100);
                this.data.normalGeneralDeduction = normalGeneralDeduction;

                var superGeneralDeductionPercent = parseFloat(this.data.superGeneralDeductionPercent);
                var superGeneralDeduction = parseInt(superGeneralDeductionPercent * superTotalWeight / 100);
                this.data.superGeneralDeduction = superGeneralDeduction;

                //net value
                var normalNetWeight = normalTotalWeight
                        - parseFloat(this.data.normalTareDeduction)
                        - parseFloat(this.data.normalGeneralDeduction)
                        - parseFloat(this.data.normalWaterDeduction)
                        - parseFloat(this.data.normalCoarseLeaves)
                        - parseFloat(this.data.normalBoiledLeaves);

                var superNetWeight = superTotalWeight
                        - parseFloat(this.data.superTareDeduction)
                        - parseFloat(this.data.superGeneralDeduction)
                        - parseFloat(this.data.superWaterDeduction)
                        - parseFloat(this.data.superCoarseLeaves)
                        - parseFloat(this.data.superBoiledLeaves);

                this.data.normalTotalWeight = normalTotalWeight;
                this.data.normalNetWeight = normalNetWeight;

                this.data.superTotalWeight = superTotalWeight;
                this.data.superNetWeight = superNetWeight;

                //tare count
                this.data.normalCrates = normalCrates;
                this.data.normalBags = normalBags;
                this.data.normalPolyBags = normalPolyBags;

                this.data.superCrates = superCrates;
                this.data.superBags = superBags;
                this.data.superPolyBags = superPolyBags;
            },

            //return label for route
            routeLabel: function (indexNo) {
                var label;
                angular.forEach(this.routes, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return label;
            },

            //return label for route officer
            routeOfficerLabel: function (indexNo) {
                var label;
                angular.forEach(this.routeOfficers, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return label;
            },

            //return label for route helpers
            routeHelperLabel: function (indexNo) {
                var label;
                angular.forEach(this.routeHelpers, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return label;
            },

            //return label for route officer
            vehicleLabel: function (indexNo) {
                var label;
                angular.forEach(this.vehicles, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.indexNo + "-" + value.vehicleNo;
                        return;
                    }
                });
                return label;
            }

        };

        return GreenLeavesWeighModel;
    };

    angular.module("appModule")
            .factory("GreenLeavesWeighModel", factory);
}());