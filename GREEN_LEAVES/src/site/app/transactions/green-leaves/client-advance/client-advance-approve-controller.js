(function () {
    'use strict';

    var controller = function ($scope, ClientAdvanceApproveService) {
        $scope.model = {};

        $scope.ui = {};
        $scope.model.requests = [];
        $scope.model.routes = [];

        $scope.ui.getRoute = function () {
            for (var i = 0; i < $scope.model.requests.length; i++) {
                for (var i = 0; i < $scope.model.routes.length; i++) {
                    if ($scope.model.requests[i].route === $scope.model.routes[i].indexNo) {
                        return $scope.model.routes[i];
                        console.log($scope.model.routes[i]);
                    }
                }
            }
        };

        //init
        $scope.init = function () {
            //  $scope.model.data = new ClientAdvanceApproveModel();
            $scope.ui.mode = "IDEAL";

            ClientAdvanceApproveService.loadRequests()
                    .success(function (data, status, headers) {
                        $scope.model.requests = data;
                    })
                    .error(function (data, status, headers) {

                    });
            ClientAdvanceApproveService.loadRoutes()
                    .success(function (data, status, headers) {
                        $scope.model.routes = data;
                    })
                    .error(function (data, status, headers) {

                    });

            $scope.ui.getRoute();

        };

        $scope.init();
    };

    angular.module("appModule")
            .controller("ClientAdvanceApproveController", controller);
}());