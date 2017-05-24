(function () {
    var factory = function (EmployeeLoanRequestService, optionPane) {
        function EmployeeLoanApproveModel() {
            this.constructor();
        }

        //prototype functions
        EmployeeLoanApproveModel.prototype = {
            detail: null,
            //constructor
            constructor: function () {
                var that = this;

                //load pending request
                EmployeeLoanRequestService.loadcheckPendingRequest()
                        .success(function (data) {
                            that.loanRequestDetails = data;
                        });

                //load clients
                EmployeeLoanRequestService.loadEmployee()
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
                    EmployeeLoanRequestService.approveRequest(that.detail.indexNo, that.detail.agreementNumber)
                            .success(function () {
                                EmployeeLoanRequestService.loadcheckPendingRequest()
                                        .success(function (data) {
                                            that.loanRequestDetails = data;
                                        });
                                optionPane.successMessage("loan details approved successfully.");
                            })
                            .error(function () {

                            });
                }
            },
            reject: function () {
                var that = this;
                if (that.detail) {
                    EmployeeLoanRequestService.rejectRequest(that.detail.indexNo)
                            .success(function () {
                                EmployeeLoanRequestService.loadcheckPendingRequest()
                                        .success(function (data) {
                                            that.loanRequestDetails = data;
                                        });
                                optionPane.successMessage("loan details rejected successfully.");
                            })
                            .error(function () {

                            });
                }
            }
        }
        return EmployeeLoanApproveModel;
    };

    angular.module("appModule")
            .factory("EmployeeLoanApproveModel", factory);
}());