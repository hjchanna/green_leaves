(function () {
    'use strict';

    var controller = function ($scope, $timeout, GreenLeavesReceiveModel, ConfirmPane, InputPane, Notification) {
        $scope.model = new GreenLeavesReceiveModel();

        $scope.ui = {};

        $scope.ui.new = function () {
            $scope.ui.mode = "EDIT";
            $scope.model.clear();
        };

        $scope.ui.edit = function () {
            $scope.ui.mode = "EDIT";
        };

        $scope.ui.delete = function () {

        };

        $scope.ui.load = function (e) {
            var code = e ? e.keyCode || e.which : 13;
            if (code === 13) {
            console.log("nkdsfnskdf");
                $scope.model.load()
                        .then(function () {
                            $scope.ui.mode = "SELECTED";
                        });
            }
        };

        $scope.ui.searchClient = function (e) {
            var code = e ? e.keyCode || e.which : 13;
            if (code === 13) {
                var client = $scope.model.client($scope.model.tempData.client);
                if (angular.isUndefined(client)) {
                    Notification.error("client not found,you are new client");
                } else {
                    $scope.model.tempData.client = client.indexNo;
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#normalLeaves"))[0].focus();
                    }, 10);
                }
            }
        };

        $scope.ui.save = function () {
            $scope.model.save()
                    .then(function () {
                        $scope.ui.mode = "IDEAL";
                        $scope.model.clear();
                    });
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
        };

        $scope.ui.editDetail = function (index) {
            $scope.model.editDetail(index);
            $scope.ui.focus();
        };

        $scope.ui.deleteDetail = function (index) {
            $scope.model.deleteDetail(index);
            $scope.ui.focus();
        };

        $scope.ui.selectRoute = function (indexNo) {
            if ($scope.ui.mode !== "IDEAL") {
                $scope.model.selectRoute(indexNo);
            }
        };

        $scope.ui.loadFactoryQuantity = function () {
            $scope.model.loadFactoryQuantity();
        };

        $scope.ui.init = function () {
            $scope.ui.mode = "IDEAL";
            $scope.ui.type = "NORMAL";

            $scope.$watch("model.data.route", function (newValue, oldValue) {
                $scope.ui.loadFactoryQuantity();
            });

            $scope.$watch("model.data.date", function (newValue, oldValue) {
                $scope.ui.loadFactoryQuantity();
            });
        };
        $scope.ui.init();
    };

    angular.module("appModule")
            .controller("GreenLeavesReceiveController", controller);
}());