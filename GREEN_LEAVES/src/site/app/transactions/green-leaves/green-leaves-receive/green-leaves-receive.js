(function () {
    //module
    angular.module("greenLeavesReceiveModule", ["ngAnimate", "ui.bootstrap", "ui-notification"]);

    //controller
    angular.module("greenLeavesReceiveModule")
            .controller("greenLeavesReceiveController", function ($scope, $http, systemConfig, Notification) {

                //get all routes
                var url = systemConfig.apiUrl + "/api/green-leaves/green-leaves-receive/routes";
                $scope.routes = [];
                $http.get(url).success(function (data) {
                    $scope.routes = data.values;
                    $scope.getRouteOfficerAndRoteHelper($scope.routes[0]);
                });

                var routeOfficerUrl = systemConfig.apiUrl + "/api/green-leaves/green-leaves-receive/route-officers";
                $http.get(routeOfficerUrl).success(function (data) {
                    $scope.routeOfficerList = [];
                    $scope.routeOfficerList = data.values;
                });

                var routeHelperUrl = systemConfig.apiUrl + "/api/green-leaves/green-leaves-receive/route-helpers";
                $http.get(routeHelperUrl).success(function (data) {
                    $scope.routeHelperList = [];
                    $scope.routeHelperList = data.values;
                });

                var clientUrl = systemConfig.apiUrl + "/api/green-leaves/green-leaves-receive/clients";
                $http.get(clientUrl).success(function (data) {
                    $scope.clientList = [];
                    $scope.clientList = data.values;
                });

                //select route and get route-officer and route-helper
                $scope.getRouteOfficerAndRoteHelper = function (route) {
                    $scope.routeOfficer = route.routeOfficer;
                    $scope.routeHelper = route.routeHelper;
                };

                //get route officers
                $scope.getRouteOfficers = function (hint) {
                    return $scope.routeOfficerList;
                };

                //get route helpers
                $scope.getRouteHelpers = function (hint) {
                    return $scope.routeHelperList;
                };

                //get route client
                $scope.getClients = function (hint) {
                    return $scope.clientList;
                };

                $scope.getRowData = function () {
                    if (!$scope.greenLevesRecives) {
                        $scope.greenLevesRecives = [];
                    }
                    return $scope.greenLevesRecives;
                };

                $scope.doAdd = function (rowData) {
                    if ($scope.rowData.client && $scope.rowData.normalLeavesQuantity && $scope.rowData.superLeavesQuantity) {
                        $scope.greenLevesRecives.push(rowData);
                        $scope.rowData = null;
                    } else {
                        Notification.error('Must be filled all components to add');
                    }
                    $scope.getNormalLeavesQuantityTotal();
                    $scope.getSuperLeavesQuantity();
                };

                $scope.doEdit = function (rowData) {
                    if (rowData) {
                        $scope.rowData = rowData;
                        Notification.success('Edit Success');
                    } else {
                        Notification.error('Edit Not Success');
                    }
                };

                $scope.doDelete = function (index) {
                    $scope.greenLevesRecives.splice(index, 1);
                    $scope.rowData = null;
                    $scope.getNormalLeavesQuantityTotal();
                    $scope.getSuperLeavesQuantity();
                    Notification.success('Delete Success');
                };

                //get Normal Leaves Qty
                $scope.getNormalLeavesQuantityTotal = function () {
                    var total = 0;
                    for (var i = 0; i < $scope.greenLevesRecives.length; i++) {
                        total += parseInt($scope.greenLevesRecives[i].normalLeavesQuantity);
                    }
                    return total;
                };

                //get Total Super Leaves Qty
                $scope.getSuperLeavesQuantity = function () {
                    var total = 0;
                    for (var i = 0; i < $scope.greenLevesRecives.length; i++) {
                        total += parseInt($scope.greenLevesRecives[i].superLeavesQuantity);
                    }
                    return total;
                };

                //get route helpers and vehicles
                $scope.getRoutehelperAndVehicle = function (model) {
                    for (var i = 0; i < $scope.routes.length; i++) {
                        if ($scope.equals = angular.equals($scope.routes[i].routeOfficer, model)) {
                            $scope.routeHelpers = $scope.routes[i].routeHelper;
                            return routeHelpers;
                        }
                    }
//                    console.log(JSON.stringify(model.indexNo));
                };

                $scope.selectedRow = null;
                $scope.setClickedRow = function (index) {
                    $scope.selectedRow = index;
                };
            });
}());