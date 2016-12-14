(function () {
    angular.module("appModule")
            .controller("LoanCheckController", function ($scope, LoanCheckModel) {
                $scope.model = new LoanCheckModel();
                $scope.ui = {};

                $scope.ui.check = function () {
                    $scope.model.checkRequest();
                    $scope.model.clear();
                };

                $scope.ui.init = function () {
                    $scope.model.clear();
                };

                $scope.ui.selectData = function (indexNo) {
                    $scope.model.selectData(indexNo);
                    $scope.ui.selectedDataIndex = indexNo;
                };
                
                $scope.ui.selectDetail = function (indexNo) {
                    $scope.model.selectDetail(indexNo);
                    $scope.ui.selectedDetailIndex = indexNo;
                };

                $scope.ui.init();

            });
}());