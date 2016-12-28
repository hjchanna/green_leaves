(function () {
    angular.module("appModule")
            .controller("GreenLeavesWeighController", function ($scope, $filter, ConfirmPane, optionPane, $timeout, GreenLeavesWeighModel) {
                $scope.model = new GreenLeavesWeighModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.model.clear();

                    //set current date
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

                    //set default branch
                    //ERR: get default branch from login info
                    $scope.model.data.branch = $scope.model.defaultBranch().indexNo;
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
                };

                $scope.ui.insertNormalDetail = function () {
                    $scope.model.insertNormalDetail()
                            .then(function () {
                                $scope.ui.toggleType("NORMAL");
                            });

                };

                $scope.ui.insertSuperDetail = function () {
                    $scope.model.insertSuperDetail()
                            .then(function () {
                                $scope.ui.toggleType("SUPER");
                            });
                };

                $scope.ui.getPendingGreenLeavesWeigh = function () {
                    if ($scope.ui.mode === "IDEAL" || $scope.ui.model === "NORMAL") {
                        $scope.model.getPendingWeigh($scope.model.data.branch);
                    }
                };
                $scope.ui.delete = function () {
                    ConfirmPane.dangerConfirm("Delete Green Leaves Weigh")
                            .confirm(function () {
                                $scope.model.deleteGreenLavesWeigh();
                                $scope.ui.mode = "IDEAL";
                                $scope.ui.type = "NORMAL";
                            })
                            .discard(function () {
                                console.log("REJECT");
                            });

                };

                $scope.ui.deleteDetail = function (indexNo) {
                    $scope.model.deleteDetail(indexNo);
                    $timeout(function () {
                        document.querySelectorAll("#normal-qty")[0].focus();
                    }, 10);
                };

                $scope.ui.load = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.model.load()
                                .then(function () {
                                    $scope.ui.mode = "SELECTED";
                                });
                    }
                };

                var tempIndexSave = 0;
                //load weight
                $scope.ui.loadWeight = function (greenLeavesWeight) {
                    tempIndexSave = greenLeavesWeight.indexNo;
                    $scope.model.data.number = greenLeavesWeight.number;
                    $scope.indextab = 0;
                    $scope.model.load()
                            .then(function () {
                                $scope.ui.mode = "SELECTED";
                            });
                };

                //confirm weigh
                $scope.ui.confirm = function () {
                    var indexNo = tempIndexSave;
                    $scope.model.confirmWeight(indexNo);
                    optionPane.successMessage("APPROVE");
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";
                    $scope.model.clear();
                    $scope.indextab = 0;
                    tempIndexSave = 0;
                };

                //find weight by branch and route and date
                $scope.ui.findByBranchAndRouteAndDate = function () {
                    $scope.model.getRouteOfficerAndRouteHelperAndVehicle($scope.model.data.route);
                    $scope.model.findByBranchAndRouteAndDate();
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
                            document.querySelectorAll("#normal-qty")[0].focus();
                        }, 10);
                    } else if (type === 'SUPER') {
                        $timeout(function () {
                            document.querySelectorAll("#super-qty")[0].focus();
                        }, 10);
                    }
                };

                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";
                    $scope.model.clear();

                    $scope.$watch("[model.data.normalTareDeduction,model.data.normalGeneralDeduction, model.data.normalWaterDeduction, model.data.normalCoarseLeaves, model.data.normalBoiledLeaves]", function (newVal, oldVal) {
                        $scope.model.validate();
                    }, true);

                    $scope.$watch("[model.data.superTareDeduction, model.data.superGeneralDeduction, model.data.superWaterDeduction, model.data.superCoarseLeaves, model.data.superBoiledLeaves]", function (newVal, oldVal) {
                        $scope.model.validate();
                    }, true);

                    $scope.$watch("[model.data.routeOfficer,model.data.routeHelper,model.data.vehicle,model.data.normalTareDeduction, model.data.normalGeneralDeduction, model.data.normalWaterDeduction, model.data.normalCoarseLeaves, model.data.normalBoiledLeaves,model.data.superTareDeduction, model.data.superGeneralDeduction, model.data.superWaterDeduction, model.data.superCoarseLeaves, model.data.superBoiledLeaves,model.data.greenLeaveWeighDetails.length]", function (newVal, oldVal) {
                        if ($scope.model.data.greenLeaveWeighDetails.length > 0) {
                            $scope.model.saveWeight();
                        }
                    }, true);

                    $scope.$watch("model.data.date", function (newVal, oldVal) {
                        $scope.model.findByBranchAndRouteAndDate();
                    }, true);
                };
                $scope.ui.init();

            });
}());