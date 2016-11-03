(function () {
    //module
    angular.module("greenLeavesReceiveModule", ["ngAnimate", "ui.bootstrap", "ui-notification"]);

    angular.module("greenLeavesReceiveModule")
            .factory("greenLeavesReceiveFactory", function ($http, systemConfig) {
                var factory = {};
                //load routes
                factory.loadRoutes = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/routes";

                    $http.get(url).success(function (data) {
                        callback(data);
                    });
                };

                //load clients
                factory.loadClients = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/clients";

                    $http.get(url).success(function (data) {
                        callback(data);
                    });
                };

                //insert 
                factory.insertGreenLeavesDetail = function (detail, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/green-leaves-receive/save-green-leaves-receive";
                    $http.post(url, detail)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

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

                //http models
                $scope.http = {};

                //------------------ model functions ---------------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.data = {
                        "indexNo": null,
                        "branch": null,
                        "route": null,
                        "number": null,
                        "date": null,
                        "transaction": null,
                        "greenLeavesReceiveDetails": [
//                            {
//                                "indexNo": null,
//                                "branch": null,
//                                "greenLeavesReceive": null,
//                                "normalLeavesQuantity": 0,
//                                "superLeavesQuantity": 0,
//                                "client": null
//                            }
                        ]
                    };

                    $scope.model.tempData = {
                        "indexNo": null,
                        "branch": null,
                        "greenLeavesReceive": null,
                        "normalLeavesQuantity": 0,
                        "superLeavesQuantity": 0,
                        "client": null
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

                $scope.validateInput = function () {
                    if ($scope.model.tempData.client !== null && ($scope.model.tempData.normalLeavesQuantity + $scope.model.tempData.superLeavesQuantity) > 0) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //insert
                $scope.ui.insertDetail = function () {
                    if ($scope.validateInput()) {
                        $scope.model.tempData.clientModel = $scope.ui.getClient($scope.model.tempData.client);

                        $scope.model.data.greenLeavesReceiveDetails.push($scope.model.tempData);
                        console.log($scope.model.data.greenLeavesReceiveDetails);
//                      console.log($scope.ui.getClient($scope.model.tempData.client));
                        $scope.model.tempData = {
                            "indexNo": null,
                            "branch": null,
                            "greenLeavesReceive": null,
                            "normalLeavesQuantity": 0,
                            "superLeavesQuantity": 0,
                            "client": null
                        };
                    }
                };

                //edit detail
                $scope.ui.editDetail = function (greenLeavesReceiveDetails, indexNo) {
                    $scope.model.tempData = greenLeavesReceiveDetails;
                    $scope.model.data.greenLeavesReceiveDetails.splice(indexNo, 1);
                };

                //delete detail
                $scope.ui.deleteDetail = function (indexNo) {
                    $scope.model.data.greenLeavesReceiveDetails.splice(indexNo, 1);
                };

                //get super leaves total qty
                $scope.getSuperLeavesQuantityTotal = function () {
                    var total = 0;
                    for (var i = 0; i < $scope.model.data.greenLeavesReceiveDetails.length; i++) {
                        total += parseInt($scope.model.data.greenLeavesReceiveDetails[i].superLeavesQuantity);
                    }
                    return total;
                };

                //get normal leaves total qty
                $scope.getNormalLeavesQuantityTotal = function () {
                    var total = 0;
                    for (var i = 0; i < $scope.model.data.greenLeavesReceiveDetails.length; i++) {
                        total += parseInt($scope.model.data.greenLeavesReceiveDetails[i].normalLeavesQuantity);
                    }
                    return total;
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

                //table selection function
                $scope.selectedRow = null;
                $scope.setClickedRow = function (index, route) {
                    $scope.selectedRow = index;
                    $scope.model.data.route = route.indexNo;
                    $scope.model.data.branch = route.branch;
                };

                //------------------ http functions ------------------------------

                $scope.http.insertGreenLeavesDetail = function () {
                    var detail = $scope.model.data;
                    var detailJSON = JSON.stringify(detail);
                    greenLeavesReceiveFactory.insertGreenLeavesDetail(detailJSON, function (data) {
                        console.log(data);
                    });
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