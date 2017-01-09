(function () {
    var factory = function (GreenLeavesDashBoardService, GreenLeavesDashBoardModelFactory, $filter, $q) {
        function GreenLeavesDashBoardModel() {
            this.constructor();
        }

//prototype functions
        GreenLeavesDashBoardModel.prototype = {
//data
            data: {},
            totalSummry: {},
            greenLeavesWeigh: {},
            //client information
            clients: [],
            //route information
            routes: [],
            //branch information
            branchs: [],
            //route officer information
            routeOfficers: [],
            //route helper information
            routeHelpers: [],
            //vehicle information 
            vehicles: [],
            totalGreenLevas: {
                normalGreenLeaves: 0.0,
                superlGreenLeaves: 0.0
            },
            greenLeavesReceveChartSummry: {
                routes: [],
                greenLeavesQtys: [[], []]
            },
            greenLeavesReceiveList: [],
            greenLeavesBulkWeighList: [],
            constructor: function () {
                var that = this;
                that.data = GreenLeavesDashBoardModelFactory.newData();
                that.totalSummry = GreenLeavesDashBoardModelFactory.totalSummry();
                that.greenLeavesWeigh = GreenLeavesDashBoardModelFactory.newGreenLeavesWeigh();
                GreenLeavesDashBoardService.loadRoutes()
                        .success(function (data) {
                            that.routes = data;
                        });
                GreenLeavesDashBoardService.loadRouteOfficers()
                        .success(function (data) {
                            that.routeOfficers = data;
                        });
                GreenLeavesDashBoardService.loadRouteHelpers()
                        .success(function (data) {
                            that.routeHelpers = data;
                        });
                GreenLeavesDashBoardService.loadVehicles()
                        .success(function (data) {
                            that.vehicles = data;
                        });
                GreenLeavesDashBoardService.loadBranch()
                        .success(function (data) {
                            that.branchs = data;
                        });
                GreenLeavesDashBoardService.loadClient()
                        .success(function (data) {
                            that.clients = data;
                        });
            },
            greenLeavesAllSummry: function () {
                console.log("greenLeavesAllSummry");
//                var defer = $q.defer();
//                var that = this;
//                var toDate = $filter('date')(that.data.toDate, 'yyyy-MM-dd');
//                var fromDate = $filter('date')(that.data.fromDate, 'yyyy-MM-dd');
//                var route = that.data.route;
//                var routeOfficer = that.data.routeOfficer;
//                var routeHelper = that.data.routeHelper;
//                var vehicle = that.data.vehicle;
//                console.log("++++++++++++++++++");
//                console.log(that.date);
//                GreenLeavesDashBoardService.getGreenLeavesSummary(that.data)
//                        .success(function (data) {
//                            that.totalSummry = {};
//                            angular.extend(that.totalSummry, data);
//                            defer.resolve();
//                        })
//                        .error(function () {
//                            defer.reject();
//                            that.greenLeavesBulkWeighList = [];
//                        });
//
//                return defer.promise;
            },
            getGreenLeavesWeighSummry: function (type) {
                console.log("getGreenLeavesWeighSummry");
                var defer = $q.defer();
                var that = this;
                that.data.type = type;
                GreenLeavesDashBoardService.getGreenWeighLeavesSummary(JSON.stringify(that.data))
                        .success(function (data) {
                            that.greenLeavesBulkWeighList = data;
                            defer.resolve();
                        })
                        .error(function () {
                            that.greenLeavesBulkWeighList = [];
                            defer.reject();
                        });

                return defer.promise;
            }, greenLeavesReceiveSummry: function () {
                console.log("greenLeavesReceiveSummry");
                var defer = $q.defer();
                var that = this;
                GreenLeavesDashBoardService.getGreenReceiveLeavesSummary(JSON.stringify(that.data))
                        .success(function (data) {
                            that.greenLeavesReceiveList = data;
                            defer.resolve();
                        })
                        .error(function () {
                            that.greenLeavesReceiveList = [];
                            defer.reject();
                        });
                return defer.promise;


            },
            greenLeavesChatFillData: function () {
                var that = this;
                var defer = $q.defer();
                var fromDate = $filter('date')(that.data.fromDate, 'yyyy-MM-dd');
                var toDate = $filter('date')(that.data.toDate, 'yyyy-MM-dd');
                GreenLeavesDashBoardService.getGreenLeavesChartDetails(fromDate, toDate)
                        .success(function (data) {
                            defer.resolve();
                            angular.forEach(data, function (value) {
                                that.greenLeavesReceveChartSummry.routes.push(that.routeLabel(value[0]));
                                that.greenLeavesReceveChartSummry.greenLeavesQtys[0].push(value[1]);
                                that.greenLeavesReceveChartSummry.greenLeavesQtys[1].push(value[2]);
                            });
                        })
                        .error(function (data) {
                            //that.greenLeavesReceveChartSummry = {};
                            defer.reject();
                        });
                return that.greenLeavesReceveChartSummry;
            },
            getTotalNormalGreenLeavesAndTotalSuperLeavse: function (indexNo) {
                var normalLeavesQuantity = 0.0;
                var superLeavesQuantity = 0.0;
                var that = this;
                angular.forEach(this.greenLeavesReceiveList, function (value) {
                    if (value.indexNo === indexNo) {
                        angular.forEach(value.greenLeavesReceiveDetails, function (value) {
                            normalLeavesQuantity += value.normalLeavesQuantity;
                            superLeavesQuantity += value.superLeavesQuantity;
                            that.totalGreenLevas.normalGreenLeaves = normalLeavesQuantity;
                            that.totalGreenLevas.superlGreenLeaves = superLeavesQuantity;
                        });
                    }
                });
                return that.totalGreenLevas;
            },
            //green leaves summmry table selectd row get 
            greenLeaveWeighDetailsByIndexNo: function (indexNo) {
                console.log(indexNo);
                var defer = $q.defer();
                var that = this;
                GreenLeavesDashBoardService.greenLeaveWeighDetailsByIndexNo(indexNo)
                        .success(function (data) {
                            that.greenLeavesWeigh = {};
                            angular.extend(that.greenLeavesWeigh, data);
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            greenLeaveReceiveDetailsByIndexNo: function (indexNo) {
                var label;
                angular.forEach(this.routes, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return label;
            },
            //return label for branch
            bracnhLable: function (indexNo) {
                var lable;
                angular.forEach(this.branchs, function (value) {
                    if (value.indexNo === indexNo) {
                        lable = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return lable;
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
            },
            //return lable for client
            clientLabel: function (indexNo) {
                var label;
                angular.forEach(this.clients, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.clientNumber + "-" + value.name;
                        return;
                    }
                });
                return label;
            }
        };
        return GreenLeavesDashBoardModel;
    };
    angular.module("appModule")
            .factory("GreenLeavesDashBoardModel", factory);
}());