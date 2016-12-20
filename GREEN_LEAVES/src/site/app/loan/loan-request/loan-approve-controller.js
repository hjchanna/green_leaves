(function () {
    angular.module("appModule")
            .controller("LoanApproveController", function ($scope, LoanApproveModel) {
                $scope.model = new LoanApproveModel();
                $scope.ui = {};

                $scope.ui.approve = function () {
                    $scope.model.approve();
                    $scope.model.clear();
                };

                $scope.ui.reject = function () {
                    $scope.model.reject();
                };

                $scope.ui.init = function () {
                    $scope.model.clear();
                };

                $scope.ui.selectDetail = function (indexNo) {
                    $scope.model.selectDetail(indexNo);
                    $scope.ui.selectedDetailIndex = indexNo;
                };

                $scope.ui.init();

            });
}());