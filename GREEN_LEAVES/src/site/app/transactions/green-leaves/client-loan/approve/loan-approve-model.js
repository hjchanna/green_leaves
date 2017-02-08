(function () {
    var factory = function (LoanRequestService, LoanCheckModelFactory, optionPane) {
        function LoanApproveModel() {
            this.constructor();
        }

        //prototype functions
        LoanApproveModel.prototype = {
            data: {},
            //temp input
            tempData: {},
            detail: "",
            //constructor
            constructor: function () {
                var that = this;
                that.data = LoanCheckModelFactory.newData();
                that.tempData = LoanCheckModelFactory.newTempData();

                //load pending request
                LoanRequestService.loadcheckPendingRequest()
                        .success(function (data) {
                            that.loanRequestDetails = data;
                        });

                //load clients
                LoanRequestService.loadClients()
                        .success(function (data) {
                            that.clients = data;
                        });

                //load routes
                LoanRequestService.loadRoutes()
                        .success(function (data) {
                            that.routes = data;
                        });

            },
            //clear all data
            clear: function () {
                var that = this;
                that.detail = [];
            },
            //loan total
            getRequestTotal: function (indexNo) {
                var total = 0.0;

                angular.forEach(this.loanRequestDetails, function (valueData) {
                    if (indexNo ? valueData.indexNo === indexNo : true) {
                        if (valueData.status === 'CHECK') {
                            total = total + valueData.amount;
                        }
                    }
                });

                return total;
            },
            getRequestCount: function (indexNo) {
                var count = 0;

                angular.forEach(this.loanRequestDetails, function (valueData) {
                    if (indexNo ? valueData.indexNo === indexNo : true) {
                        if (valueData.status === 'CHECK') {
                            count = count + 1;
                        }
                    }
                });

                return count;
            },
            selectDetail: function (indexNo) {
                var that = this;

                angular.forEach(this.loanRequestDetails, function (value) {
                    if (value.indexNo === indexNo) {
                        if (value.status === 'CHECK') {
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
//            getRoute: function () {
//               console.log(this.clients);
                
               
//                var route = null;

//                angular.forEach(this.routes, function (value) {
//                    if (value.indexNo === indexNo) {
//                        route = value;
//                        return;
//                    }
//                });

//                return route;
//            },
            approve: function () {
                var that = this;
                var data = JSON.stringify(that.detail);
                if (data) {
                    LoanRequestService.approveRequest(data)
                            .success(function (data) {
//                                that.detail.status = "CHECK";
                                optionPane.successMessage("loan details approved successfully.");
                            })
                            .error(function () {

                            });
                }
            },
            reject: function () {
                var that = this;
                if (that.detail) {
                    LoanRequestService.rejectRequest(that.detail.indexNo)
                            .success(function () {
                                optionPane.successMessage("loan details rejected successfully.");
//                                that.detail.status = "REJECTED";
                            })
                            .error(function () {

                            });
                }

            }
        };

        return LoanApproveModel;
    };

    angular.module("appModule")
            .factory("LoanApproveModel", factory);
}());