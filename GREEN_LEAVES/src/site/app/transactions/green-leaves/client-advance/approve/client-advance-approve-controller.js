(function () {
    'use strict';

    var controller = function ($scope, ClientAdvanceApproveModel, ConfirmPane) {
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