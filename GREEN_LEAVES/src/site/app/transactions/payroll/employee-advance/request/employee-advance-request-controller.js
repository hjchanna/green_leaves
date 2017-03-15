(function () {
    'use strict';

    var controller = function ($scope, EmployeeAdvanceRequestModel, $timeout, $filter, ConfirmPane, Notification) {

        $scope.model = new EmployeeAdvanceRequestModel;
        $scope.ui = {};

        $scope.ui.new = function () {
            $scope.ui.mode = "EDIT";
            $scope.model.clear();
            $scope.tempEmployee = '';

            //set current date
            $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

            $timeout(function () {
                document.querySelectorAll("#request-date")[0].focus();
            }, 10);
        };
        $scope.ui.focusAmount = function () {
            $scope.asAtDate = $filter('date')(new Date(), 'yyyy-MM-dd');
            $timeout(function () {
                angular.element(document.querySelectorAll("#amount"))[0].focus();
            }, 10);
        };

        $scope.ui.focus = function () {
            $timeout(function () {
                angular.element(document.querySelectorAll("#employeeId"))[0].focus();
            }, 10);
        };
        $scope.ui.discard = function () {
            $scope.ui.mode = "IDEAL";
            $scope.model.clear();
            $scope.asAtDate = "";
            $scope.ui.new();
        };

        $scope.ui.validateEmployee = function (event) {
            var key = event ? event.keyCode || event.which : 13;
            if (key === 13) {
                $scope.asAtDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                $scope.model.tempData.asAtDate = $scope.asAtDate;
                $scope.model.validateEmployee($scope.tempEmployee);
                if ($scope.model.tempData.employee) {
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#amount"))[0].focus();
                    }, 10);
                } else {
                    Notification.error("Employee not found!");
                    $scope.ui.focus();
                }
            }
        };
        $scope.ui.addRequest = function () {
            var employee = $scope.model.tempData.employee;
            var date = $scope.asAtDate;
            var requestStatus = $scope.model.requestDuplicateCheck(employee, date);
            if (angular.isUndefined(requestStatus)) {
                $scope.model.addDetail()
                        .then(function () {
                            $scope.ui.focus();
                            $scope.asAtDate = "";
                            $scope.tempEmployee = "";
                        });
            } else {
                Notification.error("Employee and request month already exists");
            }
        };
        $scope.ui.deleteRequest = function (index) {
            $scope.model.deleteDetail(index);
            $scope.ui.focus();
            $scope.tempEmployee = '';

        };
        $scope.ui.editRequest = function (index) {
            $scope.model.editDetail(index);
            $scope.asAtDate = $scope.model.tempData.asAtDate;
            $scope.tempEmployee = $scope.model.tempData.employee;
            console.log($scope.tempEmployee);
            console.log($scope.model.tempData.employee);
            $scope.ui.focus();
        };

        $scope.ui.save = function () {
            if (!$scope.model.data.date) {
                Notification.error("please enter date!");
            } else if ($scope.model.data.employeeAdvanceRequestDetail.length === 0) {
                Notification.error("please enter advance employee request!");
            } else {
                ConfirmPane.primaryConfirm("Save Green Leaves Advance Request!")
                        .confirm(function () {
                            $scope.model.saveEmployeeApproveRequest()
                                    .then(function () {
                                        $scope.ui.mode = "IDEAL";
                                        $scope.model.clear();
                                        $scope.asAtDate="";
                                        $scope.tempEmployee="";
                                    });
                            console.log($scope.model.data);
                        })
                        .discard(function () {
                            console.log('fail');
                        });

            }
        };

        $scope.ui.init = function () {
            $scope.ui.mode = "IDEAL";
            $scope.ui.type = "NORMAL";
//            $scope.model.clear();

//            $scope.$watch("[model.data.date,model.data.route]", function (newVal, oldVal) {
//                if ($scope.model.data.route) {
//                    $scope.model.findByRouteAndDate();
//                }
//            }, true);
//
//            $scope.series = ['Normal', 'Super'];
//            $scope.colors = ['#45b7cd', '#ff6384'];
//
//            //client ledger auto refresh
//            $scope.$watch('[model.tempData.client, asAtDate]', function () {
//                var asAtDate = $scope.asAtDate;
//                if (asAtDate === "This") {
//                    var date = new Date();
//                    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
//                    $scope.model.tempData.asAtDate = lastDay;
//                } else if (asAtDate === "Previous") {
//                    var date = new Date();
//                    var prev = new Date(date.getFullYear(), date.getMonth() - 1, date.getMonth());
//                    var lastDay = new Date(prev.getFullYear(), prev.getMonth() + 1, 0);
//                    $scope.model.tempData.asAtDate = lastDay;
//                }
//            });
//
//            $scope.$watch('model.tempData.client', function () {
//                var c = $scope.model.client($scope.model.tempData.client);
//                if (c) {
//                    $scope.tempClient = c.clientNumber;
//                } else {
//                    $scope.tempClient = null;
//                }
//            });
        };
        $scope.ui.init();

    };

    angular.module("appModule")
            .controller("EmployeeAdvanceRequestController", controller);
}());