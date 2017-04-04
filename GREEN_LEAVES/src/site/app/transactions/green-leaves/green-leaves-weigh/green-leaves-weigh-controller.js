(function () {
    angular.module("appModule")
            .controller("GreenLeavesWeighController", function ($scope, $filter, ConfirmPane, optionPane, $timeout, GreenLeavesWeighModel, Notification) {
                $scope.model = new GreenLeavesWeighModel();
                $scope.ui = {};
                $scope.ui.insertProcessing = false; //Douple click duplicate bug fix

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.model.clear();
                    //set current date
                    //TODO:get date from the server
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                    //switch to the branch
                    $timeout(function () {
                        document.querySelectorAll("#branch")[0].focus();
                    }, 10);
                };
                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";
                    $timeout(function () {
                        document.querySelectorAll("#branch")[0].focus();
                    }, 10);
                };
                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                    $scope.ui.toggleType('NORMAL');
                };
                $scope.ui.validateDetail = function () {
                    var result = {};
                    if (!$scope.model.data.branch) {
                        result.message = "Please select a valid branch.";
                    } else if (!$scope.model.data.route) {
                        result.message = "Please select a valid route.";
                    } else if (!$scope.model.data.date) {
                        result.message = "Please enter a valid date.";
                    } else if (!$scope.model.data.routeOfficer) {
                        result.message = "Please select a valid route officer.";
                    } else if (!$scope.model.data.routeHelper) {
                        result.message = "Please select a valid route helper.";
                    } else if (!$scope.model.data.vehicle) {
                        result.message = "Please select a valid vehicle.";
                    } else if (!$scope.model.tempData.quantity && $scope.model.tempData.quantity <= 0) {
                        result.message = "Please enter a valid green leaves quantity.";
                    } else if ($scope.model.tempData.crates
                            + $scope.model.tempData.bags
                            + $scope.model.tempData.polyBags <= 0) {
                        result.message = "Please enter a valid tare count.";
                    } else {
                        result.valid = true;
                    }

                    if (!result.valid) {
                        result.valid = false;
                    }

                    return result;
                };
                $scope.ui.insertNormalDetail = function () {
                    var validationResult = $scope.ui.validateDetail();

                    if (!validationResult.valid) {
                        Notification.error(validationResult.message);
                    } else {
                        if (!$scope.ui.insertProcessing) {
                            $scope.ui.insertProcessing = true;
                            $scope.model.insertNormalDetail()
                                    .then(function () {
                                        $scope.ui.toggleType("NORMAL");
                                        $scope.ui.insertProcessing = false;
                                    }, function () {
                                        $scope.ui.insertProcessing = false;
                                    });
                        }
                    }
                };

                $scope.ui.insertSuperDetail = function () {
                    var validationResult = $scope.ui.validateDetail();

                    if (validationResult.valid === false) {
                        Notification.error(validationResult.message);
                    } else {
                        if (!$scope.ui.insertProcessing) {
                            $scope.ui.insertProcessing = true;
                            $scope.model.insertSuperDetail()
                                    .then(function () {
                                        $scope.ui.toggleType("SUPER");
                                        $scope.ui.insertProcessing = false;
                                    }, function () {
                                        $scope.ui.insertProcessing = false;
                                    });
                        }
                    }
                };

                $scope.ui.getPendingGreenLeavesWeigh = function () {
                    $scope.model.loadPendingWeigh();
                };
                $scope.ui.delete = function () {
                    ConfirmPane.dangerConfirm("Do you sure want to delete current Green leaves weigh ?")
                            .confirm(function () {
                                $scope.model.deleteGreenLavesWeigh()
                                        .then(function () {
                                            $scope.ui.mode = "IDEAL";
                                            $scope.ui.type = "NORMAL";

                                            Notification.success("Green leaves weigh deleted successfully.");
                                        });
                            });
                };
                $scope.ui.deleteDetail = function (indexNo) {
                    if ($scope.model.data.greenLeaveWeighDetails.length === 1) {
                        ConfirmPane.dangerConfirm("Current green leaves weigh will be empty after deleting this weigh detail. Do you want to delete whole weigh information?")
                                .confirm(function () {
                                    $scope.model.deleteGreenLavesWeigh()
                                            .then(function () {
                                                $scope.ui.discard();
                                                Notification.success("Green leaves weigh deleted successfully.");
                                            });
                                });
                    } else {
                        $scope.model.deleteDetail(indexNo)
                                .then(function () {
                                    document.querySelectorAll("#normal-qty")[0].focus();
                                    Notification.success("Green leaves weigh detail deleted successfully.");
                                });
                    }


//                    $timeout(function () {
//                        document.querySelectorAll("#normal-qty")[0].focus();
//                    }, 10);
                };
                //load recent transaction by number
                $scope.ui.load = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        var number = $scope.model.data.number;
                        $scope.model.load()
                                .then(function () {
                                    $scope.ui.mode = "SELECTED";
                                }, function () {
                                    if (!number) {
                                        Notification.error("Please enter a valid number.");
                                    } else {
                                        Notification.error("Green leaves weigh cannot be found at " + number + ".");
                                    }
                                });
                    }
                };
                //switch to the pending weight
                $scope.ui.switchPendingWeight = function (greenLeavesWeight) {
                    $scope.model.switchWeight(greenLeavesWeight);
                    $scope.ui.toggleType('NORMAL');
                    $scope.ui.mode = "SELECTED";
                };
                //confirm weigh
                $scope.ui.approve = function () {
                    $scope.model.approveWeight($scope.model.data.indexNo);
                    optionPane.successMessage("Green leaves weigh successfully approved !");
                    //reset view to defauts
                    $scope.ui.discard();
                };
                //find weight by branch and route and date
                $scope.ui.findByBranchAndRouteAndDate = function () {
                    $scope.model.getRouteOfficerAndRouteHelperAndVehicle($scope.model.data.route);
                    //$scope.model.findByBranchAndRouteAndDate();
                    $timeout(function () {
                        document.querySelectorAll("#normal-qty")[0].focus();
                    }, 10);
                };
                $scope.ui.save = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };
                $scope.ui.toggleType = function (type) {
                    $scope.ui.type = type;
                    if (type === 'NORMAL') {
                        $timeout(function () {
                            $scope.indextab = 0;
                            document.querySelectorAll("#normal-qty")[0].focus();
                        }, 10);
                    } else if (type === 'SUPER') {
                        $timeout(function () {
                            $scope.indextab = 1;
                            document.querySelectorAll("#super-qty")[0].focus();
                        }, 10);
                    }
                };
                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";
                    $scope.model.clear();
                    //normal validation
                    $scope.$watch("[model.data.normalTareDeduction,model.data.normalGeneralDeduction, model.data.normalWaterDeduction, model.data.normalCoarseLeaves, model.data.normalBoiledLeaves]", function (newVal, oldVal) {
                        $scope.model.validate();
                    }, true);
                    //super validation
                    $scope.$watch("[model.data.superTareDeduction, model.data.superGeneralDeduction, model.data.superWaterDeduction, model.data.superCoarseLeaves, model.data.superBoiledLeaves]", function (newVal, oldVal) {
                        $scope.model.validate();
                    }, true);
                    $scope.$watch("[model.data.routeOfficer,model.data.routeHelper,model.data.vehicle,model.data.normalTareDeduction, model.data.normalGeneralDeduction, model.data.normalWaterDeduction, model.data.normalCoarseLeaves, model.data.normalBoiledLeaves,model.data.superTareDeduction, model.data.superGeneralDeduction, model.data.superWaterDeduction, model.data.superCoarseLeaves, model.data.superBoiledLeaves,model.data.greenLeaveWeighDetails.length]", function (newVal, oldVal) {
                        if ($scope.model.data.greenLeaveWeighDetails.length > 0) {
                            $scope.model.saveWeight();
                        }
                    }, true);
                    $scope.$watch("model.data.branch", function (newVal, oldVal) {
                        if (newVal) {
                            $scope.model.loadBranchInfromation(newVal);
                        }
                    });
//                    $scope.$watch("model.data.date", function (newVal, oldVal) {
//                        $scope.model.findByBranchAndRouteAndDate();
//                    }, true);
                };
                $scope.ui.init();
            });
}());