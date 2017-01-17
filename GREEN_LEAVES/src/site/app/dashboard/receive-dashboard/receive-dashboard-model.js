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
            totalGreenLevasReceiveData: {
                normalGreenLeaves: 0.0,
                superlGreenLeaves: 0.0
            },
            totalGreenLevasWeighData: {
                normalGreenLeaves: 0.0,
                superlGreenLeaves: 0.0
            },
            greenLeavesReceveChartSummry: {
                routes: [],
                greenLeavesQtys: [[], []]
            },
            greenLeavesBulkWeighChartSummry: {
                routes: [],
                greenLeavesQtys: [[], []]
            },
            greenLeavesReceiveList: [],
            greenLeavesBulkWeighList: [],
            greenLeavesClientReceiveList: [],
            crossReportDetailList: [],
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
            clear: function () {
                this.data = {};
                this.totalGreenLevas = {
                    normalGreenLeaves: 0.0,
                    superlGreenLeaves: 0.0
                };
                this.totalGreenLevasReceiveData = {
                    normalGreenLeaves: 0.0,
                    superlGreenLeaves: 0.0
                };
                this.totalGreenLevasWeighData = {
                    normalGreenLeaves: 0.0,
                    superlGreenLeaves: 0.0
                };
                this.greenLeavesReceveChartSummry = {
                    routes: [],
                    greenLeavesQtys: [[], []]
                };
                this.greenLeavesBulkWeighChartSummry = {
                    routes: [],
                    greenLeavesQtys: [[], []]
                };
                this.greenLeavesReceiveList = [];
                this.greenLeavesBulkWeighList = [];
                this.greenLeavesClientReceiveList = [];
                this.crossReportDetailList = [];
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
                            that.greenLeavesBulkWeighList = [];
                            that.totalGreenLevasWeighData = {
                                normalGreenLeaves: 0.0,
                                superlGreenLeaves: 0.0
                            };
                            that.greenLeavesBulkWeighChartSummry = {
                                routes: [],
                                greenLeavesQtys: [[], []]
                            };

                            that.greenLeavesBulkWeighList = data;
                            that.greenLeavesBulkWeighChartDetails();
                            that.getTotalGreenLeavesWeigh();
                            defer.resolve();
                        })
                        .error(function () {
                            that.getTotalGreenLeavesWeigh();
                            that.getTotalClientGreenLeavesReceive();
                            that.greenLeavesBulkWeighList = [];
                            that.totalGreenLevasWeighData = {
                                normalGreenLeaves: 0.0,
                                superlGreenLeaves: 0.0
                            };
                            that.greenLeavesBulkWeighChartSummry = {
                                routes: [],
                                greenLeavesQtys: [[], []]
                            };
                            defer.reject();
                        });

                return defer.promise;
            }, greenLeavesReceiveSummry: function (type) {
                console.log("greenLeavesReceiveSummry");
                var defer = $q.defer();
                var that = this;
                that.data.type = type;
                GreenLeavesDashBoardService.getGreenReceiveLeavesSummary(JSON.stringify(that.data))
                        .success(function (data) {
                            that.greenLeavesReceiveList = [];
                            that.greenLeavesClientReceiveList = [];
                            that.totalGreenLevas = {
                                normalGreenLeaves: 0.0,
                                superlGreenLeaves: 0.0
                            };
                            that.totalGreenLevasReceiveData = {
                                normalGreenLeaves: 0.0,
                                superlGreenLeaves: 0.0
                            };
                            that.greenLeavesReceveChartSummry = {
                                routes: [],
                                greenLeavesQtys: [[], []]
                            };

                            if (type === 'normal') {
                                that.greenLeavesReceiveList = data;
                                that.getTotalGreenLeavesReceive();
                                that.greenLeavesChartDetails();
                            } else {
                                that.greenLeavesClientReceiveList = data;
                                that.getTotalClientGreenLeavesReceive();
                                that.greenLeavesClientChartDetails();
                            }

                            defer.resolve();
                        })
                        .error(function () {
                            that.getTotalGreenLeavesReceive();
                            that.greenLeavesReceiveList = [];
                            that.greenLeavesClientReceiveList = [];
                            totalGreenLevas = {
                                normalGreenLeaves: 0.0,
                                superlGreenLeaves: 0.0
                            };
                            that.totalGreenLevasReceiveData = {
                                normalGreenLeaves: 0.0,
                                superlGreenLeaves: 0.0
                            };
                            that.greenLeavesReceveChartSummry = {
                                routes: [],
                                greenLeavesQtys: [[], []]
                            };
                            defer.reject();
                        });
                return defer.promise;
            },
            crossReportSummry: function (type) {
                console.log("crossReportSummry");
                var defer = $q.defer();
                var that = this;
                GreenLeavesDashBoardService.getCrossReportDetails(JSON.stringify(that.data))
                        .success(function (data) {
                            that.crossReportDetailList = [];
                            that.crossReportDetailList = data;
                            defer.resolve();
                        })
                        .error(function () {
                            that.crossReportDetailList = [];
                            defer.reject();
                        });
                return defer.promise;
            },
            greenLeavesChartDetails: function () {
                var that = this;
                that.chartDetails = {};
                angular.forEach(this.greenLeavesReceiveList, function (glr) {
                    angular.forEach(glr.greenLeavesReceiveDetails, function (glrd) {
                        var quantity = that.chartDetails[glr.date];
                        if (typeof quantity === 'undefined') {
                            quantity = ['', 0.0, 0.0];
                        }

                        that.chartDetails[glr.date] = [
                            quantity[0] = glr.date,
                            quantity[1] + glrd.normalLeavesQuantity,
                            quantity[2] + glrd.superLeavesQuantity
                        ];
                    });
                });

                //console.log(that.chartDetails);
                angular.forEach(that.chartDetails, function (value) {
                    that.greenLeavesReceveChartSummry.routes.push(value[0]);
                    that.greenLeavesReceveChartSummry.greenLeavesQtys[0].push(value[1]);
                    that.greenLeavesReceveChartSummry.greenLeavesQtys[1].push(value[2]);
                });

                return that.greenLeavesReceveChartSummry;
            },
            greenLeavesClientChartDetails: function () {
                var that = this;
                that.chartDetails = {};
                angular.forEach(that.greenLeavesClientReceiveList, function (glr) {
                    var quantity = that.chartDetails[glr.date];
                    if (typeof quantity === 'undefined') {
                        quantity = ['', 0.0, 0.0];
                    }

                    that.chartDetails[glr.date] = [
                        quantity[0] = glr.date,
                        quantity[1] + glr.greenLeavesReceiveDetails[0].normalLeavesQuantity,
                        quantity[2] + glr.greenLeavesReceiveDetails[0].superLeavesQuantity
                    ];
                });

                angular.forEach(that.chartDetails, function (value) {
                    that.greenLeavesReceveChartSummry.routes.push(value[0]);
                    that.greenLeavesReceveChartSummry.greenLeavesQtys[0].push(value[1]);
                    that.greenLeavesReceveChartSummry.greenLeavesQtys[1].push(value[2]);
                });

                return that.greenLeavesReceveChartSummry;
            },
            greenLeavesBulkWeighChartDetails: function () {
                var that = this;
                that.chartDetails = {};
                angular.forEach(this.greenLeavesBulkWeighList, function (glr) {
                    var quantity = that.chartDetails[glr.date];
                    if (typeof quantity === 'undefined') {
                        quantity = ['', 0.0, 0.0];
                    }

                    that.chartDetails[glr.date] = [
                        quantity[0] = glr.date,
                        quantity[1] + glr.normalNetWeight,
                        quantity[2] + glr.superNetWeight
                    ];
                });

                angular.forEach(that.chartDetails, function (value) {
                    that.greenLeavesBulkWeighChartSummry.routes.push(value[0]);
                    that.greenLeavesBulkWeighChartSummry.greenLeavesQtys[0].push(value[1]);
                    that.greenLeavesBulkWeighChartSummry.greenLeavesQtys[1].push(value[2]);
                });
                return that.greenLeavesBulkWeighChartSummry;
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
            getTotalGreenLeavesReceive: function () {
                var that = this;
                angular.forEach(this.greenLeavesReceiveList, function (value) {
                    that.totalGreenLevasReceiveData.normalGreenLeaves += that.getTotalNormalGreenLeavesAndTotalSuperLeavse(value.indexNo).normalGreenLeaves;
                    that.totalGreenLevasReceiveData.superlGreenLeaves += that.getTotalNormalGreenLeavesAndTotalSuperLeavse(value.indexNo).superlGreenLeaves;
                });
                return that.totalGreenLevasReceiveData;
            },
            getTotalClientGreenLeavesReceive: function () {
                var that = this;
                angular.forEach(this.greenLeavesClientReceiveList, function (value) {
                    that.totalGreenLevasReceiveData.normalGreenLeaves += value.greenLeavesReceiveDetails[0].normalLeavesQuantity;
                    that.totalGreenLevasReceiveData.superlGreenLeaves += value.greenLeavesReceiveDetails[0].superLeavesQuantity;
                });
                return that.totalGreenLevasReceiveData;
            },
            getTotalGreenLeavesWeigh: function () {
                var that = this;
                angular.forEach(this.greenLeavesBulkWeighList, function (value) {
                    that.totalGreenLevasWeighData.normalGreenLeaves += value.normalNetWeight;
                    that.totalGreenLevasWeighData.superlGreenLeaves += value.superNetWeight;
                });
                return that.totalGreenLevasWeighData;
            },
            //green leaves summmry table selectd row get 
            greenLeaveWeighDetailsByIndexNo: function (indexNo) {
                var that = this;
                angular.forEach(that.greenLeavesBulkWeighList, function (value) {
                    if (value.indexNo === indexNo) {
                        that.greenLeavesWeigh = value;
                    }
                });
                return that.greenLeavesWeigh;
            },
            getClientRoute: function (indexNo) {
                var label;
                angular.forEach(this.clients, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.route;
                        return;
                    }
                });
                console.log(label);
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
            },
            client: function (indexNo) {
                var client;
                angular.forEach(this.clients, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        client = value;
                        return;
                    }
                });
                return client;
            },
            searchClientByClientNo: function (clientNumber) {
                var client;
                angular.forEach(this.clients, function (value) {
                    ;
                    if (value.clientNumber === parseInt(clientNumber)) {
                        client = value;
                        return;
                    }
                });
                return client;
            }
        };
        return GreenLeavesDashBoardModel;
    };
    angular.module("appModule")
            .factory("GreenLeavesDashBoardModel", factory);
}());