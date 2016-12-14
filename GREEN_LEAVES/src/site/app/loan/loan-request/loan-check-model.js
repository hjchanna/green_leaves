(function () {
    var factory = function (LoanRequestService, LoanCheckModelFactory, optionPane) {
        function LoanCheckModel() {
            this.constructor();
        }

        //prototype functions
        LoanCheckModel.prototype = {
            data: {},
            //temp input
            tempData: {},
            detail: "",
            //pending request information
            PendingList: [],
            //client information
            clients: [],
            //constructor
            constructor: function () {
                var that = this;
                that.data = LoanCheckModelFactory.newData();
                that.tempData = LoanCheckModelFactory.newTempData();

                //load pending request
                LoanRequestService.loadPendingRequest()
                        .success(function (data) {
                            that.PendingList = data;
                        });

                //load clients
                LoanRequestService.loadClients()
                        .success(function (data) {
                            that.clients = data;
                        });

            },
            //clear all data
            clear: function () {
                this.tempData = LoanCheckModelFactory.newTempData();
            },
            //loan total
            getRequestTotal: function (indexNo) {
                var total = 0.0;

                angular.forEach(this.PendingList, function (valueData) {
                    if (indexNo ? valueData.indexNo === indexNo : true) {
                        angular.forEach(valueData.loanRequestDetails, function (valueDetail) {
                            if (valueDetail.status === 'PENDING') {
                                total = total + valueDetail.amount;
                            }
                        });
                    }
                });

                return total;
            },
            //pending count
            getRequestCount: function (indexNo) {
                var count = 0;

                angular.forEach(this.PendingList, function (valueData) {
                    if (indexNo ? valueData.indexNo === indexNo : true) {
                        angular.forEach(valueData.loanRequestDetails, function (valueDetail) {
                            if (valueDetail.status === 'PENDING') {
                                count = count + 1;
                            }
                        });
                    }
                });

                return count;
            },
            selectData: function (indexNo) {
                var that = this;

                angular.forEach(this.PendingList, function (value) {
                    if (value.indexNo === indexNo) {
                        that.data = value;
                        return;
                    }
                });
            },
            selectDetail: function (indexNo) {
                var that = this;

                angular.forEach(this.data.loanRequestDetails, function (value) {
                    if (value.indexNo === indexNo) {
                        if (value.status === 'PENDING') {
                            that.detail = value;
                            return;
                        }
                    }
                });
            },
            //get client
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
            checkRequest: function () {
                var that = this;
//                console.log(that.PendingList +"pending list");
                console.log(that.detail + "details");
//                console.log(that.detail);
                var data = JSON.stringify(that.detail);
                if (data) {
                    LoanRequestService.checkRequest(data)
                            .success(function (data) {
                                optionPane.successMessage("loan details checked successfully.");
                            })
                            .error(function () {

                            });
                }
            }
        };

        return LoanCheckModel;
    };

    angular.module("appModule")
            .factory("LoanCheckModel", factory);
}());