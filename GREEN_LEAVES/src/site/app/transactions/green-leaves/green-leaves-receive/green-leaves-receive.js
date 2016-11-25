(function () {
    //module
    angular.module("greenLeavesReceiveModule", []);

    //controller
    angular.module("greenLeavesReceiveModule")
            .controller("greenLeavesReceiveController", function ($scope, greenLeavesReceiveFactory, Notification) {

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

                //finish edits
                $scope.ui.finish = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.http.insertGreenLeavesDetail();
                };

                $scope.validateInput = function () {
                    if ($scope.model.tempData.client && ($scope.model.tempData.normalLeavesQuantity + $scope.model.tempData.superLeavesQuantity) > 0) {
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
                        $scope.model.tempData = {};
                    } else {
                        Notification.error("plaese input all");
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
                    greenLeavesReceiveFactory.insertGreenLeavesDetail(
                            detailJSON,
                            function (data) {
                                Notification.success("success" + data.indexNo);
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };
            });
}());