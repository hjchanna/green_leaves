(function () {
    'use strict';

    var controller = function ($scope, $timeout, ClientAdvanceRequestModel, ClientAdvanceRequestService) {
        $scope.model = {};
        $scope.model.data = new ClientAdvanceRequestModel();
        $scope.model.tempData = {};
        $scope.model.routes = [];
        $scope.model.clients = [];

        $scope.ui = {};
        $scope.ui.mode = "NEW";

        $scope.ui.new = function () {
            $scope.ui.mode = "NEW";
            $timeout(function () {
                angular.element(document.querySelectorAll("#route"))[0].focus();
            }, 10);
        };

        $scope.ui.edit = function () {
                $scope.ui.mode = "EDIT";
            if ($scope.model.data.indexNo) {
                $timeout(function () {
                    angular.element(document.querySelectorAll("#route"))[0].focus();
                }, 10);
            }
        };

        $scope.ui.delete = function () {
            $scope.ui.mode = "IDEAL";
        };

        $scope.ui.load = function () {
            $scope.ui.mode = "SELECTED";
        };
        
        $scope.ui.clear = function(){
            $scope.ui.mode = "IDEAL";
        };

        $scope.ui.save = function () {
            $scope.ui.mode = "IDEAL";
        };
        
        $scope.ui.discard = function(){
            $scope.ui.mode = "IDEAL";
        };

        $scope.ui.resetTempRequest = function () {
            $scope.model.tempData = {
                "indexNo": null,
                "client": null,
                "route": null,
                "month": null,
                "amount": null,
                "status": null
            };
        };

        $scope.ui.addRequest = function () {
            //set model values
            $scope.model.tempData.clientModel = $scope.ui.getClient($scope.model.tempData.client);
            $scope.model.tempData.routeModel = $scope.ui.getRoute($scope.model.tempData.clientModel.route);

            if ($scope.model.data.addRequestDetail($scope.model.tempData)) {
                //validation succeed and added
                $scope.ui.resetTempRequest();

                $timeout(function () {
                    angular.element(document.querySelectorAll("#client"))[0].focus();
                }, 10);
            }
        };

        $scope.ui.editRequest = function (index) {
            $scope.model.tempData = $scope.model.data.editRequestDetail(index);
        };

        $scope.ui.deleteRequest = function (index) {
            $scope.model.data.deleteRequestDetail(index);
        };

        $scope.ui.getClientLabel = function (indexNo) {
            var label = "";
            angular.forEach($scope.model.clients, function (value, key) {
                if (value.indexNo === indexNo) {
                    label = value.indexNo + "-" + value.name;
                    return;
                }
            });
            return label;
        };

        $scope.ui.getClient = function (indexNo) {
            var client = null;
            angular.forEach($scope.model.clients, function (value, key) {
                if (value.indexNo === indexNo) {
                    client = value;
                    return;
                }
            });
            return client;
        };

        $scope.ui.getRouteLabel = function (indexNo) {
            var label = "";
            angular.forEach($scope.model.routes, function (value, key) {
                if (value.indexNo === indexNo) {
                    label = value.indexNo + "-" + value.name;
                    return;
                }
            });
            return label;
        };

        $scope.ui.getRoute = function (indexNo) {
            var route = null;
            angular.forEach($scope.model.routes, function (value, key) {
                if (value.indexNo === indexNo) {
                    route = value;
                    return;
                }
            });
            return route;
        };

        $scope.ui.init = function () {
            //load routes
            ClientAdvanceRequestService.loadRoutes()
                    .success(function (data, status, headers) {
                        $scope.model.routes = data;
                    })
                    .error(function (data, status, headers) {

                    });

            //load clients
            ClientAdvanceRequestService.loadClients()
                    .success(function (data, status, headers) {
                        $scope.model.clients = data;
                    })
                    .error(function (data, status, headers) {

                    });

            $scope.ui.mode = "IDEAL";
            $scope.ui.resetTempRequest();
        };

        $scope.ui.init();
    };

    angular.module("appModule")
            .controller("ClientAdvanceRequestController", controller);

}());