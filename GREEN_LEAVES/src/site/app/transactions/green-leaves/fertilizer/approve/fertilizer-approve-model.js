(function () {
    angular.module("appModule")
            .factory("FertilizerApproveModel", function (FertilizerModelService) {
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
                    //fertilizer items
                    fertilizerItems: [],
                    //pending fertilizer information
                    pendingFertilizerRequest: [],
                    //get pending requests
                    pendingRequestDetails: [],
                    requestItems: [],
                    totals: {
                        allRequest: 0,
                        allAmount: 0.0,
                        selectAmount: 0.0
                    },
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

                        that.getPendingRequest();

                    },
                    getPendingRequest: function () {
                        var that = this;
                        FertilizerModelService.getPendingRequest()
                                .success(function (data) {
                                    that.pendingFertilizerRequest = data;
                                    that.getPendingAllRequestTotal();
                                });
                    },
                    getSelectdRequestDetails: function (date) {
                        var that = this;
                        FertilizerModelService.getSelectdRequestDetails(date)
                                .success(function (data) {
                                    that.pendingRequestDetails = data;
                                    that.getSelectPendingRequestTotal();
                                });
                    },
                    getSelectdRequestItems: function (data) {
                        this.requestItems = [];
                        this.requestItems.push(data);
                    },
                    getPendingAllRequestTotal: function () {
                        var that = this;
                        that.totals.allRequest = 0;
                        that.totals.allAmount = 0.0;
                        angular.forEach(this.pendingFertilizerRequest, function (values) {
                            that.totals.allRequest += parseInt(values[2]);
                            that.totals.allAmount += parseFloat(values[1]);
                        });
                        return that.totals;
                    },
                    getSelectPendingRequestTotal: function () {
                        var that = this;
                        that.totals.selectAmount = 0.0;
                        angular.forEach(this.pendingRequestDetails, function (values) {
                            that.totals.selectAmount += parseFloat(values.amount);
                        });
                        return that.totals;
                    },
                    clear: function () {
                        this.getPendingRequest();
                        this.pendingRequestDetails = [];
                        this.requestItems = [];
                        this.totals = {
                            allRequest: 0,
                            allAmount: 0.0,
                            selectAmount: 0.0
                        };
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
                    refreshTable: function ($index) {
                        this.pendingRequestDetails.splice($index, 1);
                        this.getPendingRequest();
                        this.getSelectPendingRequestTotal();
                        this.requestItems = [];
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
                        var product;
                        angular.forEach(this.products, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                product = value;
                                return;
                            }
                        });
                        console.log(product);
                        return product;
                    }
                };
                return FertilizerApproveModel;
            });
}());