(function () {
    angular.module("appModule")
            .factory("FertilizerRequestModel", function (FertilizerModelService, FertilizersModelFactory, $q, $filter) {
                function FertilizerRequestModel() {
                    this.constructor();
                }

                FertilizerRequestModel.prototype = {
                    data: {},
                    tempData: {},
                    //client information
                    clients: [],
                    //products information
                    products: [],
                    //route information
                    routes: [],
                    //route officer information
                    routeOfficers: [],
                    //route helper information
                    routeHelpers: [],
                    //vehicles
                    vehicles: [],
                    constructor: function () {
                        var that = this;
                        this.data = FertilizersModelFactory.newData();
                        this.tempData = FertilizersModelFactory.newTempData();

                        FertilizerModelService.loadProducts()
                                .success(function (data) {
                                    that.products = data;
                                });

                        FertilizerModelService.loadClients()
                                .success(function (data) {
                                    that.clients = data;
                                });

                        FertilizerModelService.loadRoutes()
                                .success(function (data) {
                                    that.routes = data;
                                });

                        FertilizerModelService.loadRouteOfficers()
                                .success(function (data) {
                                    that.routeOfficers = data;
                                });

                        FertilizerModelService.loadRouteHelpers()
                                .success(function (data) {
                                    that.routeHelpers = data;
                                });

                        FertilizerModelService.loadVehicles()
                                .success(function (data) {
                                    that.vehicles = data;
                                });

                    },
                    clear: function () {
                        this.data = FertilizersModelFactory.newData();
                        this.tempData = FertilizersModelFactory.newTempData();
                        this.itemTotal();
                    },
                    load: function () {
                        var that = this;
                        var defer = $q.defer();
                        var number = this.data.number;
                        FertilizerModelService.loadFertilizer(number)
                                .success(function (data) {
                                    that.data = {};
                                    angular.extend(that.data, data);
                                    that.itemTotal();
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.itemTotal();
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    addDetail: function () {
                        var defer = $q.defer();
                        if (parseInt(this.tempData.price + this.tempData.qty) > 0) {
                            this.data.tfertilizerDetailList.unshift(this.tempData);
                            this.tempData = FertilizersModelFactory.newTempData();
                            this.itemTotal();
                            defer.resolve();
                        } else {
                            this.itemTotal();
                            defer.reject();
                        }

                        return defer.promise;
                    },
                    editDetail: function (index) {
                        var fertilizer = this.data.tfertilizerDetailList[index];
                        this.data.tfertilizerDetailList.splice(index, 1);
                        this.tempData = fertilizer;
                        this.itemTotal();
                    },
                    deleteDetail: function (index) {
                        var that = this;
                        if (!that.data.indexNo) {
                            that.data.tfertilizerDetailList.splice(index, 1);
                            that.itemTotal();
                        } else {
                            var greenLeavesReceiveDetails = that.data.tfertilizerDetailList[index];
                            FertilizerModelService.deleteFertilizerDetail(parseInt(greenLeavesReceiveDetails.indexNo))
                                    .success(function () {
                                        that.data.tfertilizerDetailList.splice(index, 1);
                                        that.itemTotal();
                                    });
                        }
                    },
                    itemTotal: function () {
                        var itemTotal = 0.0;
                        var that = this;
                        angular.forEach(this.data.tfertilizerDetailList, function (value) {
                            itemTotal += parseFloat(that.product(value.fertlizerItem).salePrice * value.qty);
                        });
                        return itemTotal;
                    },
                    save: function () {
                        console.log(this.data);
                        var that = this;
                        var defer = $q.defer();
                        FertilizerModelService.saveFertilizer(JSON.stringify(this.data))
                                .success(function (data) {
                                    defer.resolve(data);
                                    that.clear();
                                })
                                .error(function (data) {
                                    that.clear();
                                    defer.reject();
                                });
                        return defer.promise;
                    },
//                    deleteFertilizer: function () {
//                        var that = this;
//                        FertilizerModelService.deleteFertilizer(this.data.indexNo)
//                                .success(function () {
//                                    that.clear();
//                                });
//                    },
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
                    product: function (indexNo) {
                        var client;
                        angular.forEach(this.products, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                client = value;
                                return;
                            }
                        });
                        return client;
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
                    productLabel: function (indexNo) {
                        var label;
                        angular.forEach(this.products, function (value) {
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
                    requestDuplicateCheck: function (fertlizerItem, client) {
                        var data;
                        angular.forEach(this.data.tfertilizerDetailList, function (values) {
                            if (values.fertlizerItem === parseInt(fertlizerItem) && values.client === client) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
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
                };
                return FertilizerRequestModel;
            });
}());