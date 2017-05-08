(function () {
    var factory = function (ClientLoanRequestService, ClientLoanCheckModelFactory, $q) {
        function ClientLoanCheckModel() {
            this.constructor();
        }

        //prototype functions
        ClientLoanCheckModel.prototype = {
            data: {},
            tempData: {},
            //pending request information
            pendingRequest: [],
            //client information
            clients: [],
            //constructor
            constructor: function () {
                var that = this;
                that.data = ClientLoanCheckModelFactory.newData();
                that.tempData = ClientLoanCheckModelFactory.newTempData();

                //load pending request
                this.loadPendingRequest();

                //load clients
                ClientLoanRequestService.loadClients()
                        .success(function (data) {
                            that.clients = data;
                        });

            },
            //load pending loan request
            loadPendingRequest: function () {
                var that = this;
                ClientLoanRequestService.loadPendingRequest()
                        .success(function (data) {
                            that.pendingRequest = data;
                        });
                        console.log("L");
            },
            //clear all data
            clear: function () {
                var that = this;
                that.data = ClientLoanCheckModelFactory.newData();
                that.tempData = ClientLoanCheckModelFactory.newTempData();
                that.loadPendingRequest();
            },
            //loan total
            getRequestTotal: function () {
                var total = 0.0;
                angular.forEach(this.pendingRequest, function (valueData) {
                    total += valueData[4];
                    return;
                });
                return total;
            },
            //select client get loan data
            selectDetail: function (indexNo) {
                var that = this;
                var defer = $q.defer();
                ClientLoanRequestService.findByTLoanRequestDetailByIndexNo(indexNo)
                        .success(function (data) {
                            that.tempData = {};
                            that.tempData = data;
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            //check request
            checkRequest: function () {
                var that = this;
                var defer = $q.defer();
                var data = JSON.stringify(that.tempData);
                if (data) {
                    ClientLoanRequestService.checkRequest(data)
                            .success(function (data) {
                                that.clear();
                                defer.resolve();
                            })
                            .error(function () {
                                defer.reject();
                            });
                    return defer.promise;
                }
            },
            reject: function () {
                var that = this;
                var defer = $q.defer();
                var data = JSON.stringify(that.tempData);
                if (data) {
                    ClientLoanRequestService.rejectRequest(that.tempData.indexNo)
                            .success(function () {
                                that.clear();
                                defer.resolve();
                            })
                            .error(function () {
                                that.clear();
                                defer.reject();
                            });
                    return defer.promise;
                }
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

        return ClientLoanCheckModel;
    };

    angular.module("appModule")
            .factory("ClientLoanCheckModel", factory);
}());