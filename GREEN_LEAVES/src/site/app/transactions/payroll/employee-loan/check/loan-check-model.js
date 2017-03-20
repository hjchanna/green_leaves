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
            employees: [],
            //constructor
            constructor: function () {

                //load pending request
                this.loadPendingRequest();

                var that = this;
                that.data = LoanCheckModelFactory.newData();
                that.tempData = LoanCheckModelFactory.newTempData();



                //load clients
                LoanRequestService.loadEmployee()
                        .success(function (data) {
                            that.employees = data;
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
                console.log(indexNo);
                var that = this;
                var defer = $q.defer();
                LoanRequestService.findByTLoanRequestDetailByIndexNo(indexNo)
                        .success(function (data) {
                            that.tempData = {};
                    
                            console.log("data "+indexNo);
                            console.log(data);
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
                    LoanRequestService.rejectRequest(that.tempData.indexNo)
                            .success(function () {
                                that.clear();
                        console.log('reject');
                        console.log(that.tempData.indexNo);
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
            },
//            clientLabel: function (indexNo) {
//                var label;
//                angular.forEach(this.clients, function (value) {
//                    if (value.indexNo === indexNo) {
//                        label = value.clientNumber + "-" + value.name;
//                        return;
//                    }
//                });
//                return label;
//            }
        };

        return LoanCheckModel;
    };

    angular.module("appModule")
            .factory("LoanCheckModel", factory);
}());