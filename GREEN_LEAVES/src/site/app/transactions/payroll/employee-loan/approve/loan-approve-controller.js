(function () {
    angular.module("appModule")
            .controller("EmployeeLoanApproveController", function ($scope,EmployeeLoanApproveModel, Notification) {
                $scope.model = new EmployeeLoanApproveModel();
                $scope.ui = {};
                
                $scope.ui.approve = function () {
                    if (!$scope.model.detail.agreementNumber) {
                        Notification.error("select agreemenet number");
                    } else if ($scope.model.detail.agreementNumber) {
                        $scope.model.approve();
                        $scope.model.clear();
                    }
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