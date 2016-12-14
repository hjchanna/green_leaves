(function () {
    //module
    angular.module("priceSettingModule", []);

    //controller
    angular.module("priceSettingModule")
            .controller("PriceSettingController", function ($scope, $timeout, PriceSettingModel, optionPane) {
                $scope.model = new PriceSettingModel();
                $scope.ui = {};

                $scope.model.totalValues = {
                    "totalNormalQty": 0,
                    "totalSuperQty": 0,
                    "totalNormalValue": 0,
                    "totalSuperValue": 0
                };

                $scope.ui.load = function (e) {
                    var code = e ? e.keyCode || e.which : 13;

                    if (code === 13) {
                        $scope.model.loadData()
                                .then(function () {
                                    $scope.ui.mode = "SELECTED";
                                    $scope.ui.mode = "EDIT";
                                    $scope.ui.getTotalQtyAndValues();
                                    $timeout(function () {
                                        document.querySelectorAll("#deafaultNormalLeavesRate")[0].focus();
                                    }, 10);
                                });
                    }

                    $scope.model.loadTotalLeaves();

                };

                $scope.ui.defaultSuperRate = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        for (var i = 0; i < $scope.model.data.priceSettingDetails.length; i++) {
                            if ($scope.model.getTotalLeaves($scope.model.data.priceSettingDetails[i].route)[2] > 0) {
                                $scope.model.data.priceSettingDetails[i].superRate = $scope.model.default.superRate;
                            }
                        }
                        $scope.ui.getTotalQtyAndValues();
                    }
                };

                $scope.ui.defaultNormalRate = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        for (var i = 0; i < $scope.model.data.priceSettingDetails.length; i++) {
                            if ($scope.model.getTotalLeaves($scope.model.data.priceSettingDetails[i].route)[1] > 0) {
                                $scope.model.data.priceSettingDetails[i].normalRate = $scope.model.default.normalRate;
                            }
                        }
                        $scope.ui.getTotalQtyAndValues();
                    }
                };

                $scope.ui.getTotalQtyAndValues = function () {
                    var totalNormalQty = 0;
                    var totalSuperQty = 0;
                    var totalNormalValue = 0;
                    var totalSuperValue = 0;
                    for (var i = 0; i < $scope.model.data.priceSettingDetails.length; i++) {
                        //total qty
                        totalNormalQty += parseInt($scope.model.getTotalLeaves($scope.model.data.priceSettingDetails[i].route)[1]);
                        totalSuperQty += parseInt($scope.model.getTotalLeaves($scope.model.data.priceSettingDetails[i].route)[2]);
                        $scope.model.totalValues.totalNormalQty = totalNormalQty;
                        $scope.model.totalValues.totalSuperQty = totalSuperQty;
                        //total values
                        totalNormalValue += parseInt($scope.model.getTotalLeaves($scope.model.data.priceSettingDetails[i].route)[1] * $scope.model.data.priceSettingDetails[i].normalRate);
                        totalSuperValue += parseInt($scope.model.getTotalLeaves($scope.model.data.priceSettingDetails[i].route)[2] * $scope.model.data.priceSettingDetails[i].superRate);
                        $scope.model.totalValues.totalNormalValue = totalNormalValue;
                        $scope.model.totalValues.totalSuperValue = totalSuperValue;
                    }
                };



                $scope.ui.getEditableRate = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.ui.getTotalQtyAndValues();
                    }
                };
                
                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";
                };

                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clearData();
                };

                $scope.ui.save = function () {
                    $scope.model.saveData()
                            .then(function () {
                                $scope.ui.mode = "IDEAL";
                                $scope.model.default.normalRate = null;
                                $scope.model.default.superRate = null;
                                $scope.model.totalValues = {};
                                optionPane.successMessage("Save");
                            });
                };

                $scope.ui.selectDetail = function (indexNo) {
                    if ($scope.ui.mode === 'EDIT') {
                        $scope.model.selectDetail(indexNo);
                    }
                };

                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                };
                $scope.ui.init();
            });
}());