(function () {
    var factory = function (EmployeeLoanRequestService, LoanCheckModelFactory, $q) {
        function EmployeeLoanCheckModel() {
            this.constructor();
        }

        //prototype functions
        EmployeeLoanCheckModel.prototype = {
            data: {},
            tempData: {},
            //pending request information
            pendingRequest: [],
            //employee information
            employees: [],
            //constructor
            constructor: function () {

                //load pending request
                this.loadPendingRequest();

                var that = this;
                that.data = LoanCheckModelFactory.newData();
                that.tempData = LoanCheckModelFactory.newTempData();



                //load clients
                EmployeeLoanRequestService.loadEmployee()
                        .success(function (data) {
                            that.employees = data;
                        });

            },
            //load pending loan request
            loadPendingRequest: function () {
                var that = this;
                EmployeeLoanRequestService.loadPendingRequest()
                        .success(function (data) {
                            that.pendingRequest = data;
                        });
            },
//            //clear all data
            clear: function () {
                var that = this;
                that.data = LoanCheckModelFactory.newData();
                that.tempData = LoanCheckModelFactory.newTempData();
                that.loadPendingRequest();
            },
//            //loan total
            getRequestTotal: function () {
                var total = 0.0;
                angular.forEach(this.pendingRequest, function (valueData) {
                    total += valueData[4];
                    return;
                });
                return total;
            },
//            //select employee get loan data
            selectDetail: function (indexNo) {
                var that = this;
                var defer = $q.defer();
                EmployeeLoanRequestService.findByTLoanRequestDetailByIndexNo(indexNo)
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
//            //check request
            checkRequest: function () {
                var that = this;
                var defer = $q.defer();
                var data = JSON.stringify(that.tempData);
                if (data) {
                    EmployeeLoanRequestService.checkRequest(data)
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
                    EmployeeLoanRequestService.rejectRequest(that.tempData.indexNo)
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
            employee: function (indexNo) {
                var employee;

                angular.forEach(this.employees, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        employee = value;

                        return;
                    }
                });

                return employee;
            }
        };

        return EmployeeLoanCheckModel;
    };

    angular.module("appModule")
            .factory("EmployeeLoanCheckModel", factory);
}());