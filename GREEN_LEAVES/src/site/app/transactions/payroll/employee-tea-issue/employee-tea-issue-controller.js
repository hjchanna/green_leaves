(function () {
//module
    angular.module("employeeTeaIssueModule", []);
    //controller
    angular.module("employeeTeaIssueModule")
            .controller("employeeTeaIssueController", function ($scope, EmployeeTeaIssueModel, $filter, $timeout, Notification, ConfirmPane, optionPane) {
                $scope.model = new EmployeeTeaIssueModel();
                $scope.ui = {};
                
                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
//                    $scope.model.clear();
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                    //focus date
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#empId"))[0].focus();
                    }, 10);
                };

                //find by fertilizer by date and number
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
//                $scope.ui.delete = function () {
//                    ConfirmPane.dangerConfirm("Delete Direct Issue")
//                            .confirm(function () {
//                                $scope.model.deleteTeaIssue();
//                                $scope.ui.discard();
//                            })
//                            .discard(function () {
//                                console.log("REJECT");
//                            });
//                };
//
//                //find employee by employee number
                $scope.ui.searchEmployee = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        var searchEmployee = $scope.model.searchEmployeeByEmployeeNo($scope.model.data.empId);
                        if (angular.isUndefined(searchEmployee)) {
                            Notification.error("employee not found!");
                            $scope.model.data.employee = null;
                            this.focusEmployee();
                        } else {
                            var employee = $scope.model.employee(searchEmployee.indexNo);
                            $scope.model.data.employee = employee.indexNo;
                            this.focusDate();
                        }
                    }
                };
                $scope.ui.onSelect=function ($item, $model, $label){
                    $scope.model.data.empId=$item.employeeNumber;
                    this.focusDate();
                };

                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };

                $scope.ui.focus = function () {
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#empId"))[0].focus();
                    }, 10);
                };
                $scope.ui.focusEmployee = function () {
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#employee"))[0].focus();
                    }, 10);
                };
                $scope.ui.focusDate = function () {
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#date"))[0].focus();
                    }, 10);
                };
                $scope.ui.focusQty = function () {
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#qty"))[0].focus();
                    }, 10);
                };
//
//                $scope.ui.edit = function () {
//                    $scope.ui.mode = "EDIT";
//                };
//
                $scope.ui.getPrice = function (indexNo) {
                    $scope.model.data.price = $scope.model.teaGrade(indexNo).price;
                    this.focusQty();
                    
                };
//
//                //add detail to table
                $scope.ui.addDetail = function () {
                    console.log('add detail start');
                    if (!$scope.model.data.employee) {
                        Notification.error("please select employee");
                    } else if (!$scope.model.data.date) {
                        Notification.error("please select date");
                    } else if (!$scope.model.data.teaGrade) {
                        Notification.error("please select tea grade");
                    } else if (!$scope.model.data.qty) {
                        Notification.error("please select qty");
                    } else if ($scope.model.data.employee
                            && $scope.model.data.date
                            && $scope.model.data.teaGrade) {
                        var requestStatus = $scope.model.requestDuplicateCheck($scope.model.data.employee, $scope.model.data.teaGrade);
                        console.log('save commend');
                        if (angular.isUndefined(requestStatus)) {
                            $scope.model.addDetail()
                                    .then(function () {
                                        $scope.ui.focus();
                                        $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                                    });
                        } else {
                            Notification.error("this employee and tea grade is allrady exists!");
                        }
                    }
                };
//
                $scope.ui.editDetail = function (index) {
                    $scope.model.editDetail(index);
                    $scope.ui.focus();
                };
//
                $scope.ui.deleteDetail = function (index) {
                    $scope.model.deleteDetail(index);
                    $scope.ui.focus();
                };
//
                $scope.ui.save = function () {
                    if (!$scope.model.teaIssueList.length) {
                        Notification.error("please add tea issue requests");
                    } else if ($scope.model.teaIssueList.length) {
                        ConfirmPane.primaryConfirm("Save Employee Tea Issue")
                                .confirm(function () {
                                    $scope.model.save()
                                            .then(function () {
                                                optionPane.successMessage("Employee Tea Issue Save Success!");
                                                $scope.ui.discard();
                                            });
                                });
                    }
                };

                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";
                    
                    $scope.$watch("[model.data.price,model.data.qty]", function (newVal, oldVal) {
                        $scope.model.data.amount = parseFloat($scope.model.data.price * $scope.model.data.qty);
                    }, true);
                };

                $scope.ui.init();
            });
}());