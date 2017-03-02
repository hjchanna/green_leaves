(function () {
    var factory = function (LoanRequestService, LoanCheckModelFactory, $q) {
        function LoanCheckModel() {
            this.constructor();
        }

        //prototype functions
        LoanCheckModel.prototype = {
            data: {},
            tempData: {},
            //pending request information
            pendingRequest: [],
            //client information
            clients: [],
            //constructor
            constructor: function () {
                var that = this;
                that.data = LoanCheckModelFactory.newData();
                that.tempData = LoanCheckModelFactory.newTempData();

                //load pending request
                this.loadPendingRequest();

                //load clients
                LoanRequestService.loadClients()
                        .success(function (data) {
                            that.clients = data;
                        });

            },
            //load pending loan request
            loadPendingRequest: function () {
                var that = this;
                LoanRequestService.loadPendingRequest()
                        .success(function (data) {
                            that.pendingRequest = data;
                        });
            },
            //clear all data
            clear: function () {
                var that = this;
                that.data = LoanCheckModelFactory.newData();
                that.tempData = LoanCheckModelFactory.newTempData();
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
                LoanRequestService.findByTLoanRequestDetailByIndexNo(indexNo)
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
                    LoanRequestService.checkRequest(data)
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
                    LoanRequestService.rejectRequest(that.tempData.indexNo, that.tempData.agreemenetNumber)
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

        return LoanCheckModel;
    };

    angular.module("appModule")
            .factory("LoanCheckModel", factory);
}());