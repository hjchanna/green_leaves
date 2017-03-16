(function () {
    'use strict';

    var controller = function ($scope, EmployeeAdvanceApproveModel, ConfirmPane) {
        $scope.model = new EmployeeAdvanceApproveModel();
        $scope.ui = {};
        $scope.ui.selectedDataIndex = null;
        $scope.ui.selectedDetailIndex = null;

        $scope.ui.selectionData = {
            client: null,
            date: null
        };

        $scope.ui.selectData = function (date) {
            $scope.model.selectData();
            $scope.model.selectDetails(date);
            $scope.ui.selectedDataIndex = date;
        };

        $scope.ui.selectDetail = function (model) {
            $scope.ui.selectedDetailIndex = model.indexNo;
            $scope.ui.selectionData.client = model.client;
            $scope.ui.selectionData.date = model.asAtDate;
        };

        $scope.ui.approve = function () {
            ConfirmPane.primaryConfirm("This Advance Employee Request Approve")
                    .confirm(function () {
                        $scope.model.approve($scope.ui.selectedDetailIndex);
                        $scope.ui.selectedDetailIndex = null;  
                       
                    })
                    .discard(function () {
                        console.log("REJECT");
                    });
        };

        $scope.ui.reject = function () {
            ConfirmPane.dangerConfirm("This Advance Employee Request Reject")
                    .confirm(function () {
                        $scope.model.reject($scope.ui.selectedDetailIndex);
                        $scope.ui.selectedDetailIndex = null;
                       
                    })
                    .discard(function () {
                        console.log("REJECT");
                    });
        };
    };
    angular.module("appModule")
            .controller("EmployeeAdvanceApproveController", controller);
}());