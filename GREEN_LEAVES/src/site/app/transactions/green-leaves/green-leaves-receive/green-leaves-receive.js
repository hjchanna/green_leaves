(function () {
    //module
    angular.module("greenLeavesReceiveModule", ["ngAnimate", "ui.bootstrap", "ui-notification"]);

    angular.module("greenLeavesReceiveModule")
            .factory("greenLeavesReceiveFactory", function ($http, systemConfig) {
                var factory = {};

                factory.loadRoutes = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/routes";

                    $http.get(url).success(function (data) {
                        callback(data);
                    });
                };

                factory.loadClients = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/clients";

                    $http.get(url).success(function (data) {
                        callback(data);
                    });
                };

                return factory;
            });

    //controller
    angular.module("greenLeavesReceiveModule")
            .controller("greenLeavesReceiveController", function ($scope, $http, $timeout, systemConfig, greenLeavesReceiveFactory, Notification) {

                //ui models
                $scope.ui = {};
                //current ui mode IDEAL, SELECTED, NEW, EDIT

                $scope.model = {};

                $scope.http = {};

                $scope.model.reset = function () {
                    $scope.model.data = {
                        "indexNo": null,
                        "branch": null,
                        "route": null,
                        "number": null,
                        "date": null,
//                        "transaction": null,//nor required
                        "greenLeavesReceiveDetails": [
//                            {
//                                "indexNo": null,
//                                "greenLeavesReceive": null,
//                                "client": null,
//                                "normalLeavesQuantity": null,
//                                "superLeavesQuantity": null
//                                "clientModel":null//temparary purpose
//                            }
                        ]
                    };

                    $scope.model.tempData = {
                        "indexNo": null,
                        "greenLeavesReceive": null,
                        "client": null,
                        "normalLeavesQuantity": 0,
                        "superLeavesQuantity": 0
                    };
                };

                //ui functions--------------------------------------------------
                $scope.ui.load = function (indexNo) {

                };

                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                };

                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";
                };

                //finish edits
                $scope.ui.finish = function () {
                    $scope.ui.mode = "IDEAL";
                };

//                $scope.getRowData = function () {
//                    if (!$scope.greenLevesRecives) {
//                        $scope.greenLevesRecives = [];
//                    }
//                    return $scope.greenLevesRecives;
//                };

                $scope.ui.insert = function () {
                    if ($scope.validateInput()) {
                        $scope.model.tempData.clientModel = $scope.ui.getClient($scope.model.tempData.client);
                        $scope.model.data.greenLeavesReceiveDetails.push($scope.model.tempData);

                        console.log($scope.ui.getClient($scope.model.tempData.client));

                        $scope.model.tempData = {
                            "indexNo": null,
                            "greenLeavesReceive": null,
                            "client": null,
                            "normalLeavesQuantity": 0,
                            "superLeavesQuantity": 0
                        };

                        $timeout(function () {
                            document.querySelectorAll("#client")[0].focus();
                        }, 10);
                    }
                };

                $scope.validateInput = function () {
                    return true;
//                    $scope.model.tempData.client !== null
//                            && 
//                            ($scope.model.tempData.normalLeavesQuantity + $scope.model.tempData.superLeavesQuantity) > 0;
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

                /*$scope.insertTable = function (rowData) {
                 $scope.vars = true;
                 if ($scope.rowData.client.name && $scope.rowData.normalLeavesQuantity && $scope.rowData.superLeavesQuantity) {
                 if ($scope.greenLevesRecives.length === 0) {
                 $scope.greenLevesRecives.push(rowData);
                 $scope.rowData = null;
                 } else {
                 for (var i = 0; i < $scope.greenLevesRecives.length; i++) {
                 if (angular.equals($scope.greenLevesRecives[i].client, rowData.client)) {
                 $scope.vars = false;
                 Notification.error('This Customer Is Already Exists');
                 break;
                 }
                 }
                 if ($scope.vars) {
                 $scope.greenLevesRecives.push(rowData);
                 $scope.rowData = null;
                 }
                 }
                 } else {
                 Notification.error('Must Be Filled All Components To Add');
                 }
                 $scope.getNormalLeavesQuantityTotal();
                 $scope.getSuperLeavesQuantity();
                 };
                 
                 $scope.editSelectdRow = function (rowData, index) {
                 if (rowData) {
                 $scope.rowData = rowData;
                 $scope.greenLevesRecives.splice(index, 1);
                 } else {
                 Notification.error('Edit Not Success');
                 }
                 };
                 
                 $scope.deleteSelectedRow = function (index) {
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
                 };*/

                //table selection function
                $scope.selectedRow = null;
                $scope.setClickedRow = function (index, route) {
                    $scope.selectedRow = index;
                    console.log(route);
                };

                //ui init function
                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset model
                    $scope.model.reset();

                    //load routes
                    greenLeavesReceiveFactory.loadRoutes(function (data) {
                        $scope.model.routes = data;
                    });

                    //load clients
                    greenLeavesReceiveFactory.loadClients(function (data) {
                        $scope.model.clients = data;
                    });

                };
                $scope.ui.init();
            });
}());