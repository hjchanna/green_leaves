(function () {
    angular.module("appModule")
            .controller("GreenLeavesWeighController", function ($scope, $filter, optionPane, $timeout, GreenLeavesWeighModel) {
                $scope.model = new GreenLeavesWeighModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.model.clear();

                    //set current date
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

                    //set default branch
                    $scope.model.data.branch = $scope.model.defaultBranch().indexNo;
                    $scope.model.searchGreenLeavesWeight($scope.model.data.branch);

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
                $scope.ui.insertNormalDetail = function () {
                    $scope.model.insertNormalDetail()
                            .then(function () {
                                $scope.ui.toggleType("NORMAL");
                            });

                };

                $scope.ui.deleteDetail = function (indexNo) {
                    $scope.model.deleteDetail(indexNo);
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

                //load weight
                $scope.ui.loadWeight = function (greenLeavesWeight) {
                    $scope.model.data.number = greenLeavesWeight.number;
                    $scope.indextab = 0;
                    $scope.model.load()
                            .then(function () {
                                $scope.ui.mode = "SELECTED";
                            });
                };

                $scope.ui.confirm = function () {
                    var indexNo = $scope.model.data.indexNo;
                    $scope.model.confirmWeight(indexNo);
                    optionPane.successMessage("APPROVE" + indexNo);
                    $scope.ui.mode = "EDIT";
                    $scope.model.clear();
                    $scope.indextab = 0;
                };

                $scope.ui.serchWeight = function (model) {
                    $scope.model.searchGreenLeavesWeight(model);
                };


                $scope.ui.findByBranchAndRouteAndDate = function () {
                    $scope.model.findByBranchAndRouteAndDate();
                };

                $scope.ui.save = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.saveWeight();
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

                    $scope.$watch("[model.data.normalTareDeduction, model.data.normalGeneralDeductionPercent, model.data.normalWaterDeduction, model.data.normalCoarseLeaves, model.data.normalBoiledLeaves]", function (newVal, oldVal) {
                        $scope.model.validate();
                    }, true);

                    $scope.$watch("[model.data.superTareDeduction, model.data.superGeneralDeductionPercent, model.data.superWaterDeduction, model.data.superCoarseLeaves, model.data.superBoiledLeaves]", function (newVal, oldVal) {
                        $scope.model.validate();
                    }, true);
                };
                $scope.ui.init();

            });
}());