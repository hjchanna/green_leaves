(function () {
    'use strict';

    var controller = function ($scope, ClientAdvanceApproveService) {
        $scope.model = {};

        $scope.ui = {};
        $scope.model.requests = [];
        $scope.model.routes = [];

        $scope.ui.getRoute = function (routeIndexNo) {
            for (var i = 0; i < $scope.model.routes.length; i++) {
                if (routeIndexNo === $scope.model.routes[i].indexNo) {
                    return $scope.model.routes[i].name;
                }
            }
        };
        $scope.ui.getRequestCount = function (routeIndexNo) {
            for (var i = 0; i < $scope.model.requests.length; i++) {
                if (routeIndexNo === $scope.model.requests[i].route) {
                    return $scope.model.requests[i].clientAdvanceRequestDetails.length;
                }
            }
        };
        
        $scope.ui.getRequestAmount = function (routeIndexNo) {
            var requestCount = 0;
            var requestTotalAmount = 0;
            for (var i = 0; i < $scope.model.requests.length; i++) {
                if (routeIndexNo === $scope.model.requests[i].route) {
                    requestCount = $scope.model.requests[i].clientAdvanceRequestDetails.length;
                    for (var x = 0; x < requestCount; x++) {
                        requestTotalAmount += $scope.model.requests[i].clientAdvanceRequestDetails[x].amount;
                    }
                }
            }
            return requestTotalAmount;
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