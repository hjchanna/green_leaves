(function () {
    angular.module("appModule")
            .factory("DirectTeaIssueModel", function (DirectTeaIssueService, FertilizerModelFactory, $q, $filter) {
                function DirectTeaIssueModel() {
                    this.constructor();
                }

                DirectTeaIssueModel.prototype = {
                    //client information
                    clients: [],
                    //products information
                    products: [],
                    //routeOfficers information
                    routeOfficers: [],
                    constructor: function () {
                        var that = this;
                        that.data = FertilizerModelFactory.newData();
                        
                        DirectTeaIssueService.loadClients()
                                .success(function (data) {
                                    that.clients = data;
                                });

                        DirectTeaIssueService.loadRouteOfficers()
                                .success(function (data) {
                                    that.routeOfficers = data;
                                });
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
                return DirectTeaIssueModel;
            });
}());