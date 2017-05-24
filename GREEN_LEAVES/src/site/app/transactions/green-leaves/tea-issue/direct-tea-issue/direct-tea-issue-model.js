(function () {
    angular.module("appModule")
            .factory("DirectTeaIssueModel", function (TeaIssueService, TeaIssueModelFactory, $q, $filter) {
                function DirectTeaIssueModel() {
                    this.constructor();
                }

                DirectTeaIssueModel.prototype = {
                    //data model
                    data: {},
                    tempData: {},
                    //client information
                    clients: [],
                    //route information
                    routes: [],
                    //routeOfficer information
                    routeOfficers: [],
                    //tea issue items
                    teaIssueItems: [],
                    //total value
                    totalValue: 0.0,
                    constructor: function () {
                        var that = this;
                        that.data = that.clear();

                        TeaIssueService.loadRoutes()
                                .success(function (data) {
                                    that.routes = data;
                                });

                        TeaIssueService.loadClients()
                                .success(function (data) {
                                    that.clients = data;
                                });

//                        TeaIssueService.loadRouteOfficers()
//                                .success(function (data) {
//                                    that.routeOfficers = data;
//                                });

                        TeaIssueService.loadTeaIssueItems()
                                .success(function (data) {
                                    that.teaIssueItems = data;
                                });
                    },
                    clear: function () {
                        this.data = TeaIssueModelFactory.newTeaIssue();
                        this.tempData = TeaIssueModelFactory.newTeaIssueDetail();

                        this.data.type = "DIRECT_TEA_ISSUE";
                    },
                    addDetail: function () {
                        var defer = $q.defer();
                        var that = this;

                        if (
                                (that.tempData.client || that.tempData.routeOfficer)
                                && that.tempData.teaIssueItem
                                && that.tempData.quantity
                                ) {

                            var teaIssueItem = that.teaIssueItem(that.tempData.teaIssueItem);
                            that.tempData.unitPrice = teaIssueItem.unitPrice;
                            that.tempData.value = teaIssueItem.unitPrice * that.tempData.quantity;

                            that.data.teaIssueDetails.unshift(that.tempData);
                            that.tempData = TeaIssueModelFactory.newTeaIssueDetail();

                            that.updateTotalValue();

                            defer.resolve();
                        } else {
                            defer.reject();
                        }

                        return defer.promise;
                    },

                    editDetail: function (index) {
                        var teaIssue = this.data.teaIssueDetails[index];
                        this.data.teaIssueDetails.splice(index, 1);
                        this.tempData = teaIssue;
                        this.updateTotalValue();
                    },
                    deleteDetail: function (index) {
                        var defer = $q.defer();
                        var that = this;
                        var teaIssue = this.data.teaIssueDetails[index];

                        if (teaIssue.indexNo) {//should call server to delete
                            TeaIssueService.deleteTeaIssueDetail(teaIssue.indexNo)
                                    .success(function () {
                                        that.data.teaIssueDetails.splice(index, 1);
                                        that.updateTotalValue();
                                        defer.resolve();
                                    })
                                    .error(function () {
                                        defer.reject();
                                    });
                        } else {
                            that.data.teaIssueDetails.splice(index, 1);
                            that.updateTotalValue();
                            defer.resolve();
                        }

                        return defer.promise;
                    },

                    detailDuplicateCheck: function (client, teaIssueItem) {
                        var isDuplicate = false;
                        angular.forEach(this.data.teaIssueDetails, function (values) {
                            if (values.client === client && values.teaIssueItem === teaIssueItem) {
                                isDuplicate = true;
                                return;
                            }
                        });
                        return isDuplicate;
                    },

                    loadTeaIssue: function () {
                        var that = this;
                        var defer = $q.defer();
                        
                        
                        var number = this.data.number;
                        var type = "DIRECT_TEA_ISSUE";
                        TeaIssueService.loadTeaIssue(number, type)
                                .success(function (data) {
                                    that.data = {};
                                    angular.extend(that.data, data);
                                    
                                    that.updateTotalValue();
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.updateTotalValue();
                                    defer.reject();
                                });
                        return defer.promise;
                    },

                    saveTeaIssue: function () {
                        var that = this;
                        var defer = $q.defer();

                        TeaIssueService.saveTeaIssue(this.data)
                                .success(function (data) {
                                    defer.resolve();
                                    that.clear();
                                })
                                .error(function (data) {
                                    defer.reject();
                                });

                        return defer.promise;
                    },

                    deleteTeaIssue: function () {
                        var that = this;
                        TeaIssueService.deleteTeaIssue(this.data.indexNo)
                                .success(function () {
                                    that.clear();
                                });
                    },

                    //start get data by index no
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
                    teaIssueItem: function (indexNo) {
                        var teaIssueItem;
                        angular.forEach(this.teaIssueItems, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                teaIssueItem = value;
                                return;
                            }
                        });
                        return teaIssueItem;
                    },
                    //end get data by index no



                    //start get labels by index number
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
                    teaIssueItemLabel: function (indexNo) {
                        var label;
                        angular.forEach(this.teaIssueItems, function (value) {
                            if (value.indexNo === indexNo) {
                                label = value.indexNo + "-" + value.name;
                                return;
                            }
                        });
                        return label;
                    },
                    //end get label by index no



                    //find customer by client number
                    clientByClientNumber: function (clientNumber) {
                        var client;
                        angular.forEach(this.clients, function (value) {
                            if (value.clientNumber === parseInt(clientNumber)) {
                                client = value;
                                return;
                            }
                        });
                        return client;
                    },
                    //update total value
                    updateTotalValue: function () {
                        var total = 0.0;

                        angular.forEach(this.data.teaIssueDetails, function (teaIssueDetail) {
                            total += teaIssueDetail.value;
                        });

                        this.totalValue = total;
                    }
                };

                return DirectTeaIssueModel;
            });
}());