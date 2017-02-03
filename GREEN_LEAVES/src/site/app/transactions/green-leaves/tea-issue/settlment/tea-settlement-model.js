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
                                    console.log(data);
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
                    itemTotal: function () {
                        var itemTotal = 0.0;
                        angular.forEach(this.teaIssueList, function (value) {
                            itemTotal += value.price * value.qty;
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