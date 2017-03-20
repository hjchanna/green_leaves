(function () {
    var factory = function (LoanRequestService, optionPane) {
        function LoanApproveModel() {
            this.constructor();
        }

        //prototype functions
        LoanApproveModel.prototype = {
            detail: null,
            //constructor
            constructor: function () {
                var that = this;

                //load pending request
                LoanRequestService.loadcheckPendingRequest()
                        .success(function (data) {
                            console.log(data);
                            that.loanRequestDetails = data;
                        });

                //load clients
                LoanRequestService.loadEmployee()
                        .success(function (data) {
                            that.employees = data;
                        });

            },
//            //clear all data
            clear: function () {
                var that = this;
                that.detail = [];
            },
//            //loan total
            getRequestTotal: function (indexNo) {
                var total = 0.0;

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
                var count = 0;

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
//            //get employee
            getEmployee: function (indexNo) {
                var employee = null;

                angular.forEach(this.employees, function (value) {
                    if (value.indexNo === indexNo) {
                        employee = value;
                        return;
                    }
                });

                return employee;
            },
            approve: function () {
                var that = this;
                if (that.detail) {
                    LoanRequestService.approveRequest(that.detail.indexNo, that.detail.agreementNumber)
                            .success(function () {
                                that.loanRequestDetails.splice(that.loanRequestDetails.indexOf(that.detail), 1);
                                optionPane.successMessage("loan details approved successfully.");
                            })
                            .error(function () {

                            });
                }
            },
//            reject: function () {
//                var that = this;
//                if (that.detail) {
//                    LoanRequestService.rejectRequest(that.detail.indexNo)
//                            .success(function () {
//                                that.loanRequestDetails.splice(that.loanRequestDetails.indexOf(that.detail), 1);
//                                optionPane.successMessage("loan details rejected successfully.");
//                            })
//                            .error(function () {
//
//                            });
//                }
//
//            }
        };

        return LoanApproveModel;
    };

    angular.module("appModule")
            .factory("LoanApproveModel", factory);
}());