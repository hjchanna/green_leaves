(function () {
    'use strict';

    var controller = function ($scope, $timeout, $filter, optionPane, GreenLeavesReceiveModel, GreenLeavesReceiveService, Notification) {

        //current ui mode IDEAL, SELECTED, NEW, EDIT
        $scope.model = {};
        $scope.model.tempData = {};
        $scope.model.routes = {};
        $scope.model.clients = {};

        $scope.ui = {};
        $scope.ui.mode = "NEW";

        $scope.ui.new = function () {
            $scope.ui.mode = "NEW";
            $timeout(function () {
                angular.element(document.querySelectorAll("#date"))[0].focus();
            }, 10);
        };

        $scope.ui.forcus = function () {
            $timeout(function () {
                angular.element(document.querySelectorAll("#client"))[0].focus();
            }, 10);
        };

        $scope.ui.edit = function () {
            $scope.ui.mode = "EDIT";
        };

        $scope.ui.resetTempRequest = function () {
            $scope.model.tempData = {
                "indexNo": null,
                "branch": null,
                "greenLeavesReceive": null,
                "normalLeavesQuantity": 0,
                "superLeavesQuantity": 0,
                "client": null,
                "clientModel": null
            };
        };

        $scope.ui.insertTableData = function () {
            if ($scope.model.tempData.client && parseInt($scope.model.tempData.normalLeavesQuantity + $scope.model.tempData.superLeavesQuantity) > 0) {
                if ($scope.model.data.checkGreenLeavesReseveDetailDuplicate($scope.model.tempData.client)) {
                    Notification.error("this customer green leaves isa allrady exists!");
                } else {
                    $scope.model.tempData.clientModel = $scope.ui.getClient($scope.model.tempData.client);
                    if ($scope.model.data.addReceiveDetail($scope.model.tempData)) {
                        //validation succeed and added
                        $scope.ui.forcus();
                        $scope.ui.resetTempRequest();
                        $scope.ui.totalSuperLevesQty;
                        $scope.ui.totalNormalLevesQty();
                    }
                }
            } else {
                Notification.error("please enter all inputs");
            }
        };

        $scope.ui.editTableData = function (index) {
            $scope.model.tempData = $scope.model.data.editRecieveDetail(index);
            $scope.ui.totalSuperLevesQty;
            $scope.ui.totalNormalLevesQty();
        };

        $scope.ui.deleteTableData = function (index) {
            $scope.model.data.deleteReceiveDetail(index);
            $scope.ui.totalSuperLevesQty;
            $scope.ui.totalNormalLevesQty();
        };

        $scope.ui.save = function () {
//            if ($scope.model.data.route) {
//                Notification.error("please select route");
//            } else if ($scope.model.data.date) {
//                Notification.error("please select date");
//            } else {
                var data = JSON.stringify($scope.model.data);
                console.log($scope.model.data);
                GreenLeavesReceiveService.saveGreenLeavesDetail(data)
                        .success(function (data, status, headers) {
                            $scope.ui.init();
                            optionPane.successMessage("Client advance request saved successfully.");
                            $scope.selectedRow = null;
                        })
                        .error(function (data, status, headers) {
                            optionPane.dangerMessage("Client advance request save failed.");
                        });
//            }
        };

        $scope.ui.getClientLabel = function (client) {
            var label;
            angular.forEach($scope.model.clients, function (value, key) {
                if (value.indexNo === client) {
                    label = value.indexNo + "-" + value.name;
                    return;
                }
            });
            return label;
        };

        $scope.ui.getClient = function (clientId) {
            var client;
            angular.forEach($scope.model.clients, function (value, key) {
                if (value.indexNo === clientId) {
                    client = value;
                    return;
                }
            });
            return client;
        };

        $scope.ui.totalSuperLevesQty = function () {
            return  $scope.model.data.getSuperLeavesQuantityTotal();
        };

        $scope.ui.totalNormalLevesQty = function () {
            return $scope.model.data.getNormalLeavesQuantityTotal();
        };

        //table selection function
        $scope.selectedRow = null;
        $scope.ui.setClickedRow = function (index, route) {
            $scope.selectedRow = index;
            $scope.model.data.route = route.indexNo;
        };

        $scope.ui.init = function () {
            //create new model
            $scope.model.data = new GreenLeavesReceiveModel();
            $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
            //load routes
            GreenLeavesReceiveService.loadRoutes()
                    .success(function (data, status, headers) {
                        $scope.model.routes = data;
                    })
                    .error(function (data, status, headers) {

                    });

            //load clients
            GreenLeavesReceiveService.loadClients()
                    .success(function (data, status, headers) {
                        $scope.model.clients = data;
                    })
                    .error(function (data, status, headers) {

                    });

            $scope.ui.mode = "IDEAL";
        };

        $scope.ui.init();
    };

    angular.module("appModule")
            .controller("GreenLeavesReceiveController", controller);
}());