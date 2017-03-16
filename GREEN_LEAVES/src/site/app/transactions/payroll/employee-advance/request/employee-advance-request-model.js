(function () {
    var factory = function (EmployeeAdvanceRequestService, EmployeeAdvanceRequestFactory, $q, $filter) {
        function EmployeeAdvanceRequestModel() {
            this.constructor();
        }

        //prototype functions
        EmployeeAdvanceRequestModel.prototype = {
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
                
                EmployeeAdvanceRequestService.loadEmployees()
                        .success(function (data) {
                            that.employees = data;
                        });
            }
           
            ,clear: function () {
                this.data = EmployeeAdvanceRequestFactory.newData();
                this.tempData = EmployeeAdvanceRequestFactory.newTempData();
                this.refreshQuantity();
                
            }
//            //table add temp data
            , addDetail: function () {
                var defer = $q.defer();
                if (this.tempData.employee && this.tempData.asAtDate && this.tempData.amount) {
                    this.data.employeeAdvanceRequestDetail.push(this.tempData);
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
                var requestDetails = this.data.employeeAdvanceRequestDetail[index];
                this.data.employeeAdvanceRequestDetail.splice(index, 1);
                console.log(requestDetails);
                this.tempData = requestDetails;
                
                this.refreshQuantity();
            }
            //table detail delete
            ,deleteDetail: function (index) {
                var that = this;
                that.data.employeeAdvanceRequestDetail.splice(index, 1);
                    this.refreshQuantity();              
            }  
            , refreshQuantity: function () {
                var requestAmountTotal = 0.0;
                angular.forEach(this.data.employeeAdvanceRequestDetail, function (value) {
                    requestAmountTotal += parseFloat(value.amount);
                    return;
                });
                this.requestTotal.requestAmountTotal = requestAmountTotal;
                this.requestTotal.requestTotal = this.data.employeeAdvanceRequestDetail.length;
                return this.requestTotal;
            }
            , employeeLabel: function (index) {
                var label;
                angular.forEach(this.employees, function (value) {
                    if (value.indexNo === index) {
                        label = value.indexNo + ' - ' + value.name;
                        return;
                    }
                });
                return label;
            }
            
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
                if (this.data.date && this.data.employeeAdvanceRequestDetail.length !== 0) {
                    console.log("this.data");
                    console.log(this.data);
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
                angular.forEach(this.data.employeeAdvanceRequestDetail, function (value) {
                    if (value.employee === parseInt(employee) && angular.equals($filter('date')(value.asAtDate, 'yyyy-MM'), $filter('date')(date, 'yyyy-MM'))) {
                        label = true;
                        return;
                    }
                });
                return label;
            }
        };
        return EmployeeAdvanceRequestModel;
    };
    angular.module("appModule")
            .factory("EmployeeAdvanceRequestModel", factory);
}());