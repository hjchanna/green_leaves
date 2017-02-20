(function () {
    angular.module("appModule")
            .factory("DirectTeaIssueModel", function (TeaIssueService, TeaIssueModelFactory, $q, $filter) {
                function DirectTeaIssueModel() {
                    this.constructor();
                }

                DirectTeaIssueModel.prototype = {
                    //data model
                    data: {},
                    //client information
                    clients: [],
                    //routeOfficers information
                    routeOfficers: [],
                    //teagrades
                    teaGrades: [],
                    //teaIsse list
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
                    load: function () {
                        var that = this;
                        var defer = $q.defer();
                        var date = $filter('date')(this.data.date, 'yyyy-MM-dd');
                        var number = this.data.number;
                        var type = "DIRECT_TEA_ISSUE";
                        TeaIssueService.loadTeaIssue(date, number, type)
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
                        var that = this;
                        console.log(that.teaIssueList);
                        if (that.data.date && that.data.client && that.data.teaGrade && parseInt(that.data.qty) > 0) {
                            that.data.type = "DIRECT_TEA_ISSUE";
                            that.teaIssueList.push(that.data);
                            that.data = TeaIssueModelFactory.newData();
                            that.itemTotal();
                            defer.resolve();
                        } else {
                            defer.reject();
                            that.itemTotal();
                        }
                        return defer.promise;
                    },
                    deleteTeaIssue: function () {
                        var that = this;
                        TeaIssueService.deleteTeaIssue(this.data.indexNo)
                                .success(function () {
                                    that.clear();
                                });
                    },
                    clear: function () {
                        this.data = TeaIssueModelFactory.newData();
                        this.teaIssueList = [];
                    },
                    save: function () {
                        var that = this;
                        var defer = $q.defer();

                        TeaIssueService.saveTeaIssue(this.teaIssueList)
                                .success(function (data) {
                                    defer.resolve();
                                    that.clear();
                                })
                                .error(function (data) {
                                    that.clear();
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    itemTotal: function () {
                        var itemTotal = 0.0;
                        angular.forEach(this.teaIssueList, function (value) {
                            itemTotal += value.price * value.qty;
                        });
                        return itemTotal;
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
                return DirectTeaIssueModel;
            });
}());