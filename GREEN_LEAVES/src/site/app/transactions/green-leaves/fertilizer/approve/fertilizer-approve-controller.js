(function () {
    'use strict';

    var controller = function ($scope, FertilizerApproveModel, ConfirmPane) {
        $scope.model = new FertilizerApproveModel();

        $scope.ui = {};
        $scope.ui.selectedRouteOfficer = null;
        $scope.ui.selectedRequest = null;
        $scope.ui.selectedIndex = null;

        $scope.ui.getClientData = function (routeOfficer) {
            $scope.model.selectClientData(routeOfficer);
            $scope.ui.selectedRouteOfficer = routeOfficer;
        };

        $scope.ui.getItemData = function (indexNo, $index) {
            $scope.model.getItemData(indexNo);
            $scope.ui.selectedRequest = indexNo;
            $scope.ui.selectedIndex = $index;
        };

        $scope.ui.approve = function () {
            ConfirmPane.primaryConfirm("This Fertilizer Request Approve")
                    .confirm(function () {
                        $scope.model.approve($scope.ui.selectedRequest, $scope.ui.selectedIndex);
                        $scope.ui.selectedRequest = null;
                        $scope.ui.selectedIndex = null;
                    })
                    .discard(function () {
                        console.log("REJECT");
                    });
        };

        $scope.ui.reject = function () {
            ConfirmPane.dangerConfirm("This Fertilizer Request Reject")
                    .confirm(function () {
                        $scope.model.approve($scope.ui.selectedRequest, $scope.ui.selectedIndex);
                        $scope.ui.selectedRequest = null;
                        $scope.ui.selectedIndex = null;
                    })
                    .discard(function () {
                        console.log("REJECT");
                    });
        };
    };

    angular.module("appModule")
            .controller("FertilizerApproveController", controller);
}());