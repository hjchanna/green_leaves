(function () {
    angular.module("appModule")
            .factory("GreenLeavesReceiveModel", function (SecurityService, GreenLeavesReceiveService, GreenLeavesReceiveModelFactory, $q, $filter) {
                function GreenLeavesReceiveModel() {
                    this.constructor();
                }

                GreenLeavesReceiveModel.prototype = {
                    data: {},
                    tempData: {},
                    currentBranch: null,
                    //qtys
                    totalQuantity: [],
                    factoryQuantity: [],
                    differenceQuantity: [],
                    //route information
                    routes: [],
                    //branch information
                    branchs: [],
                    //client information
                    clients: [],
                    //route officer information
                    routeOfficers: [],
                    //route helper information
                    routeHelpers: [],
                    //vehicle information
                    vehicles: [],
                    constructor: function () {
                        var that = this;

                        SecurityService.ping()
                                .success(function (data) {
                                    that.currentBranch = data.branch;
                                });

                        GreenLeavesReceiveService.loadRoutes()
                                .success(function (data) {
                                    that.routes = data;
                                });
                        GreenLeavesReceiveService.loadClients()
                                .success(function (data) {
                                    that.clients = data;
                                });
                        GreenLeavesReceiveService.loadBranch()
                                .success(function (data) {
                                    that.branchs = data;
                                });
                        GreenLeavesReceiveService.loadRouteOfficers()
                                .success(function (data) {
                                    that.routeOfficers = data;
                                });
                        GreenLeavesReceiveService.loadRouteHelpers()
                                .success(function (data) {
                                    that.routeHelpers = data;
                                });
                        GreenLeavesReceiveService.loadVehicles()
                                .success(function (data) {
                                    that.vehicles = data;
                                });
                        that.totalQuantity = [0, 0];
                        that.factoryQuantity = [0, 0];
                        that.differenceQuantity = [0, 0];
                    },
                    clear: function () {
                        this.data = GreenLeavesReceiveModelFactory.newData();
                        this.tempData = GreenLeavesReceiveModelFactory.newTempData();
                        this.routeData = {};
                        this.totalQuantity = [0, 0];
                        this.factoryQuantity = [0, 0];
                        this.differenceQuantity = [0, 0];
                    },
                    addDetail: function () {
                        var defer = $q.defer();
                        if (parseInt(this.tempData.normalLeavesQuantity + this.tempData.superLeavesQuantity) > 0) {
                            this.data.greenLeavesReceiveDetails.unshift(this.tempData);
                            this.refreshQuantity();
                            this.tempData = GreenLeavesReceiveModelFactory.newTempData();
                            defer.resolve();
                        } else {
                            defer.reject();
                        }

                        return defer.promise;
                    },
                    editDetail: function (index) {
                        var receiveDetail = this.data.greenLeavesReceiveDetails[index];
                        this.data.greenLeavesReceiveDetails.splice(index, 1);
                        this.tempData = receiveDetail;
                        this.refreshQuantity();
                    },
                    deleteDetail: function (index) {
                        var that = this;
                        var greenLeavesReceiveDetails = that.data.greenLeavesReceiveDetails[index];
                        if (!greenLeavesReceiveDetails.indexNo) {
                            console.log("new data delete");
                            that.data.greenLeavesReceiveDetails.splice(index, 1);
                            that.refreshQuantity();
                        } else {
                            console.log("existing data delete");
                            GreenLeavesReceiveService.deleteGreenLeavesReceiveDetail(parseInt(greenLeavesReceiveDetails.indexNo))
                                    .success(function () {
                                        that.data.greenLeavesReceiveDetails.splice(index, 1);
                                        that.refreshQuantity();
                                    });
                        }
                    },
                    load: function () {
                        var number = this.data.number;
                        var branch = this.currentBranch;
                        var that = this;
                        var defer = $q.defer();
                        GreenLeavesReceiveService.loadReceive(branch, number)
                                .success(function (data) {
                                    that.data = {};
                                    angular.extend(that.data, data);
                                    that.refreshQuantity();
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.refreshQuantity();
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    save: function () {
                        var defer = $q.defer();
                        if (this.data.route && this.data.date && this.data.branch) {
                            GreenLeavesReceiveService.saveReceive(JSON.stringify(this.data))
                                    .success(function (data) {
                                        defer.resolve(data);
                                    })
                                    .error(function (data) {
                                        defer.reject();
                                    });
                        }
                        return defer.promise;
                    },
                    loadFactoryQuantity: function () {
                        var defer = $q.defer();
                        if (this.data.route && this.data.date) {
                            var that = this;
                            GreenLeavesReceiveService.getFactoryQuantity(this.data.route, $filter('date')(this.data.date, 'yyyy-MM-dd'), this.data.branch)
                                    .success(function (data) {
                                        if (!data[0]) {
                                            data[0] = 0;
                                        }
                                        if (!data[1]) {
                                            data[1] = 0;
                                        }

                                        that.factoryQuantity = data;
                                        that.refreshQuantity();
                                        defer.resolve();
                                    })
                                    .error(function () {
                                        that.factoryQuantity = [0, 0];
                                        that.refreshQuantity();
                                        defer.reject();
                                    });
                        }
                        return defer.promise;
                    },
                    refreshQuantity: function () {
                        var that = this;
                        this.totalQuantity = [0, 0];
                        angular.forEach(this.data.greenLeavesReceiveDetails, function (value) {
                            that.totalQuantity[0] = that.totalQuantity[0] + value.normalLeavesQuantity;
                            that.totalQuantity[1] = that.totalQuantity[1] + value.superLeavesQuantity;
                        });
                        that.differenceQuantity = [
                            that.factoryQuantity[0] - that.totalQuantity[0],
                            that.factoryQuantity[1] - that.totalQuantity[1]
                        ];
                    },
                    deleteGreenLavesReceive: function () {
                        var that = this;
                        GreenLeavesReceiveService.deleteGreenLeavesReceive(this.data.indexNo)
                                .success(function () {
                                    that.clear();
                                });
                    },
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
                    //find customer by client number
                    searchClientByClientNo: function (clientNumber) {
                        var client;
                        angular.forEach(this.clients, function (value) {
                            if (value.clientNumber === parseInt(clientNumber)) {
                                client = value;
                                return;
                            }
                        });
                        return client;
                    },
                    //return lable for branch
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
                    //return label for route officer
                    greenLeavesClietDuplivate: function (indexNo) {
                        var label;
                        angular.forEach(this.data.greenLeavesReceiveDetails, function (value) {
                            if (value.client === parseInt(indexNo)) {
                                label = true;
                                return;
                            }
                        });
                        return label;
                    },
                    //deafault branch
                    defaultBranch: function () {
                        return this.currentBranch;
                    },
//                    // find existing green leaves by branch and route and date
//                    findByBranchAndRouteAndDate: function () {
//                        var that = this;
//                        var defer = $q.defer();
//                        var route = this.data.route;
//                        var branch = this.data.branch;
//                        var date = $filter('date')(this.data.date, 'yyyy-MM-dd');
//                        GreenLeavesReceiveService.findByBranchAndRouteAndDate(branch, route, date)
//                                .success(function (data) {
//                                    that.data = {};
//                                    angular.extend(that.data, data);
//                                    that.refreshQuantity();
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    that.refreshQuantity();
//                                    defer.reject();
//                                    that.data.indexNo = null;
//                                    that.data.number = null;
//                                    that.data.transaction = null;
//                                    that.data.status = null;
//                                    that.data.greenLeavesReceiveDetails = [];
//                                });
//                        return defer.promise;
//                    },
                    getRouteOfficerAndRouteHelperAndVehicle: function (indexNo) {
                        var that = this;
                        angular.forEach(this.routes, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                that.data.routeHelper = value.routeHelper.indexNo;
                                that.data.routeOfficer = value.routeOfficer.indexNo;
                                that.data.vehicle = value.vehicle.indexNo;
                            }
                        });
                    }
//                    //get route officer and route helper and vehicle find by branch and route and date
//                    getRouteOfficerAndRouteHelperAndVehicle: function (indexNo) {
//                        var defer = $q.defer();
//                        var route = this.data.route;
//                        var date = $filter('date')(this.data.date, 'yyyy-MM-dd');
//                        var branch = this.data.branch;
//                        var that = this.routeData;
//                        GreenLeavesReceiveService.findByBranchAndRouteAndDateGreenLeavesWeigh(branch, route, date)
//                                .success(function (data) {
//                                    console.log(data);
//                                    that.routeHelper = data.routeHelper;
//                                    that.routeOfficer = data.routeOfficer;
//                                    that.vehicle = data.vehicle;
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    }
                };
                return GreenLeavesReceiveModel;
            });
}());