(function () {
    'use strict';

    var controller = function ($scope, ClientAdvanceApproveModel) {
        $scope.model = new ClientAdvanceApproveModel();

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
        };

        $scope.ui.approve = function () {
            $scope.model.approve();
        };

        $scope.ui.reject = function () {
            $scope.model.reject();
        };

        $scope.ui.clear = function () {
            $scope.model.clear();
        };
    };

    angular.module("appModule")
            .controller("ClientAdvanceApproveController", controller);
}());