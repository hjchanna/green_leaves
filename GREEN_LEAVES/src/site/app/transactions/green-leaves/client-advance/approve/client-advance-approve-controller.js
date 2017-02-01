(function () {
    'use strict';

    var controller = function ($scope, ClientAdvanceApproveModel, ClientAdvanceRequestService) {
        $scope.model = new ClientAdvanceApproveModel();
        $scope.model.clientLedgerHistory = [];

        $scope.ui = {};
        $scope.ui.selectedDataIndex = null;
        $scope.ui.selectedDetailIndex = null;

        $scope.ui.selectData = function (indexNo) {
            $scope.model.selectData(indexNo);
            $scope.ui.selectedDataIndex = indexNo;
        };

        $scope.ui.selectDetail = function (indexNo) {
            $scope.model.selectDetail(indexNo);
            $scope.ui.selectedDetailIndex = indexNo;
            console.log($scope.model.detail);
        };

        $scope.ui.approve = function () {
            $scope.model.approve();
        };

        $scope.ui.reject = function () {
            $scope.model.reject();
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

        $scope.init = function () {
            $scope.$watch('model.detail', function () {
                if ($scope.model.detail) {
                    var client = $scope.model.detail.client;
                    var asAtDate = $scope.model.detail.asAtDate;
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
                } else {
                    $scope.model.clientLedgerHistory = [];
                }
            });
        };
        $scope.init();
//        $scope.ui.clear = function () {
//            $scope.model.clear();
//        };
    };

    angular.module("appModule")
            .controller("ClientAdvanceApproveController", controller);
}());