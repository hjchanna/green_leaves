(function () {
    angular.module("appModule")
            .factory("GreenLeavesReceiveModel", function (GreenLeavesReceiveService, GreenLeavesReceiveModelFactory, $q, $filter) {
                function GreenLeavesReceiveModel() {
                    this.constructor();
                }

                GreenLeavesReceiveModel.prototype = {
                    data: {},
                    tempData: {},
                    routeData: {
                        "routeOfficer": null,
                        "vehicle": null,
                        "routeHelper": null
                    },
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
                            this.data.greenLeavesReceiveDetails.push(this.tempData);
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
                        this.data.greenLeavesReceiveDetails.splice(index, 1);
                        this.refreshQuantity();
                    },
                    load: function () {
                        var number = this.data.number;
                        var branch = this.data.branch;
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
                        GreenLeavesReceiveService.saveReceive(JSON.stringify(this.data))
                                .success(function (data) {
                                    defer.resolve();
                                })
                                .error(function (data) {
                                    defer.reject();
                                });
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
                    selectRoute: function (indexNo) {
                        this.data.route = indexNo;
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
                    defaultBranch: function () {
                        return this.branchs[0];
                    },
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
                    findByBranchAndRouteAndDate: function () {
                        var that = this;
                        var defer = $q.defer();
                        var route = this.data.route;
                        var branch = this.data.branch;
                        var date = $filter('date')(this.data.date, 'yyyy-MM-dd');
                        GreenLeavesReceiveService.findByBranchAndRouteAndDate(branch, route, date)
                                .success(function (data) {
                                    that.data = {};
                                    angular.extend(that.data, data);
                                    that.refreshQuantity();
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.refreshQuantity();
                                    defer.reject();
                                    that.data.greenLeavesReceiveDetails = [];
                                });
                        return defer.promise;
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
                    getRouteOfficerAndRouteHelperAndVehicle: function (indexNo) {
                        var that = this.routeData;
                        angular.forEach(this.routes, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                that.routeHelper = value.routeHelper.indexNo;
                                that.routeOfficer = value.routeOfficer.indexNo;
                                that.vehicle = value.vehicle.indexNo;
                            }
                        });
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

                return GreenLeavesReceiveModel;
            });
}());