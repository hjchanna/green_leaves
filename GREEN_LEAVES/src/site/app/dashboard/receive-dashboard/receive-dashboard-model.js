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
            //green leaves daily and monthly details
            dailyAndMonthlySummryDetails: {
                dailyNormalFactory: 0.0,
                dailySuperFactory: 0.0,
                monthlyNormalFactory: 0.0,
                monthlySuperFactory: 0.0,
                dailyNormalRoute: 0.0,
                dailySuperRoute: 0.0,
                monthlyNormalRoute: 0.0,
                monthlySuperRoute: 0.0,
                totalDaily: 0.0,
                totalMonthly: 0.0
            },
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
            greenLeavesReceveChartSummryRouteVise: {
                routes: [],
                greenLeavesQtys: [[], []]
            },
            greenLeavesReceveChartSummryRouteVehicleVise: {
                vehicle: [],
                greenLeavesQtys: [[], []]
            },
            greenLeavesBulkWeighChartSummry: {
                routes: [],
                greenLeavesQtys: [[], []]
            },
            greenLeavesBulkWeighChartSummryRouteVise: {
                routes: [],
                greenLeavesQtys: [[], []]
            },
            greenLeavesBulkWeighChartSummryVehicleVise: {
                vehicle: [],
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
                this.greenLeavesReceveChartSummryRouteVise = {
                    routes: [],
                    greenLeavesQtys: [[], []]
                };
                this.greenLeavesReceveChartSummryRouteVehicleVise = {
                    vehicle: [],
                    greenLeavesQtys: [[], []]
                };
                this.greenLeavesBulkWeighChartSummry = {
                    routes: [],
                    greenLeavesQtys: [[], []]
                };
                this.greenLeavesBulkWeighChartSummryRouteVise = {
                    routes: [],
                    greenLeavesQtys: [[], []]
                };
                this.greenLeavesBulkWeighChartSummryVehicleVise = {
                    vehicle: [],
                    greenLeavesQtys: [[], []]
                };
                this.greenLeavesReceiveList = [];
                this.greenLeavesBulkWeighList = [];
                this.greenLeavesClientReceiveList = [];
                this.crossReportDetailList = [];
                this.dailyAndMonthlySummryDetails = {
                    dailyNormalFactory: 0.0,
                    dailySuperFactory: 0.0,
                    monthlyNormalFactory: 0.0,
                    monthlySuperFactory: 0.0,
                    dailyNormalRoute: 0.0,
                    dailySuperRoute: 0.0,
                    monthlyNormalRoute: 0.0,
                    monthlySuperRoute: 0.0,
                    totalDaily: 0.0,
                    totalMonthly: 0.0
                };
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
            //------------------------------- summry details functions -------------------------------

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
                            that.greenLeavesBulkWeighChartSummryRouteVise = {
                                routes: [],
                                greenLeavesQtys: [[], []]
                            };
                            that.greenLeavesBulkWeighChartSummryVehicleVise = {
                                vehicle: [],
                                greenLeavesQtys: [[], []]
                            };

                            that.greenLeavesBulkWeighList = data;
                            that.greenLeavesBulkWeighChartDetails();
                            that.greenLeavesBulkWeighChartDetailsRouteVise();
                            that.greenLeavesBulkWeighChartDetailsVehicleVise();
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
                            that.greenLeavesBulkWeighChartSummryRouteVise = {
                                routes: [],
                                greenLeavesQtys: [[], []]
                            };
                            that.greenLeavesBulkWeighChartSummryVehicleVise = {
                                vehicle: [],
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

                var date = $filter('date')(that.data.toDate, 'yyyy-MM-dd');
                GreenLeavesDashBoardService.getDailyAndMonthlySummryDetails(date)
                        .success(function (data) {
                            that.dailyAndMonthlySummryDetails.dailyNormalFactory = data.dailyFactory[0];
                            that.dailyAndMonthlySummryDetails.dailySuperFactory = data.dailyFactory[1];

                            that.dailyAndMonthlySummryDetails.monthlyNormalFactory = data.monthlyFactory[0];
                            that.dailyAndMonthlySummryDetails.monthlySuperFactory = data.monthlyFactory[1];

                            that.dailyAndMonthlySummryDetails.dailyNormalRoute = data.dailyRouteWise[0];
                            that.dailyAndMonthlySummryDetails.dailySuperRoute = data.dailyRouteWise[1];

                            that.dailyAndMonthlySummryDetails.monthlyNormalRoute = data.monthlyRouteWise[0];
                            that.dailyAndMonthlySummryDetails.monthlySuperRoute = data.monthlyRouteWise[1];

                            var totalDaily = data.dailyFactory[0] + data.dailyFactory[1] + data.dailyRouteWise[0] + data.dailyRouteWise[1];
                            var totalMonthly = data.monthlyFactory[0] + data.monthlyFactory[1] + data.monthlyRouteWise[0] + data.monthlyRouteWise[1];
                            that.dailyAndMonthlySummryDetails.totalDaily = totalDaily;
                            that.dailyAndMonthlySummryDetails.totalMonthly = totalMonthly;
                        });

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
                            that.greenLeavesReceveChartSummryRouteVise = {
                                routes: [],
                                greenLeavesQtys: [[], []]
                            };
                            that.greenLeavesReceveChartSummryRouteVehicleVise = {
                                vehicle: [],
                                greenLeavesQtys: [[], []]
                            };

                            if (type === 'normal') {
                                that.greenLeavesReceiveList = data;
                                that.getTotalGreenLeavesReceive();
                                that.greenLeavesChartDetails();
                                that.greenLeavesChartDetailsRouteVise();
                                that.greenLeavesChartDetailsVehicleVise();
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
                            that.greenLeavesReceveChartSummryRouteVise = {
                                routes: [],
                                greenLeavesQtys: [[], []]
                            };
                            that.greenLeavesReceveChartSummryRouteVehicleVise = {
                                vehicle: [],
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
            //------------------------------- chart details -------------------------------
            //date vise
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

                angular.forEach(that.chartDetails, function (value) {
                    that.greenLeavesReceveChartSummry.routes.push(value[0]);
                    that.greenLeavesReceveChartSummry.greenLeavesQtys[0].push(value[1]);
                    that.greenLeavesReceveChartSummry.greenLeavesQtys[1].push(value[2]);
                });

                return that.greenLeavesReceveChartSummry;
            },
            //route vise
            greenLeavesChartDetailsRouteVise: function () {
                var that = this;
                that.chartDetails = {};
                angular.forEach(this.greenLeavesReceiveList, function (glr) {
                    angular.forEach(glr.greenLeavesReceiveDetails, function (glrd) {
                        var quantity = that.chartDetails[glr.route];
                        if (typeof quantity === 'undefined') {
                            quantity = ['', 0.0, 0.0];
                        }

                        that.chartDetails[glr.route] = [
                            quantity[0] = glr.route,
                            quantity[1] + glrd.normalLeavesQuantity,
                            quantity[2] + glrd.superLeavesQuantity
                        ];
                    });
                });

                //console.log(that.chartDetails);
                angular.forEach(that.chartDetails, function (value) {
                    that.greenLeavesReceveChartSummryRouteVise.routes.push(that.routeLabel(value[0]));
                    that.greenLeavesReceveChartSummryRouteVise.greenLeavesQtys[0].push(value[1]);
                    that.greenLeavesReceveChartSummryRouteVise.greenLeavesQtys[1].push(value[2]);
                });
                return that.greenLeavesReceveChartSummryRouteVise;
            },
            //route vise
            greenLeavesChartDetailsVehicleVise: function () {
                var that = this;
                that.chartDetails = {};
                angular.forEach(this.greenLeavesReceiveList, function (glr) {
                    angular.forEach(glr.greenLeavesReceiveDetails, function (glrd) {
                        var quantity = that.chartDetails[that.route(glr.route).vehicle.indexNo];
                        if (typeof quantity === 'undefined') {
                            quantity = ['', 0.0, 0.0];
                        }

                        that.chartDetails[that.route(glr.route).vehicle.indexNo] = [
                            quantity[0] = that.route(glr.route).vehicle.indexNo,
                            quantity[1] + glrd.normalLeavesQuantity,
                            quantity[2] + glrd.superLeavesQuantity
                        ];
                    });
                });

                //console.log(that.chartDetails);
                angular.forEach(that.chartDetails, function (value) {
                    that.greenLeavesReceveChartSummryRouteVehicleVise.vehicle.push(that.vehicleLabel(value[0]));
                    that.greenLeavesReceveChartSummryRouteVehicleVise.greenLeavesQtys[0].push(value[1]);
                    that.greenLeavesReceveChartSummryRouteVehicleVise.greenLeavesQtys[1].push(value[2]);
                });
                return that.greenLeavesReceveChartSummryRouteVehicleVise;
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
            greenLeavesBulkWeighChartDetailsRouteVise: function () {
                var that = this;
                that.chartDetails = {};
                angular.forEach(this.greenLeavesBulkWeighList, function (glr) {
                    var quantity = that.chartDetails[glr.route];
                    if (typeof quantity === 'undefined') {
                        quantity = ['', 0.0, 0.0];
                    }

                    that.chartDetails[glr.route] = [
                        quantity[0] = glr.route,
                        quantity[1] + glr.normalNetWeight,
                        quantity[2] + glr.superNetWeight
                    ];
                });

                angular.forEach(that.chartDetails, function (value) {
                    that.greenLeavesBulkWeighChartSummryRouteVise.routes.push(that.routeLabel(value[0]));
                    that.greenLeavesBulkWeighChartSummryRouteVise.greenLeavesQtys[0].push(value[1]);
                    that.greenLeavesBulkWeighChartSummryRouteVise.greenLeavesQtys[1].push(value[2]);
                });
                return that.greenLeavesBulkWeighChartSummryRouteVise;
            },
            greenLeavesBulkWeighChartDetailsVehicleVise: function () {
                var that = this;
                that.chartDetails = {};
                angular.forEach(this.greenLeavesBulkWeighList, function (glr) {
                    var quantity = that.chartDetails[glr.vehicle];
                    if (typeof quantity === 'undefined') {
                        quantity = ['', 0.0, 0.0];
                    }

                    that.chartDetails[glr.vehicle] = [
                        quantity[0] = glr.vehicle,
                        quantity[1] + glr.normalNetWeight,
                        quantity[2] + glr.superNetWeight
                    ];
                });

                angular.forEach(that.chartDetails, function (value) {
                    that.greenLeavesBulkWeighChartSummryVehicleVise.vehicle.push(that.vehicleLabel(value[0]));
                    that.greenLeavesBulkWeighChartSummryVehicleVise.greenLeavesQtys[0].push(value[1]);
                    that.greenLeavesBulkWeighChartSummryVehicleVise.greenLeavesQtys[1].push(value[2]);
                });
                return that.greenLeavesBulkWeighChartSummryVehicleVise;
            },
            //------------------------------- total functions -------------------------------

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
                console.log(that.totalGreenLevasReceiveData);
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
            //------------------------------- popup view functions -------------------------------

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
            //------------------------------- master functions -------------------------------

            getClientRoute: function (indexNo) {
                var label;
                angular.forEach(this.clients, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.route;
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
            route: function (indexNo) {
                var route;
                angular.forEach(this.routes, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        route = value;
                        return;
                    }
                });
                return route;
            },
            searchClientByClientNo: function (clientNumber) {
                var client;
                angular.forEach(this.clients, function (value) {
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