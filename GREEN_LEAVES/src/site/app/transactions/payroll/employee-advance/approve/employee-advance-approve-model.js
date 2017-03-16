(function () {
    angular.module("appModule")
            .factory("EmployeeAdvanceApproveModel", function (EmployeeAdvanceRequestService) {
                function EmployeeAdvanceApproveModel() {
                    this.constructor();
                }

                EmployeeAdvanceApproveModel.prototype = {
                    data: null,
                    detail: null,
                    requests: [],
                    requestsData: [],
                    requestsDetails: [],
                    selectData: function () {
                        var that = this;
                        that.detail = null;
                        this.requestsData = [];
                        EmployeeAdvanceRequestService.findByStatus()
                                .success(function (data) {
                                    that.requestsData.push(data);
                                });

                    },
                    selectDetails: function (date) {
                        var that = this;
                        that.requestsDetails = [];
                        console.log(date);

                        EmployeeAdvanceRequestService.findByDate(date)
                                .success(function (data) {
                                    console.log("this.requestsDetails");
                                    that.requestsDetails = data;
                                    console.log(that.requestsDetails);
                                });

                    },
                    refresh: function () {
                        var that = this;
                        EmployeeAdvanceRequestService.loadPendingRequests()
                                .success(function (data) {
                                    that.requests = data;
                                });
                    },
                    clear: function () {

                    },
                    approve: function (indexNo) {
                        var that = this;
                        EmployeeAdvanceRequestService.approveRequest(indexNo)
                                .success(function () {
                                    that.delectStatusChangeRow(indexNo);
                                    console.log('success');
                                })
                                .error(function () {

                                });
                    },
                    reject: function (indexNo) {
                        var that = this;
                        EmployeeAdvanceRequestService.rejectRequest(indexNo)
                                .success(function () {
                                    that.delectStatusChangeRow(indexNo);
                                })
                                .error(function () {

                                });
                    },
                    delectStatusChangeRow: function (indexNo) {
                        var that = this;
                        var id = -1;
                        for (var i = 0; i < that.requestsDetails.length; i++) {
                            if (that.requestsDetails[i].indexNo === indexNo) {
                                id = i;
                            }
                        }

                        that.requestsDetails.splice(id, 1);
                        that.getRequestTotal();
                        that.getRequestCount();
                        that.getRequestDataTotal();
                        that.refresh();
                    },
                    getEmployee: function (indexNo) {
                        var employees;
                        angular.forEach(this.employees, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                employees = value;
                                return;
                            }
                        });
                        return employees;
                    },
                    getRequestTotal: function () {
                        var total = 0.0;
                        angular.forEach(this.requests, function (values) {
                            total = total + values[1];
                        });
                        return total;
                    },
                    getRequestCount: function () {
                        var total = 0;
                        angular.forEach(this.requests, function (values) {
                            total = total + values[2];
                        });
                        return total;
                    },
                    getRequestDataTotal: function () {
                        var amount = 0.0;
                        angular.forEach(this.requestsDetails, function (values) {
                            amount = amount + values.amount;
                        });
                        return amount;
                    },
                    constructor: function () {
                        var that = this;

                        EmployeeAdvanceRequestService.loadEmployees()
                                .success(function (data) {
                                    that.employees = data;

                                });

                        EmployeeAdvanceRequestService.loadPendingRequests()
                                .success(function (data) {
                                    that.requests = data;
                                });
                    }
                };
                return EmployeeAdvanceApproveModel;
            });
}());

