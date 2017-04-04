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
            $scope.model.selectData(route);//load from route
            $scope.ui.selectedDataIndex = route;
        };

        $scope.ui.selectDetail = function (model) {
            $scope.ui.selectedDetailIndex = model.indexNo;
            $scope.ui.selectionData.client = model.client;
            $scope.ui.selectionData.date = model.asAtDate;
        };

        $scope.ui.editAmount = function () {
            ConfirmPane.primaryConfirm("Do you sure want to change advance request amount?")
                    .confirm(function () {
                        InputPane.primaryInput("Please enter new advance request amount.", "decimal")
                                .confirm(function (data) {
                                    $scope.model.updateAdvanceRequestAmount($scope.ui.selectedDetailIndex, data);
                                });
                    });
        };

        $scope.ui.approve = function () {
            ConfirmPane.primaryConfirm("Do you sure want to approve current advance request?")
                    .confirm(function () {
                        $scope.model.approve($scope.ui.selectedDetailIndex);
                        $scope.ui.selectedDetailIndex = null;
                        $scope.ui.selectionData = {
                            client: null,
                            date: null
                        };

                    });
        };

        $scope.ui.reject = function () {
            ConfirmPane.dangerConfirm("Do you sure want to reject current advance request?")
                    .confirm(function () {
                        $scope.model.reject($scope.ui.selectedDetailIndex);
                        $scope.ui.selectedDetailIndex = null;
                        $scope.ui.selectionData = {
                            client: null,
                            date: null
                        };
                    });
        };
    };

    angular.module("appModule")
            .controller("ClientAdvanceApproveController", controller);
}());