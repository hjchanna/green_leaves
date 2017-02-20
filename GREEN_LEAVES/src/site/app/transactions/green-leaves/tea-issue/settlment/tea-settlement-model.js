(function () {
    angular.module("appModule")
            .factory("TeaSettlementModel", function (TeaIssueService, TeaIssueModelFactory, $q) {
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
                    teaIssueList: [],
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
                    },
                    clear: function () {
                        this.pendingTeaIssueRequest = [];
                        this.teaIssueList = [];
                        this.data = TeaIssueModelFactory.newData();
                    },
                    searchPendingRouteOfficerRequest: function (model) {
                        var that = this;
                        TeaIssueService.getPendingTeaIssueRequest(model)
                                .success(function (data) {
                                    that.pendingTeaIssueRequest = data;
                                });
                        that.pendingRouteOfficerTeaIssueTotal();
                    },
                    addDetail: function () {
                        var defer = $q.defer();
                        var that = this;

                        if (
                                that.data.date
                                && that.data.client
                                && that.data.teaGrade
                                && parseInt(that.data.qty) > 0) {
                            that.data.type = "TEA_SETTLEMENT";

                            that.teaIssueList.unshift(that.data);

                            var routeOfficerTemp = that.teaIssueList[that.teaIssueList.length - 1].routeOfficer;
                            that.data = TeaIssueModelFactory.newData();
                            that.data.routeOfficer = routeOfficerTemp;

                            that.teaIssueTotal();
                            defer.resolve();
                        } else {
                            defer.reject();
                            that.teaIssueTotal();
                        }
                        return defer.promise;
                    },
                    editDetail: function (index) {
                        var fertilizer = this.teaIssueList[index];
                        this.teaIssueList.splice(index, 1);
                        this.data = fertilizer;
                        this.itemTotal();
                    },
                    deleteDetail: function (index) {
                        this.teaIssueList.splice(index, 1);
                        this.itemTotal();
                    },
                    save: function () {
                        var that = this;
                        var defer = $q.defer();
                        TeaIssueService.saveSettlemnt(this.teaIssueList)
                                .success(function (data) {
                                    defer.resolve();
                                    that.clear();
                                    that.searchPendingRouteOfficerRequest();
                                })
                                .error(function (data) {
                                    that.clear();
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    teaIssueTotal: function () {
                        var itemTotal = 0.0;
                        angular.forEach(this.teaIssueList, function (value) {
                            itemTotal += value.price * value.qty;
                        });
                        return itemTotal;
                    },
                    pendingRouteOfficerTeaIssueTotal: function () {
                        var itemTotal = 0.0;
                        angular.forEach(this.pendingTeaIssueRequest, function (value) {
                            itemTotal += value[2];
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
                    //client
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
                    issueConfirmation: function (teaGrade) {
                        var label;
                        angular.forEach(this.pendingTeaIssueRequest, function (value) {
                            if (teaGrade === parseInt(value[1])) {
                                label = true;
                                return;
                            }
                        });
                        return label;
                    },
                    getTeaGradeIssueCount: function (teaGrade) {
                        var total = 0;
                        angular.forEach(this.teaIssueList, function (value) {
                            if (teaGrade === parseInt(value.teaGrade)) {
                                total += value.qty;
                                return;
                            }
                        });
                        return total;
                    },
                    getOfficerTeaGradeAmount: function (teaGrade) {
                        var total = 0;
                        angular.forEach(this.pendingTeaIssueRequest, function (value) {
                            if (teaGrade === parseInt(value[1])) {
                                total += value[2];
                                return;
                            }
                        });
                        return total;
                    },
                    requestDuplicateCheck: function (client, teaGrade) {
                        var data;
                        angular.forEach(this.teaIssueList, function (values) {
                            if (values.client === parseInt(client) && values.teaGrade === parseInt(teaGrade)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    }
                };
                return TeaSettlementModel;
            });
}());