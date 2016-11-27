(function () {
    'use strict';

    var controller = function ($scope, $timeout, $filter, optionPane, GreenLeavesReceiveModel, GreenLeavesReceiveService, Notification) {

        //current ui mode IDEAL, SELECTED, NEW, EDIT
        $scope.model = {};

        //date store model
        $scope.model.tempData = {};
        $scope.model.routes = {};
        $scope.model.clients = {};

        $scope.model.total = {
            "factorySuperLeavesTotal": 0,
            "factoryNormalLeavesTotal": 0,
            "defaranceSuperLeavesTotal": 0,
            "defaranceNormalLeavesTotal": 0,
            "insertSuperLeaveTotal": 0,
            "insertNormalLeaveTotal": 0
        };

        $scope.ui = {};

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
                "client": null
            };
        };

        //---------------- table functions -------------------

        //insert data datable 
        $scope.ui.insertTableData = function () {
            if ($scope.model.tempData.client) {
                if ($scope.model.data.checkGreenLeavesReseveDetailDuplicate($scope.model.tempData.client)) {
                    Notification.error("this customer green leaves is already exists!");
                } else {
                    if ($scope.model.data.addReceiveDetail($scope.model.tempData)) {
                        //validation succeed and added
                        $scope.ui.getTotalLeaves();
                        $scope.ui.forcus();
                        $scope.ui.resetTempRequest();
                    }
                }
            } else {
                Notification.error("please enter all inputs");
            }
        };

        //edit data table
        $scope.ui.editTableData = function (index) {
            $scope.model.tempData = $scope.model.data.editRecieveDetail(index);
            $scope.ui.getTotalLeaves();
        };

        //delete row data table
        $scope.ui.deleteTableData = function (index) {
            $scope.model.data.deleteReceiveDetail(index);
            $scope.ui.getTotalLeaves();
        };

        //---------------- ui fucntions -------------------
        //green leaves data save
        $scope.ui.save = function () {
            if ($scope.model.data.route === null) {
                Notification.error("please enter route");
            } else {
                if ($scope.model.data.date) {
                    if ($scope.model.data.validateGreenLeavesReseveDetail()) {
                        var data = JSON.stringify($scope.model.data);
                        GreenLeavesReceiveService.saveGreenLeavesDetail(data)
                                .success(function (data, status, headers) {
                                    $scope.ui.init();
                                    optionPane.successMessage("green leaves receive saved successfully.");
                                    $scope.selectedRow = -1;
                                })
                                .error(function (data, status, headers) {
                                    optionPane.dangerMessage("green leaves receive save failed.");
                                });
                    } else {
                        Notification.error("please enter green leaves receive");
                    }
                } else {
                    Notification.error("please enter date");
                }
            }
        };

        //---------------- validation functions -------------------
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
        $scope.ui.getClientName = function (clientId) {
            var client;
            angular.forEach($scope.model.clients, function (value, key) {
                if (value.indexNo === clientId) {
                    client = value.name;
                    return;
                }
            });
            return client;
        };

        $scope.ui.getTotalLeaves = function () {
            $scope.model.total.insertSuperLeaveTotal = $scope.model.data.getLeavesQuantityTotal("superLeaves");
            $scope.model.total.insertNormalLeaveTotal = $scope.model.data.getLeavesQuantityTotal("normalLeaves");

            var factorySuperLeavesTotal = $scope.model.total.factorySuperLeavesTotal;
            var factoryNormalLeavesTotal = $scope.model.total.factoryNormalLeavesTotal;

            var superLeavesTotal = $scope.model.total.insertSuperLeaveTotal;
            var normalLeavesTotal = $scope.model.total.insertNormalLeaveTotal;

            $scope.model.total.defaranceSuperLeavesTotal = factorySuperLeavesTotal - superLeavesTotal;
            $scope.model.total.defaranceNormalLeavesTotal = factoryNormalLeavesTotal - normalLeavesTotal;
        };

        //table selection function
        $scope.selectedRow = null;
        $scope.ui.setClickedRow = function (index, routeIndex) {
            $scope.selectedRow = index;
            $scope.model.data.route = routeIndex;

            //get selected row green leaves weight super leaves totala and normal leaves total
            var data = JSON.stringify($scope.model.data);
            GreenLeavesReceiveService.getSuperLeavesTotalAndNormalLeavesTotal(data)
                    .success(function (data, status, headers) {
                        if ($scope.model.data.date) {
                            $scope.model.total.factorySuperLeavesTotal = data[0];
                            $scope.model.total.factoryNormalLeavesTotal = data[1];
                        } else {
                            Notification.error("please select date");
                        }
                    })
                    .error(function (data, status, headers) {
                    });
        };

        $scope.ui.getGreenLeavesDetail = function (event, number) {
            if (event.keyCode === 13) {
                GreenLeavesReceiveService.loadGreenLeaveReceive(number)
                        .success(function (data, status, headers) {
                            $scope.ui.mode = "IDEAL";
                            $scope.model.data.date = data[0].date;
//                            $scope.ui.setClickedRow('', data[0].route);
                            $scope.ui.getTotalLeaves();
                            $scope.model.data.greenLeavesReceiveDetails = data[0].greenLeavesReceiveDetails;
                        })
                        .error(function (data, status, headers) {

                        });
            }


        };


        $scope.ui.init = function () {

            $scope.ui.mode = "IDEAL";

            //create new model
            $scope.model.data = new GreenLeavesReceiveModel();

            //set deafault date
            //$scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

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

        };

        $scope.ui.init();
    };

    angular.module("appModule")
            .controller("GreenLeavesReceiveController", controller);
}());