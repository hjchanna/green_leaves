(function () {
    'use strict';

    var controller = function ($scope, $timeout, $filter, optionPane, ClientAdvanceRequestModel, ClientAdvanceRequestService) {
        $scope.model = {};
        $scope.model.tempData = {};
        $scope.model.routes = [];
        $scope.model.clients = [];
        $scope.model.clientHistory = [];

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

            var number = $scope.model.data.number;
            ClientAdvanceRequestService.loadAdvanceRequestByNumber(number)
                    .success(function (data, status, headers) {
                        $scope.model.data = new ClientAdvanceRequestModel(data);
                        //set optional models

                        angular.forEach($scope.model.data.clientAdvanceRequestDetails, function (value) {
                            value.clientModel = $scope.ui.getClient(value.client);
                            value.routeModel = $scope.ui.getRoute(value.clientModel.route);
                        });

                        $scope.ui.mode = "SELECTED";
                    })
                    .error(function (data, status, headers) {
                        optionPane.dangerMessage("Client advance request loading failed.");
                    });
        };

        $scope.ui.clear = function () {
            $scope.ui.init();
        };

        $scope.ui.save = function () {
            var data = JSON.stringify($scope.model.data);

            ClientAdvanceRequestService.saveAdvanceRequest(data)
                    .success(function (data, status, headers) {
                        $scope.ui.init();

                        optionPane.successMessage("Client advance request saved successfully.");

                    })
                    .error(function (data, status, headers) {
                        optionPane.dangerMessage("Client advance request save failed.");
                    });
        };

        $scope.ui.discard = function () {
            $scope.ui.init();
        };

        $scope.ui.resetTempRequest = function () {
            $scope.model.tempData = {
                "indexNo": null,
                "client": null,
                "route": null,
                "asAtDate": null,
                "amount": null,
                "status": null
            };
        };

        $scope.ui.addRequest = function () {
            //set model values
            $scope.model.tempData.clientModel = $scope.ui.getClient($scope.model.tempData.client);
            $scope.model.tempData.routeModel = $scope.ui.getRoute($scope.model.tempData.clientModel.route);
            $scope.model.tempData.status = "PENDING";

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

        $scope.ui.getClientHistory = function () {
            var date = $filter('date')($scope.model.tempData.asAtDate, 'yyyy-MM-dd');
            var client = parseInt($scope.model.tempData.client);
            ClientAdvanceRequestService.clientHistory(date, client)
                    .success(function (data, status, headers) {
                        $scope.model.clientHistory = data;
                    })
                    .error(function (data, status, headers) {

                    });
        };

        $scope.ui.getTotalCradit = function () {
            console.log($scope.model.clientHistory);
//            angular.forEach($scope.model.clientHistory, function (value, key) {
//                console.log(value);
//            });
        };

        $scope.ui.init = function () {
            //create new model
            $scope.model.data = new ClientAdvanceRequestModel();

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

            $scope.$watch("[model.tempData.asAtDate,model.tempData.client]", function (newVal, oldVal) {
                if ($scope.model.tempData.asAtDate) {
                    $scope.ui.getClientHistory();
                    $scope.ui.getTotalCradit();
                }
            }, true);

            $scope.ui.resetTempRequest();
        };

        $scope.ui.init();
    };

    angular.module("appModule")
            .controller("ClientAdvanceRequestController", controller);

}());