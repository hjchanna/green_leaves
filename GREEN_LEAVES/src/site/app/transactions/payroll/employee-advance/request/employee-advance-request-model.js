(function () {
    var factory = function (EmployeeAdvanceRequestService, EmployeeAdvanceRequestFactory, $q, $filter) {
        function ClientAdvanceRequestModel() {
            this.constructor();
        }

        //prototype functions
        ClientAdvanceRequestModel.prototype = {
            data: {},
            //temp input
            tempData: {},
            //employees information
            employees: [],
            //requets count
            requestTotal: {
                requestTotal: 0.0,
                requestAmountTotal: 0.0
            },
            //constructor
            constructor: function () {
                var that = this;
                that.data = EmployeeAdvanceRequestFactory.newData();
                that.tempData = EmployeeAdvanceRequestFactory.newTempData();
                //load default values
//                EmployeeAdvanceRequestService.loadRoutes()
//                        .success(function (data) {
//                            that.routes = data;
//                        });
                EmployeeAdvanceRequestService.loadEmployees()
                        .success(function (data) {
                            that.employees = data;
                        });
            }
            //find by number
//            load: function () {
//                var that = this;
//                var defer = $q.defer();
//                EmployeeAdvanceRequestService.loadAdvanceRequestByNumber(this.data.number)
//                        .success(function (data) {
//                            that.data = {};
//                            angular.extend(that.data, data);
//                            that.refreshQuantity();
//                            defer.resolve();
//                        })
//                        .error(function (data) {
//                            that.data.indexNo = null;
//                            that.data.banch = null;
//                            that.data.date = null;
//                            // that.data.number = null;
//                            that.data.transaction = null;
//                            that.data.route = null;
//                            that.data.status = "PENDING";
//                            that.data.clientAdvanceRequestDetails = [];
//                            that.refreshQuantity();
//                            defer.reject();
//                        });
//                return defer.promise;
//            },
            //find by branch nd route and date
//            findByRouteAndDate: function () {
//                var that = this;
//                var defer = $q.defer();
//                var route = this.data.route;
//                var date = $filter('date')(this.data.date, 'yyyy-MM-dd');
//                EmployeeAdvanceRequestService.findByRouteAndDate(route, date)
//                        .success(function (data) {
//                            that.data = {};
//                            angular.extend(that.data, data);
//                            that.refreshQuantity();
//                            defer.resolve();
//                        })
//                        .error(function (data) {
//                            that.data.indexNo = null;
//                            //that.data.banch = null;
//                            //that.data.date = null;
//                            that.data.number = null;
//                            that.data.transaction = null;
//                            //that.data.route = null;
//                            that.data.status = "PENDING";
//                            that.data.clientAdvanceRequestDetails = [];
//                            that.refreshQuantity();
//                            defer.reject();
//                        });
//                return defer.promise;
//            },
            //clear all data
            ,clear: function () {
                this.data = EmployeeAdvanceRequestFactory.newData();
                this.tempData = EmployeeAdvanceRequestFactory.newTempData();
                this.refreshQuantity();
                
            }
//            //table add temp data
            , addDetail: function () {
                var defer = $q.defer();
                if (this.tempData.employee && this.tempData.asAtDate && this.tempData.amount) {
                    this.data.employeeAdvanceRequestDetails.push(this.tempData);
                    this.tempData = EmployeeAdvanceRequestFactory.newTempData();
                    this.refreshQuantity();
                    defer.resolve();
                } else {
                    defer.reject();
                }

                return defer.promise;
            },
            //table detail edit
            editDetail: function (index) {
                var requestDetails = this.data.employeeAdvanceRequestDetails[index];
                this.data.employeeAdvanceRequestDetails.splice(index, 1);
                console.log(requestDetails);
                this.tempData = requestDetails;
                
                this.refreshQuantity();
            }
            //table detail delete
            ,deleteDetail: function (index) {
                var that = this;
//                var request = this.data.employeeAdvanceRequestDetails[parseInt(index)];
                that.data.employeeAdvanceRequestDetails.splice(index, 1);
                    this.refreshQuantity();
//                if (request.indexNo) {
//                    console.log("exists request delete");
//                    var indexNo = parseInt(request.indexNo);
//                    EmployeeAdvanceRequestService.deleteAdvanceRequestDetails(request)
//                            .success(function (data) {
//                                console.log(data);
//                                that.refreshQuantity();
//                            })
//                            .error(function (data) {
//
//                            });
//                } else {
//                    console.log("new request delete");
//                    this.data.clientAdvanceRequestDetails.splice(index, 1);
//                }

            }
//            //delete fully client advance request and request details
//            deleteAdvanceRequest: function () {
//                var that = this;
//                EmployeeAdvanceRequestService.deleteAdvancerRequest(this.data.indexNo)
//                        .success(function (data) {
//                            that.clear();
//                        });
//            },
            //get total request count and total request amount
            , refreshQuantity: function () {
                var requestAmountTotal = 0.0;
                angular.forEach(this.data.employeeAdvanceRequestDetails, function (value) {
                    requestAmountTotal += parseFloat(value.amount);
                    return;
                });
                this.requestTotal.requestAmountTotal = requestAmountTotal;
                this.requestTotal.requestTotal = this.data.employeeAdvanceRequestDetails.length;
                return this.requestTotal;
            }
            , employeeLabel: function (indexNo) {
                var label;
                angular.forEach(this.employees, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.indexNo + ' - ' + value.name;
                        return;
                    }
                });
                return label;
            }
//            client: function (indexNo) {
//                var client;
//                angular.forEach(this.clients, function (value) {
//                    if (value.indexNo === parseInt(indexNo)) {
//                        client = value;
//                        return;
//                    }
//                });
//                return client;
//            },
//            //validation
            , validateEmployee: function (EmployeeNo) {
                var c = null;
                angular.forEach(this.employees, function (value) {
                    if (value.employeeNumber === parseInt(EmployeeNo)) {
                        c = value;
                        return;
                    }
                });
                if (c) {
                    this.tempData.employee = c.indexNo;
                } else {
                    this.tempData.employee = null;
                }
            },
            //save advance request and request details
            saveEmployeeApproveRequest: function () {
                var defer = $q.defer();
                if (this.data.date && this.data.employeeAdvanceRequestDetails.length !== 0) {
                    EmployeeAdvanceRequestService.saveAdvanceRequest(JSON.stringify(this.data))
                            .success(function (data) {
                                defer.resolve();
                            })
                            .error(function (data) {
                                defer.reject();
                            });
                    return defer.promise;
                }
            }
            , requestDuplicateCheck: function (employee, date) {
                var label;
                console.log(2);
                angular.forEach(this.data.employeeAdvanceRequestDetails, function (value) {
                    if (value.employee === parseInt(employee) && angular.equals($filter('date')(value.asAtDate, 'yyyy-MM'), $filter('date')(date, 'yyyy-MM'))) {
                        label = true;
                        return;
                    }
                });
                return label;
            }
        };
        return ClientAdvanceRequestModel;
    };
    angular.module("appModule")
            .factory("EmployeeAdvanceRequestModel", factory);
}());