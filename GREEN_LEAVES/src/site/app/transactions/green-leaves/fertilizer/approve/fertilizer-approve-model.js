(function () {
    angular.module("appModule")
            .factory("FertilizerApproveModel", function (FertilizerModelService, FertilizerModelFactory, $q, $filter) {
                function FertilizerApproveModel() {
                    this.constructor();
                }

                FertilizerApproveModel.prototype = {
                    //client information
                    clients: [],
                    //products information
                    products: [],
                    //routeOfficers information
                    routeOfficers: [],
                    //pending fertilizer information
                    pendingFertilizerRequestByRouteVise: [],
                    pendingFertilizerRequest: [],
                    fertilizerItems: [],
                    total: {
                        "allRouteOfficerAmount": 0.0,
                        "selectedRouteOfficer": 0.0,
                        "selectedFertilizer": 0.0
                    },
                    constructor: function () {
                        var that = this;
                        that.data = FertilizerModelFactory.newData();
                        that.tempData = FertilizerModelFactory.newTempData();
                        FertilizerModelService.loadProducts()
                                .success(function (data) {
                                    that.products = data;
                                });
                        FertilizerModelService.loadClients()
                                .success(function (data) {
                                    that.clients = data;
                                });

                        FertilizerModelService.loadRouteOfficers()
                                .success(function (data) {
                                    that.routeOfficers = data;
                                });

                        FertilizerModelService.getPendingRequestByRouteVise()
                                .success(function (data) {
                                    that.pendingFertilizerRequestByRouteVise = data;
                                    that.getTotal();
                                });
                    },
                    getTotal: function () {
                        var that = this;
                        this.total = {
                            "allRouteOfficerAmount": 0.0,
                            "selectedRouteOfficer": 0.0,
                            "selectedFertilizer": 0.0
                        };
                        angular.forEach(that.pendingFertilizerRequestByRouteVise, function (value) {
                            that.total.allRouteOfficerAmount += value[1];
                        });

                        angular.forEach(that.pendingFertilizerRequest, function (value) {
                            that.total.selectedRouteOfficer += value.amount;
                        });
                        angular.forEach(that.fertilizerItems, function (value) {
                            that.total.selectedFertilizer += that.product(value.product).salePrice * value.qty;
                        });
                    },
                    clear: function () {
                        this.pendingFertilizerRequestByRouteVise = [];
                        this.pendingFertilizerRequest = [];
                        this.fertilizerItems = [];
                        this.total = {
                            "allRouteOfficerAmount": 0.0,
                            "selectedRouteOfficer": 0.0,
                            "selectedFertilizer": 0.0
                        };
                    },
                    refreshTable: function (index) {
                        this.fertilizerItems = [];
                        this.pendingFertilizerRequest.splice(index, 1);
                        this.getTotal();
                    },
                    selectClientData: function (routeOfficer) {
                        var that = this;
                        FertilizerModelService.getPendingRequest(routeOfficer)
                                .success(function (data) {
                                    that.pendingFertilizerRequest = data;
                                    that.getTotal();
                                });
                    },
                    approve: function (indexNo, $index) {
                        var that = this;
                        var status = "APPROVE";
                        FertilizerModelService.approveOrRejectRequest(indexNo, status)
                                .success(function (data) {
                                    that.refreshTable($index);
                                });
                    },
                    reject: function (indexNo, $index) {
                        var that = this;
                        var status = "REJECT";
                        FertilizerModelService.approveOrRejectRequest(indexNo, status)
                                .success(function (data) {
                                    that.refreshTable($index);
                                });
                    },
                    getItemData: function (indexNo) {
                        var that = this;
                        that.fertilizerItems = [];
                        angular.forEach(this.pendingFertilizerRequest, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                that.fertilizerItems = value.tfertilizerDetailList;
                                return;
                            }
                        });
                        that.getTotal();
                        return that.fertilizerItems;
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
                    routeOfficer: function (indexNo) {
                        var client;
                        angular.forEach(this.routeOfficers, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                client = value;
                                return;
                            }
                        });
                        return client;
                    }
                };
                return FertilizerApproveModel;
            });
}());