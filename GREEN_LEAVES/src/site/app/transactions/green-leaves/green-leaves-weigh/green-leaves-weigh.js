(function () {
    //module
    angular.module("greenLeavesWeighModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

    //http factory
    angular.module("greenLeavesWeighModule")
            .factory("greenLeavesWeighFactory", function ($http, systemConfig) {
                var factory = {};

                //load routes
                factory.loadRoutes = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/routes";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load recent weigh
                factory.loadSummary = function (number, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/green-leaves-weigh/" + number;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //update or save summary
                factory.saveSummary = function (summary, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/green-leaves-weigh/save-summary";
                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //insert 
                factory.insertDetail = function (detail, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/green-leaves-weigh/insert-detail";
                    $http.post(url, detail)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //delete 
                factory.deleteDetail = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/green-leaves-weigh/delete-detail/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;
            });

    //controller
    angular.module("greenLeavesWeighModule")
            .controller("greenLeavesWeighController", function ($scope, $timeout, greenLeavesWeighFactory) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //contains all route objects, should be assigned at init
                $scope.model.routes = null;

                //green leaves weigh information
                $scope.model.weigh = null;

                //temp edit data
                $scope.model.tempWeigh = null;

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.ui.type = "NORMAL";

                //------------------ model functions ---------------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.weigh = {
                        "indexNo": null,
                        "route": null,
                        "date": null,
                        "number": null,
                        "greenLeavesWeighDetails": [
                            /*{
                             "indexNo": 0,
                             "quantity": 0,
                             "crates": 0,
                             "bags": 0,
                             "polyBags": 0,
                             "type": "NORMAL"//or SUPER
                             }*/
                        ],
                        //normal leaves summary
                        "normalTotalWeight": 0.0,
                        "normalTareCalculated": 0.0,
                        "normalTareDeduction": 0.0,
                        "normalGeneralDeductionPercent": 4.0,
                        "normalGeneralDeduction": 0.0,
                        "normalWaterDeduction": 0.0,
                        "normalCoarseLeaves": 0.0,
                        "normalBoiledLeaves": 0.0,
                        "normalNetWeight": 0.0,
                        //normal tare summary
                        "normalCrates": 0,
                        "normalBags": 0,
                        "normalPolyBags": 0,
                        //super leaves summary
                        "superTotalWeight": 0.0,
                        "superTareCalculated": 0.0,
                        "superTareDeduction": 0.0,
                        "superGeneralDeductionPercent": 4.0,
                        "superGeneralDeduction": 0.0,
                        "superWaterDeduction": 0.0,
                        "superCoarseLeaves": 0.0,
                        "superBoiledLeaves": 0.0,
                        "superNetWeight": 0.0,
                        //super tare summary
                        "superCrates": 0,
                        "superBags": 0,
                        "superPolyBags": 0
                    };

                    $scope.model.resetTemp();
                    $scope.model.validate();
                };

                $scope.model.resetTemp = function () {
                    $scope.model.tempWeigh = {
                        "indexNo": null,
                        "quantity": 0,
                        "crates": 0,
                        "bags": 0,
                        "polyBags": 0,
                        "type": "NORMAL"//or SUPER
                    };
                };

                //validate model
                $scope.model.validate = function () {
                    var normalTotalWeight = 0.0;
                    var superTotalWeight = 0.0;

                    var normalCrates = 0;
                    var normalBags = 0;
                    var normalPolyBags = 0;

                    var superCrates = 0;
                    var superBags = 0;
                    var superPolyBags = 0;
                    angular.forEach($scope.model.weigh.greenLeavesWeighDetails, function (value, key) {
                        if (value.type === 'NORMAL') {
                            normalTotalWeight = normalTotalWeight + parseFloat(value.quantity);

                            normalCrates = normalCrates + parseInt(value.crates);
                            normalBags = normalBags + parseInt(value.bags);
                            normalPolyBags = normalPolyBags + parseInt(value.polyBags);
                        } else if (value.type === 'SUPER') {
                            superTotalWeight = superTotalWeight + parseFloat(value.quantity);

                            superCrates = superCrates + parseInt(value.crates);
                            superBags = superBags + parseInt(value.bags);
                            superPolyBags = superPolyBags + parseInt(value.polyBags);
                        }
                    });

                    //general deduction
                    var normalGeneralDeductionPercent = parseFloat($scope.model.weigh.normalGeneralDeductionPercent);
                    var normalGeneralDeduction = parseInt(normalGeneralDeductionPercent * normalTotalWeight / 100);
                    $scope.model.weigh.normalGeneralDeduction = normalGeneralDeduction;

                    var superGeneralDeductionPercent = parseFloat($scope.model.weigh.superGeneralDeductionPercent);
                    var superGeneralDeduction = parseInt(superGeneralDeductionPercent * superTotalWeight / 100);
                    $scope.model.weigh.superGeneralDeduction = superGeneralDeduction;

                    //net value
                    var normalNetWeight = normalTotalWeight
                            - parseFloat($scope.model.weigh.normalTareDeduction)
                            - parseFloat($scope.model.weigh.normalGeneralDeduction)
                            - parseFloat($scope.model.weigh.normalWaterDeduction)
                            - parseFloat($scope.model.weigh.normalCoarseLeaves)
                            - parseFloat($scope.model.weigh.normalBoiledLeaves);

                    var superNetWeight = superTotalWeight
                            - parseFloat($scope.model.weigh.superTareDeduction)
                            - parseFloat($scope.model.weigh.superGeneralDeduction)
                            - parseFloat($scope.model.weigh.superWaterDeduction)
                            - parseFloat($scope.model.weigh.superCoarseLeaves)
                            - parseFloat($scope.model.weigh.superBoiledLeaves);

                    $scope.model.weigh.normalTotalWeight = normalTotalWeight;
                    $scope.model.weigh.normalNetWeight = normalNetWeight;

                    $scope.model.weigh.superTotalWeight = superTotalWeight;
                    $scope.model.weigh.superNetWeight = superNetWeight;

                    //tare count
                    $scope.model.weigh.normalCrates = normalCrates;
                    $scope.model.weigh.normalBags = normalBags;
                    $scope.model.weigh.normalPolyBags = normalPolyBags;

                    $scope.model.weigh.superCrates = superCrates;
                    $scope.model.weigh.superBags = superBags;
                    $scope.model.weigh.superPolyBags = superPolyBags;
                };

                //------------------ http functions ------------------------------
                $scope.http.loadSummary = function (number) {
                    greenLeavesWeighFactory.loadSummary(number, function (data) {
                        $scope.model.weigh = data;
                        $scope.ui.mode = 'SELECTED';
                    });
                };

                $scope.http.saveSummary = function () {
                    var summary = JSON.stringify($scope.model.weigh);

                    greenLeavesWeighFactory.saveSummary(summary, function (data) {
                        $scope.model.weigh.indexNo = data;
                    });
                };

                $scope.http.checkSummaryAndInsertDetail = function () {
                    //insert summary
                    if (!$scope.model.weigh.indexNo) {
                        //save summary first
                        var summary = JSON.stringify($scope.model.weigh);
                        greenLeavesWeighFactory.saveSummary(summary, function (data) {
                            $scope.model.weigh.indexNo = data;

                            $scope.model.tempWeigh.greenLeavesWeigh = $scope.model.weigh.indexNo;

                            $scope.http.insertWeigh();
                        });
                    } else {
                        $scope.http.insertWeigh();
                    }
                };

                $scope.http.insertWeigh = function () {
                    var detail = $scope.model.tempWeigh;
                    var detailJSON = JSON.stringify(detail);
                    //save detail dirrectly
                    greenLeavesWeighFactory.insertDetail(detailJSON, function (data) {
                        detail.indexNo = data;
                        $scope.model.weigh.greenLeavesWeighDetails.push(detail);

                        $scope.model.resetTemp();
                        $scope.model.validate();
                        $scope.ui.toggleType(detail.type);
                    });
                };

                $scope.http.deleteWeigh = function (indexNo) {
                    greenLeavesWeighFactory.deleteDetail(indexNo, function () {
                        var id = -1;
                        for (var i = 0; i < $scope.model.weigh.greenLeavesWeighDetails.length; i++) {
                            if ($scope.model.weigh.greenLeavesWeighDetails[i].indexNo === indexNo) {
                                id = i;
                            }
                        }

                        $scope.model.weigh.greenLeavesWeighDetails.splice(id, 1);
                    });
                };


                //------------------ ui functions ------------------------------
                //load recent weigh
                $scope.ui.load = function (e) {
                    var code = e.keyCode || e.which;
                    if (code === 13) {
                        $scope.http.loadSummary($scope.model.weigh.number);
                    }
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";

                    $timeout(function () {
                        document.querySelectorAll("#route")[0].focus();
                    }, 10);
                };

                //edit function
                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";

                    $timeout(function () {
                        document.querySelectorAll("#route")[0].focus();
                    }, 10);
                };

                //add function
                $scope.ui.insertNormal = function () {
                    if ($scope.ui.validateWeighInput()) {
                        $scope.model.tempWeigh.indexNo = null;
                        $scope.model.tempWeigh.greenLeavesWeigh = $scope.model.weigh.indexNo;
                        $scope.model.tempWeigh.type = 'NORMAL';

                        $scope.http.checkSummaryAndInsertDetail();//send to server and add to collection
                    }
                };
                $scope.ui.insertSuper = function () {
                    if ($scope.ui.validateWeighInput()) {
                        $scope.model.tempWeigh.indexNo = null;
                        $scope.model.tempWeigh.greenLeavesWeigh = $scope.model.weigh.indexNo;
                        $scope.model.tempWeigh.type = 'SUPER';

                        $scope.http.checkSummaryAndInsertDetail();//send to server and add to collection
                    }
                };

                //delete function
                $scope.ui.deleteDetail = function (indexNo) {
                    $scope.http.deleteWeigh(indexNo);
                };

                //finish edits
                $scope.ui.finish = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.reset();
                };

                //toggle normal or super
                $scope.ui.toggleType = function (type) {
                    $scope.ui.type = type;

                    //key focus route
                    if (type === 'NORMAL') {
                        $timeout(function () {
                            document.querySelectorAll("#normal-qty")[0].focus();
                        }, 10);
                    } else if (type === 'SUPER') {
                        $timeout(function () {
                            document.querySelectorAll("#super-qty")[0].focus();
                        }, 10);
                    }
                };

                //ui validation functions
                $scope.ui.validateWeighInput = function () {
                    var quantity = $scope.model.tempWeigh.quantity;
                    var tareCount = $scope.model.tempWeigh.crates
                            + $scope.model.tempWeigh.bags
                            + $scope.model.tempWeigh.polyBags;

                    return (tareCount > 0 && quantity > 0);
                };

                $scope.ui.getRouteLabel = function (route) {
                    var label;
                    angular.forEach($scope.model.routes, function (value, key) {
                        if (value.indexNo === route) {
                            label = value.indexNo + "-" + value.name;
                            return;
                        }
                    });
                    return label;
                };

                //ui init function
                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset model
                    $scope.model.reset();

                    //load routes
                    greenLeavesWeighFactory.loadRoutes(function (data) {
                        $scope.model.routes = data;
                    });
                };
                $scope.ui.init();

            });
}());