(function () {
    'use strict';

    var controller = function ($scope, ClientAdvanceApproveModel, ClientAdvanceRequestService, ConfirmPane) {
        $scope.model = new ClientAdvanceApproveModel();
        $scope.model.clientLedgerHistory = [];

        $scope.ui = {};
        $scope.ui.selectedDataIndex = null;
        $scope.ui.selectedDetailIndex = null;

        $scope.ui.selectData = function (route) {
            $scope.model.selectData(route);
            $scope.ui.selectedDataIndex = route;
        };

        $scope.ui.selectDetail = function (model) {
            $scope.ui.selectedDetailIndex = model.indexNo;
            var client = model.client;
            var asAtDate = model.asAtDate;
            if (client && asAtDate) {
                ClientAdvanceRequestService.loadClientLedgerHistory(client, asAtDate)
                        .success(function (data) {
                            $scope.model.clientLedgerHistory = data;
                        })
                        .error(function () {
                            $scope.model.clientLedgerHistory = [];
                        });
            } else {
                $scope.model.clientLedgerHistory = [];
            }
        };

        $scope.ui.approve = function () {
            ConfirmPane.primaryConfirm("This Advance Client Request Approve")
                    .confirm(function () {
                        $scope.model.approve($scope.ui.selectedDetailIndex);
                        $scope.ui.selectedDetailIndex = null;
                        $scope.model.clientLedgerHistory = [];
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
                        $scope.model.clientLedgerHistory = [];
                    })
                    .discard(function () {
                        console.log("REJECT");
                    });
        };

        $scope.ui.getClientLedgerTotal = function () {
            var sum = [0, 0, 0, 0];
            angular.forEach($scope.model.clientLedgerHistory, function (value) {
                sum[0] = sum[0] + value[2];
                sum[1] = sum[1] + value[3];
            });
            sum[2] = sum[0] - sum[1];
            sum[3] = sum[1] - sum[0];

            sum[2] = sum[2] > 0 ? sum[2] : 0.0;
            sum[3] = sum[3] > 0 ? sum[3] : 0.0;

            return sum;
        };
    };

    angular.module("appModule")
            .controller("ClientAdvanceApproveController", controller);
}());