(function () {
    'use strict';

    var controller = function ($scope) {
        $scope.model = {};

        $scope.ui = {};
    };

    angular.module("appModule")
            .controller("ClientAdvanceApproveController", controller);
}());