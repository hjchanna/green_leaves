(function () {
    'use strict';

    var controller = function ($scope, FertilizerApproveModel, ConfirmPane) {
        $scope.model = new FertilizerApproveModel();

        $scope.ui = {};
        $scope.ui.selectedDate = null;
        $scope.ui.selectedRequest = null;
        $scope.ui.selectedRequestRow = null;
        $scope.ui.selectionData = {
            client: null,
            date: null
        };

        $scope.ui.getClientData = function (date) {
            $scope.ui.selectedDate = date;
            $scope.model.getSelectdRequestDetails(date);
            $scope.model.pendingRequestDetails = [];
        };

        $scope.ui.clear = function () {
            $scope.model.clear();
            $scope.ui.selectedDate = null;
            $scope.ui.selectedRequest = null;
            $scope.ui.selectedRequestRow = null;
            $scope.ui.selectionData = {
                client: null,
                date: null
            };
        };

        $scope.ui.selectRequest = function (detail, $index) {
            $scope.ui.selectedRequest = detail.indexNo;
            $scope.ui.selectedRequestRow = $index;
            $scope.ui.selectionData.client = detail.client;
            $scope.ui.selectionData.date = $scope.ui.selectedDate;
            $scope.model.getSelectdRequestItems(detail);
        };

        $scope.ui.approve = function () {
            ConfirmPane.primaryConfirm("This Fertilizer Request Approve")
                    .confirm(function () {
                        $scope.model.approve($scope.ui.selectedRequest, $scope.ui.selectedRequestRow);
                        $scope.ui.selectedRequest = null;
                        $scope.ui.selectedRequestRow = null;
                        $scope.ui.selectionData.client = null;
                        $scope.ui.selectionData.date = null;
                    })
                    .discard(function () {
                        console.log("REJECT");
                    });
        };

        $scope.ui.reject = function () {
            ConfirmPane.dangerConfirm("This Fertilizer Request Reject")
                    .confirm(function () {
                        $scope.model.reject($scope.ui.selectedRequest, $scope.ui.selectedRequestRow);
                        $scope.ui.selectedRequest = null;
                        $scope.ui.selectedRequestRow = null;
                        $scope.ui.selectionData.client = null;
                        $scope.ui.selectionData.date = null;
                    })
                    .discard(function () {
                        console.log("REJECT");
                    });
        };
    };

    angular.module("appModule")
            .controller("FertilizerApproveController", controller);
}());