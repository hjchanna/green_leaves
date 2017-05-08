(function () {
    'use strict';
    var controller = function ($scope, $timeout, $filter, GreenLeavesReceiveModel, ConfirmPane, optionPane, InputPane, Notification) {
        $scope.model = new GreenLeavesReceiveModel();
        $scope.customerId;

        $scope.ui = {};
        //Douple click duplicate bug fix
        $scope.ui.insertProcessing = false;

        $scope.ui.new = function () {
            $scope.ui.mode = "EDIT";
            $scope.model.clear();

            //set default branch and current date
            $scope.model.data.branch = $scope.model.defaultBranch();

            //new date subtract one day
            var newDate = new Date();
            newDate.setDate(newDate.getDate() - 1);
            $scope.model.data.date = $filter('date')(newDate, 'yyyy-MM-dd');

            //focus branch
            $timeout(function () {
                angular.element(document.querySelectorAll("#route"))[0].focus();
            }, 10);
        };

        $scope.ui.edit = function () {
            $scope.ui.mode = "EDIT";
        };

        $scope.ui.delete = function () {
            ConfirmPane.dangerConfirm("Do you sure want to delete green leaves receive?")
                    .confirm(function () {
                        $scope.model.deleteGreenLavesReceive();
                        $scope.ui.mode = "IDEAL";
                        $scope.ui.type = "NORMAL";
                    });
        };

        //find by receive by branch and number
        $scope.ui.load = function (e) {
            var code = e ? e.keyCode || e.which : 13;
            if (code === 13) {
                var number = $scope.model.data.number;
                $scope.model.load()
                        .then(function () {
                            $scope.ui.mode = "SELECTED";
                        }, function () {
                            if (number) {
                                Notification.error("Green leaves receive cannot be found at " + number + ".");
                            } else {
                                Notification.error("Please enter a valid number.");
                            }
                        });
            }
        };

        //find client by client number
        $scope.ui.searchClient = function (e) {
            var code = e ? e.keyCode || e.which : 13;
            if (code === 13) {
                var searchClient = $scope.model.searchClientByClientNo($scope.customerId);
                if (angular.isUndefined(searchClient)) {
                    Notification.error("Client cannot find by number. Please try by name instead.");
                    $scope.model.tempData.client = null;
                } else {
                    var client = $scope.model.client(searchClient.indexNo);
                    $scope.model.tempData.client = client.indexNo;
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#normalLeaves"))[0].focus();
                    }, 10);
                }
            }
        };

        //save green leaves receive and receive details
        $scope.ui.save = function () {
            if (!$scope.model.data.branch) {
                Notification.error("Please enter a valid branch.");
            } else if (!$scope.model.data.route) {
                Notification.error("Please select a valid route.");
            } else if (!$scope.model.data.date) {
                Notification.error("Please enter a valid date.");
            } else if (!$scope.model.data.routeOfficer) {
                Notification.error("Please select a valid route officer.");
            } else if (!$scope.model.data.routeHelper) {
                Notification.error("Please select a valid route helper.");
            } else if (!$scope.model.data.vehicle) {
                Notification.error("Please select a valid vehicle.");
            } else if (!$scope.model.data.greenLeavesReceiveDetails.length) {
                Notification.error("Please enter green leaves receive data.");
            } else if ($scope.model.data.branch
                    && $scope.model.data.route
                    && $scope.model.data.date
                    && $scope.model.data.routeOfficer
                    && $scope.model.data.routeHelper
                    && $scope.model.data.vehicle) {
                ConfirmPane.primaryConfirm("Do you sure want to save green leaves receive?")
                        .confirm(function () {
                            if (!$scope.ui.insertProcessing) {
                                $scope.ui.insertProcessing = true;
                                $scope.model.save()
                                        .then(function (data) {
                                            optionPane.successMessage("Green leaves receive saved successfully !");
                                            $scope.ui.mode = "IDEAL";
                                            $scope.model.clear();
                                            $scope.ui.insertProcessing = false;
                                        });
                            }
                        });
            }
        };

        $scope.ui.getRouteOfficerAndRouteHelperAndVehicle = function (model) {
            $scope.model.getRouteOfficerAndRouteHelperAndVehicle(model);
        }
        ;

        $scope.ui.discard = function () {
            $scope.ui.mode = "IDEAL";
            $scope.model.clear();
        };

        //forcus
        $scope.ui.focus = function () {
            $timeout(function () {
                angular.element(document.querySelectorAll("#client"))[0].focus();
            }, 10);
        };

        //new client add remark and client is null
        $scope.ui.addDetail = function () {
            var client = $scope.model.client($scope.model.tempData.client);
            if (angular.isUndefined(client)) {
                ConfirmPane.primaryConfirm("You have selected an invalid client. Do you want to select a temporary client instead?")
                        .confirm(function () {
                            InputPane.primaryInput("Input Client Name")
                                    .confirm(function (data) {
                                        if (angular.isUndefined(data)) {

                                        } else {
                                            $scope.model.tempData.remark = data;
                                            $scope.model.tempData.client = null;
                                            $scope.model.addDetail()
                                                    .then(function () {
                                                        $scope.ui.focus();
                                                    });
                                        }
                                    })
                                    .discard(function () {
                                        console.log("CANCEL");
                                    });
                        });
            } else {
                var client = $scope.model.greenLeavesClietDuplivate($scope.model.tempData.client);
                if (angular.isUndefined(client)) {
                    $scope.model.addDetail()
                            .then(function () {
                                $scope.ui.focus();
                            });
                } else {
                    ConfirmPane.primaryConfirm("Client Is Already Exists")
                            .confirm(function () {
                                $scope.model.addDetail()
                                        .then(function () {
                                            $scope.ui.focus();
                                        });
                            });
                }
            }
            $scope.customerId = '';
        };

        $scope.ui.editDetail = function (index) {
            $scope.model.editDetail(index);
            $scope.ui.focus();
        };

        $scope.ui.deleteDetail = function (index) {
            ConfirmPane.dangerConfirm("Delete Green Leave Receive")
                    .confirm(function () {
                        $scope.model.deleteDetail(index);
                        $scope.ui.focus();
                    })
                    .discard(function () {
                        console.log("REJECT");
                    });
        };

        $scope.ui.loadFactoryQuantity = function () {
            $scope.model.loadFactoryQuantity();
//            $scope.model.getRouteOfficerAndRouteHelperAndVehicle();
//            $scope.model.findByBranchAndRouteAndDate();
        };

        $scope.ui.init = function () {
            $scope.ui.mode = "IDEAL";
            $scope.ui.type = "NORMAL";

            //client serach get clientNumber
            $scope.$watch("model.tempData.client", function (newValue, oldValue) {
                if ($scope.model.tempData.client) {
                    var client = $scope.model.client($scope.model.tempData.client);
                    $scope.customerId = client.clientNumber;
                    if ($scope.model.data.route !== client.route) {
                        var clientRoute = $scope.model.routeLabel(client.route);
                        optionPane.warningMessage("This client is from an another route. (" + clientRoute + ")");
                    }
                }
            });

            $scope.$watch("[model.data.date, model.data.route]", function (newValue, oldValue) {
                var route = $scope.model.data.route;
                if ($scope.model.data.date && route === parseInt(route)) {
                    $scope.ui.loadFactoryQuantity();
                }
            });
        };
        $scope.ui.init();
    };

    angular.module("appModule")
            .controller("GreenLeavesReceiveController", controller);
}());