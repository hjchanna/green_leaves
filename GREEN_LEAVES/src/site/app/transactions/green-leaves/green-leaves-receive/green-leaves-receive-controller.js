(function () {
    'use strict';
    var controller = function ($scope, $timeout, $filter, GreenLeavesReceiveModel, ConfirmPane, optionPane, InputPane, Notification) {
        $scope.model = new GreenLeavesReceiveModel();
        $scope.customerId;

        $scope.ui = {};

        $scope.ui.new = function () {
            $scope.ui.mode = "EDIT";
            $scope.model.clear();

            //set default branch and current date
            $scope.model.data.branch = $scope.model.defaultBranch().indexNo;

            //new date subtract one day
            var newDate = new Date();
            newDate.setDate(newDate.getDate() - 1);
            $scope.model.data.date = $filter('date')(newDate, 'yyyy-MM-dd');

            //focus branch
            $timeout(function () {
                angular.element(document.querySelectorAll("#branch"))[0].focus();
            }, 10);
        };

        $scope.ui.edit = function () {
            $scope.ui.mode = "EDIT";
        };

        $scope.ui.delete = function () {
            ConfirmPane.dangerConfirm("Delete Green Leave Receive")
                    .confirm(function () {
                        $scope.model.deleteGreenLavesReceive();
                    })
                    .discard(function () {
                        console.log("ReJECT");
                    });

        };

        //find by receive by branch and number
        $scope.ui.load = function (e) {
            var code = e ? e.keyCode || e.which : 13;
            if (code === 13) {
                $scope.model.load()
                        .then(function () {
                            $scope.ui.mode = "SELECTED";
                        });
            }
        };

        //find client by client number
        $scope.ui.searchClient = function (e) {
            var code = e ? e.keyCode || e.which : 13;
            if (code === 13) {
                var searchClient = $scope.model.searchClientByClientNo($scope.customerId);
                if (angular.isUndefined(searchClient)) {
                    Notification.error("client not found!");
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
            $scope.model.save()
                    .then(function () {
                        $scope.ui.mode = "IDEAL";
                        $scope.model.clear();
                    });
            optionPane.successMessage("save green leaves receive");
        };

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
                ConfirmPane.primaryConfirm("Client Not Found And Add New Client")
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
                        })
                        .discard(function () {
                            console.log("REJECT");
                        });
            } else {
                $scope.model.addDetail()
                        .then(function () {
                            $scope.ui.focus();
                        });
            }
            $scope.customerId = '';
        };

        $scope.ui.editDetail = function (index) {
            $scope.model.editDetail(index);
            $scope.ui.focus();
        };

        $scope.ui.deleteDetail = function (index) {
            $scope.model.deleteDetail(index);
            $scope.ui.focus();
        };

//        $scope.ui.selectRoute = function (indexNo) {
//            if ($scope.ui.mode !== "IDEAL") {
//                $scope.model.selectRoute(indexNo);
//            }
//        };

        $scope.ui.loadFactoryQuantity = function () {
            $scope.model.loadFactoryQuantity();
            $scope.model.getRouteOfficerAndRouteHelperAndVehicle();
            $scope.model.findByBranchAndRouteAndDate();
        };

        $scope.ui.init = function () {
            $scope.ui.mode = "IDEAL";
            $scope.ui.type = "NORMAL";

//            $scope.$watch("model.data.route", function (newValue, oldValue) {
//                $scope.ui.loadFactoryQuantity();
//            });

            $scope.$watch("model.data.date", function (newValue, oldValue) {
                $scope.ui.loadFactoryQuantity();
            });
        };
        $scope.ui.init();
    };

    angular.module("appModule")
            .controller("GreenLeavesReceiveController", controller);
}());