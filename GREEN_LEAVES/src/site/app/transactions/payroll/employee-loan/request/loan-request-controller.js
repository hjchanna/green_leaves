(function () {
    angular.module("appModule")
            .controller("EmployeeLoanRequestController", function ($scope, EmployeeLoanRequestModel, $timeout, $filter, Notification, ConfirmPane) {
                $scope.model = new EmployeeLoanRequestModel();
                $scope.model.tempEmployeeNo = null;
                $scope.ui = {};
//
                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.model.clear();

                    //set current date
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                    $timeout(function () {
                        document.querySelectorAll("#date")[0].focus();
                    }, 10);
                };
//
//                $scope.ui.edit = function () {
//                    $scope.ui.mode = "EDIT";
//
//                    $timeout(function () {
//                        document.querySelectorAll("#number")[0].focus();
//                    }, 10);
//                };
//
                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };
//
                $scope.ui.validateEmployee = function (event) {
                    var key = event ? event.keyCode || event.which : 13;
                    if (key === 13) {
                        var employee;
                        angular.forEach($scope.model.employees, function (value) {
                            if (value.employeeNumber === $scope.model.tempEmployeeNo) {
                                employee = value;
                                return;
                            }
                        });

                        if (typeof employee !== 'undefined') {
                            $scope.model.tempData.employee = employee.employeeNumber;
                        }
                        if ($scope.model.tempData.employee) {
                            $timeout(function () {
                                angular.element(document.querySelectorAll("#amount"))[0].focus();
                            }, 10);
                        } else {
                            $timeout(function () {
                                angular.element(document.querySelectorAll("#employee"))[0].focus();
                            }, 10);
                        }
                    }
                };
                $scope.ui.getEmployee = function (indexNo) {
                    var employee;
                    angular.forEach($scope.model.employees, function (value) {
                        if (value.indexNo === indexNo) {
                            employee = value;
                            return;
                        }
                    });
                    return employee;
                };
                $scope.ui.requestSummary = function () {
                    var sum = 0.0;
                    angular.forEach($scope.model.data.loanRequestDetails, function (value) {
                        sum = sum + value.amount;
                    });
                    return sum;
                };
                $scope.ui.insertLoanRequest = function () {
                    if (!$scope.model.tempData.employee) {
                        Notification.error("select employee");
                    } else if (!$scope.model.tempData.amount) {
                        Notification.error("enter amount");
                    } else if (!$scope.model.tempData.installmentCount) {
                        Notification.error("enter installment count");
                    } else if ($scope.model.tempData.employee
                            && $scope.model.tempData.amount
                            && $scope.model.tempData.installmentCount) {
                        $scope.model.insertLoanRequest()
                                .then(function () {
                                    angular.element(document.querySelectorAll("#client-number"))[0].focus();
                                });
                    }
                };
                $scope.ui.deleteRequest = function (indexNo) {
                    $scope.model.deleteDetail(indexNo);
                };
                $scope.ui.editRequest = function (indexNo) {
                    $scope.model.editDetail(indexNo);
                };
//
//                $scope.ui.load = function (e) {
//                    var code = e ? e.keyCode || e.which : 13;
//                    if (code === 13) {
//                        $scope.model.load()
//                                .then(function () {
//                                    $scope.ui.mode = "SELECTED";
//                                });
//                    }
//                };
//
                $scope.ui.save = function () {
                    console.log('data');
                    console.log($scope.model.data);
                    
                    if (!$scope.model.data.date) {
                        Notification.error("select date");
                    } else if (!$scope.model.data.loanRequestDetails.length) {
                        Notification.error("enter client loan details");
                    } else if ($scope.model.data.date && $scope.model.data.loanRequestDetails.length) {
                        ConfirmPane.primaryConfirm("Save Employee Loan")
                                .confirm(function () {
                                    $scope.ui.mode = "IDEAL";
                                    $scope.model.saveRequest();
                                    $scope.model.clear();
                                })
                                .discard(function () {
                                    console.log("REJECT");
                                });
                    }
                };

                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();

                    $scope.$watch("model.tempData.employee", function () {
                        var c = $scope.ui.getEmployee($scope.model.tempData.employee);

                        if (c) {
                            $scope.model.tempEmployeeNo = c.employeeNumber;
                        } else {
                            $scope.model.tempEmployeeNo = null;
                        }
                    });
                };
                $scope.ui.init();

            });
}());