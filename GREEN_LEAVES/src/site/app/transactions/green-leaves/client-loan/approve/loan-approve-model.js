(function () {
    var factory = function (ClientLoanRequestService, optionPane) {
        function LoanApproveModel() {
            this.constructor();
        }

        //prototype functions
        LoanApproveModel.prototype = {
            detail: null,
            placeIndex: -1,
            //constructor
            constructor: function () {
                var that = this;

                //load pending request
                ClientLoanRequestService.loadcheckPendingRequest()
                        .success(function (data) {
                            that.loanRequestDetails = data;
                        });

                //load client
                ClientLoanRequestService.loadClients()
                        .success(function (data) {
                            that.clients = data
                        })

            },
            //clear all data
            clear: function () {
                var that = this;
                that.detail = [];
            },
            //loan total
            getRequestTotal: function (indexNo) {
                var total = 0.0
                angular.forEach(this.loanRequestDetails, function (valueData) {
                    if (indexNo ? valueData.indexNo === indexNo : true) {
                        if (valueData.status === 'CHECKED') {
                            total = total + valueData.amount;
                        }
                    }
                });

                return total;
            },
            getRequestCount: function (indexNo) {
                var count = 0
                angular.forEach(this.loanRequestDetails, function (valueData) {
                    if (indexNo ? valueData.indexNo === indexNo : true) {
                        if (valueData.status === 'CHECKED') {
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
                        that.detail = value;
                        return;
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
            approve: function () {
                var that = this;
                if (that.detail) {
                    ClientLoanRequestService.approveRequest(that.detail.indexNo, that.detail.agreementNumber)
                            .success(function () {
                                ClientLoanRequestService.loadcheckPendingRequest()
                                        .success(function (data) {
                                            that.loanRequestDetails = data;
                                        });


                                optionPane.successMessage("Loan Detail Approved Successfully.");
                            })
                            .error(function () {
                                optionPane.errorMessage("Loan Detail Approved Failed.");
                            });
                }
            },
            reject: function () {
                var that = this;
                if (that.detail) {
                    ClientLoanRequestService.rejectRequest(that.detail.indexNo)
                            .success(function () {
                                ClientLoanRequestService.loadcheckPendingRequest()
                                        .success(function (data) {
                                            that.loanRequestDetails = data;
                                        });

                                optionPane.successMessage("Loan Detail Rejected Successfully.");
                            })
                            .error(function () {
                                optionPane.errorMessage("Loan Detail Rejected Failed.")
                            });
                }

            }
        };

        return LoanApproveModel;
    };

    angular.module("appModule")
            .factory("ClientLoanApproveModel", factory);
}());