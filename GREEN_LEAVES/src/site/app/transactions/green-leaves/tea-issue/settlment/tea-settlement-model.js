(function () {
    angular.module("appModule")
            .factory("TeaSettlementModel", function (TeaIssueService, TeaIssueModelFactory) {
                function TeaSettlementModel() {
                    this.constructor();
                }

                TeaSettlementModel.prototype = {
                    //client information
                    clients: [],
                    //routeOfficers information
                    routeOfficers: [],
                    //teagrades
                    teaGrades: [],
                    //teaIsse list
                    pendingTeaIssueRequest: [],
                    constructor: function () {
                        var that = this;
                        that.data = TeaIssueModelFactory.newData();

                        TeaIssueService.loadClients()
                                .success(function (data) {
                                    that.clients = data;
                                });

                        TeaIssueService.loadRouteOfficers()
                                .success(function (data) {
                                    that.routeOfficers = data;
                                });

                        TeaIssueService.loadTeaGrade()
                                .success(function (data) {
                                    that.teaGrades = data;
                                });

                        TeaIssueService.getPendingTeaIssueRequest()
                                .success(function (data) {
                                    that.pendingTeaIssueRequest = data;
                                });
                    },
                    clear: function () {
                        var that = this;
                        TeaIssueService.getPendingTeaIssueRequest()
                                .success(function (data) {
                                    that.pendingTeaIssueRequest = data;
                                });
                    },
                    approve: function (indexNo) {
                        var that = this;
                        var status = "APPROVE";
                        TeaIssueService.approveOrRejectTeaIssueRequest(indexNo, status)
                                .success(function (data) {
                                    var id = -1;
                                    for (var i = 0; i < that.pendingTeaIssueRequest.length; i++) {
                                        if (that.pendingTeaIssueRequest[i].indexNo === indexNo) {
                                            id = i;
                                        }
                                    }
                                    that.pendingTeaIssueRequest.splice(id, 1);
                                });
                    },
                    reject: function (indexNo) {
                        var that = this;
                        var status = "REJECT";
                        TeaIssueService.approveOrRejectTeaIssueRequest(indexNo, status)
                                .success(function (data) {
                                    var id = -1;
                                    for (var i = 0; i < that.pendingTeaIssueRequest.length; i++) {
                                        if (that.pendingTeaIssueRequest[i].indexNo === indexNo) {
                                            id = i;
                                        }
                                    }
                                    that.pendingTeaIssueRequest.splice(id, 1);
                                });
                    },
                    itemTotal: function (type) {
                        var itemTotal = 0.0;
                        angular.forEach(this.pendingTeaIssueRequest, function (value) {
                            if (type === value.type) {
                                itemTotal += value.price * value.qty;
                            }
                        });
                        return itemTotal;
                    },
                    teaGrade: function (indexNo) {
                        var client;
                        angular.forEach(this.teaGrades, function (value) {
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
                    //return label for tea grade
                    teaGradeLabel: function (indexNo) {
                        var label;
                        angular.forEach(this.teaGrades, function (value) {
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
                    //return label for client
                    clientLabel: function (indexNo) {
                        var label;
                        angular.forEach(this.clients, function (value) {
                            if (value.indexNo === indexNo) {
                                label = value.clientNumber + "-" + value.name;
                                return;
                            }
                        });
                        return label;
                    }
                };
                return TeaSettlementModel;
            });
}());