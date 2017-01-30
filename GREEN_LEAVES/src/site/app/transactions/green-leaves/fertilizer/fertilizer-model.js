(function () {
    angular.module("appModule")
            .factory("FertilizerModel", function (FertilizerModelService, FertilizerModelFactory, $q, $filter) {
                function FertilizerModel() {
                    this.constructor();
                }

                FertilizerModel.prototype = {
                    data: {},
                    tempData: {},
                    //client information
                    clients: [],
                    //products information
                    products: [],
                    constructor: function () {
                        var that = this;
                        FertilizerModelService.loadProducts()
                                .success(function (data) {
                                    that.products = data;
                                });
                        FertilizerModelService.loadClients()
                                .success(function (data) {
                                    that.clients = data;
                                });
                    },
                    clear: function () {
                    },
                    addDetail: function () {
                        var defer = $q.defer();
                        if (parseInt(this.tempData.normalLeavesQuantity + this.tempData.superLeavesQuantity) > 0) {
                            this.data.greenLeavesReceiveDetails.unshift(this.tempData);
                            this.refreshQuantity();
                            this.tempData = FertilizerModelService.newTempData();
                            defer.resolve();
                        } else {
                            defer.reject();
                        }

                        return defer.promise;
                    },
//                    editDetail: function (index) {
//                        var receiveDetail = this.data.greenLeavesReceiveDetails[index];
//                        this.data.greenLeavesReceiveDetails.splice(index, 1);
//                        this.tempData = receiveDetail;
//                    },
//                    deleteDetail: function (index) {
//                        this.data.greenLeavesReceiveDetails.splice(index, 1);
//                    },
//                    load: function () {
//                        var number = this.data.number;
//                        var branch = this.data.branch;
//                        var that = this;
//                        var defer = $q.defer();
//                        FertilizerModelService.loadReceive(branch, number)
//                                .success(function (data) {
//                                    that.data = {};
//                                    angular.extend(that.data, data);
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    that.refreshQuantity();
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
//                    save: function () {
//                        var defer = $q.defer();
//                        if (this.data.route && this.data.date && this.data.branch) {
//                            FertilizerModelService.saveReceive(JSON.stringify(this.data))
//                                    .success(function (data) {
//                                        defer.resolve();
//                                    })
//                                    .error(function (data) {
//                                        defer.reject();
//                                    });
//                        }
//                        return defer.promise;
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
                return FertilizerModel;
            });
}());