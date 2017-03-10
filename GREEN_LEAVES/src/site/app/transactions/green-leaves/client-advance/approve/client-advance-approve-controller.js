(function () {
    'use strict';

    var controller = function ($scope, ClientAdvanceApproveModel, ConfirmPane, InputPane, Notification) {
        $scope.model = new ClientAdvanceApproveModel();
        $scope.ui = {};
        $scope.ui.selectedDataIndex = null;
        $scope.ui.selectedDetailIndex = null;
        $scope.ui.selectionData = {
            client: null,
            date: null
        };

        $scope.ui.selectData = function (route) {
            $scope.model.selectData(route);
            $scope.ui.selectedDataIndex = route;
        };

        $scope.ui.selectDetail = function (model) {
            $scope.ui.selectedDetailIndex = model.indexNo;
            $scope.ui.selectionData.client = model.client;
            $scope.ui.selectionData.date = model.asAtDate;
        };

        $scope.ui.editAmount = function () {
            ConfirmPane.primaryConfirm("Change Client Advance Request Amount")
                    .confirm(function () {
                        InputPane.primaryInput("Client Advance Request")
                                .confirm(function (data) {
                                    if (data.match(/^\d+$/) || data.match(/^\d+\.\d+$/)) {
                                        var id = -1;
                                        for (var i = 0; i < $scope.model.requestsData.length; i++) {
                                            if ($scope.model.requestsData[i].indexNo === $scope.ui.selectedDetailIndex) {
                                                id = i;
                                            }
                                        }
                                        var beforeAmount = parseFloat($scope.model.requestsData[id].amount);
                                        if (beforeAmount < parseFloat(data)) {
                                            Notification.error("please valid input!");
                                        } else {
                                            $scope.model.updateAdvanceRequestAmount($scope.ui.selectedDetailIndex, data);
                                        }
                                    } else {
                                        Notification.error("please valid input!");
                                    }
                                });
                    })
                    .discard(function () {
                        console.log("REJECT");
                    });
        };

        $scope.ui.approve = function () {
            ConfirmPane.primaryConfirm("This Advance Client Request Approve")
                    .confirm(function () {
                        $scope.model.approve($scope.ui.selectedDetailIndex);
                        $scope.ui.selectedDetailIndex = null;
                        $scope.ui.selectionData = {
                            client: null,
                            date: null
                        };

                    })
                    .discard(function () {
                        console.log("REJECT");
                    });
        };

        $scope.ui.reject = function () {
            ConfirmPane.dangerConfirm("This Advance Client Request Reject")
                    .confirm(function () {
                        $scope.model.reject($scope.ui.selectedDetailIndex);
                        $scope.ui.selectedDetailIndex = null;
                        $scope.ui.selectionData = {
                            client: null,
                            date: null
                        };
                    })
                    .discard(function () {
                        console.log("REJECT");
                    });
        };
    };

    angular.module("appModule")
            .controller("ClientAdvanceApproveController", controller);
}());