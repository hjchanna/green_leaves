(function () {
    angular.module("appModule")
            .factory("ClientAdvanceApproveModel", function (ClientAdvanceRequestService, $q) {
                function ClientAdvanceApproveModel() {
                    this.constructor();
                }

                ClientAdvanceApproveModel.prototype = {
                    data: null,
                    detail: null,
                    requests: [],
                    requestsData: [],
                    routes: [],
                    clients: [],
                    selectData: function (route) {
                        var that = this;
                        that.detail = null;
                        this.requestsData = [];
                        ClientAdvanceRequestService.findByRoute(route)
                                .success(function (data) {
                                    angular.forEach(data, function (value) {
                                        angular.forEach(value.clientAdvanceRequestDetails, function (values) {
                                            if (values.status === "PENDING") {
                                                that.requestsData.push(values);
                                            }
                                        });
                                    });
                                });

                    },
                    refresh: function () {
                        var that = this;
                        ClientAdvanceRequestService.loadPendingRequests()
                                .success(function (data) {
                                    that.requests = data;
                                });
                    },
                    clear: function () {

                    },
                    approve: function (indexNo) {
                        var that = this;
                        var defer = $q.defer();
                        ClientAdvanceRequestService.approveRequest(indexNo)
                                .success(function () {
                                    that.delectStatusChangeRow(indexNo);
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    updateAdvanceRequestAmount: function (indexNo, amount) {
                        var that = this;
                        var defer = $q.defer();
                        ClientAdvanceRequestService.updateAdvanceRequestAmount(indexNo, amount)
                                .success(function () {
                                    var id = -1;
                                    for (var i = 0; i < that.requestsData.length; i++) {
                                        if (that.requestsData[i].indexNo === indexNo) {
                                            id = i;
                                        }
                                    }
                                    var reuestData = that.requestsData[id];
                                    reuestData.amount = amount;
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    reject: function (indexNo) {
                        var that = this;
                        var defer = $q.defer();
                        ClientAdvanceRequestService.rejectRequest(indexNo)
                                .success(function () {
                                    that.delectStatusChangeRow(indexNo);
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.resolve();
                                });
                        return defer.promise;
                    },
                    delectStatusChangeRow: function (indexNo) {
                        var that = this;
                        var id = -1;
                        for (var i = 0; i < that.requestsData.length; i++) {
                            if (that.requestsData[i].indexNo === indexNo) {
                                id = i;
                            }
                        }
                        that.requestsData.splice(id, 1);
                        that.getRequestTotal();
                        that.getRequestCount();
                        that.getRequestDataTotal();
                        that.refresh();
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
                    getRequestTotal: function () {
                        var total = 0.0;
                        angular.forEach(this.requests, function (values) {
                            total = total + values[1];
                        });
                        return total;
                    },
                    getRequestCount: function () {
                        var total = 0.0;
                        angular.forEach(this.requests, function (values) {
                            total = total + values[2];
                        });
                        return total;
                    },
                    getRequestDataTotal: function () {
                        var count = 0.0;
                        angular.forEach(this.requestsData, function (values) {
                            count = count + parseFloat(values.amount);
                        });
                        return count;
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