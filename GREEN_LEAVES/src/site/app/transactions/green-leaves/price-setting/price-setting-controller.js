(function () {
    //module
    angular.module("priceSettingModule", []);

    //controller
    angular.module("priceSettingModule")
            .controller("PriceSettingController", function ($scope, $timeout, PriceSettingModel) {
                $scope.model = new PriceSettingModel();
                $scope.ui = {};

                $scope.ui.load = function (e) {
                    var code = e ? e.keyCode || e.which : 13;

                    if (code === 13) {
                        $scope.model.loadData()
                                .then(function () {
                                    $scope.ui.mode = "SELECTED";
                                });
                    }

                    $scope.model.loadTotalLeaves();
                    
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