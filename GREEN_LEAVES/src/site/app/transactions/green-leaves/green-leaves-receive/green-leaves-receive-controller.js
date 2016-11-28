(function () {
    'use strict';

    var controller = function ($scope, $timeout, $filter, GreenLeavesReceiveModel) {
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
                $scope.model.load()
                        .then(function () {
                            $scope.ui.mode = "SELECTED";
                        });
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
            $scope.model.addDetail()
                    .then(function () {
                        $scope.ui.focus();
                    });
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