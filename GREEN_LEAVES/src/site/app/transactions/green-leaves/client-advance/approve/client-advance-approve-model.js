(function () {
    angular.module("appModule")
            .factory("ClientAdvanceApproveModel", function (ClientAdvanceRequestService) {
                function ClientAdvanceApproveModel() {
                    this.constructor();
                }

                ClientAdvanceApproveModel.prototype = {
                    data: null,
                    detail: null,
                    requests: [],
                    routes: [],
                    clients: [],
                    selectData: function (indexNo) {
                        var that = this;
                        that.detail = null;

                        angular.forEach(this.requests, function (value) {
                            if (value.indexNo === indexNo) {
                                that.data = value;
                                return;
                            }
                        });
                    },
                    selectDetail: function (indexNo) {
                        var that = this;
                        angular.forEach(this.data.clientAdvanceRequestDetails, function (value) {
                            if (value.indexNo === indexNo) {
                                that.detail = value;
                                return;
                            }
                        });
                    },
                    refresh: function () {
                    },
                    clear: function () {
                        this.data = null;
                        this.detail = null;
                    },
                    approve: function () {
                        var that = this;
                        if (this.detail) {
                            ClientAdvanceRequestService.approveRequest(this.detail.indexNo)
                                    .success(function () {
                                        that.detail.status = "APPROVED";
                                    })
                                    .error(function () {

                                    });
                        }
                    },
                    reject: function () {
                        var that = this;
                        if (this.detail) {
                            ClientAdvanceRequestService.rejectRequest(this.detail.indexNo)
                                    .success(function () {
                                        that.detail.status = "REJECTED";
                                    })
                                    .error(function () {

                                    });
                        }
                    },
                    getRoute: function (indexNo) {
                        var route = null;

                        angular.forEach(this.routes, function (value) {
                            if (value.indexNo === indexNo) {
                                route = value;
                                return;
                            }
                        });

                        return route;
                    },
                    getClient: function (indexNo) {
                        var client = null;

                        angular.forEach(this.clients, function (value) {
                            if (value.indexNo === indexNo) {
                                client = value;
                                return;
                            }
                        });

                        return client;
                    },
                    getRequestTotal: function (indexNo) {
                        var total = 0.0;

                        angular.forEach(this.requests, function (valueData) {
                            if (indexNo ? valueData.indexNo === indexNo : true) {
                                angular.forEach(valueData.clientAdvanceRequestDetails, function (valueDetail) {
                                    if (valueDetail.status === 'PENDING') {
                                        total = total + valueDetail.amount;
                                    }
                                });
                            }
                        });

                        return total;
                    },
                    getRequestCount: function (indexNo) {
                        var count = 0;

                        angular.forEach(this.requests, function (valueData) {
                            if (indexNo ? valueData.indexNo === indexNo : true) {
                                angular.forEach(valueData.clientAdvanceRequestDetails, function (valueDetail) {
                                    if (valueDetail.status === 'PENDING') {
                                        count = count + 1;
                                    }
                                });
                            }
                        });

                        return count;
                    },
                    constructor: function () {
                        var that = this;

                        ClientAdvanceRequestService.loadRoutes()
                                .success(function (data) {
                                    that.routes = data;
                                });

                        ClientAdvanceRequestService.loadClient()
                                .success(function (data) {
                                    that.clients = data;
                                });

                        ClientAdvanceRequestService.loadPendingRequests()
                                .success(function (data) {
                                    that.requests = data;
                                });
                    }
                };

                return ClientAdvanceApproveModel;
            });
}());