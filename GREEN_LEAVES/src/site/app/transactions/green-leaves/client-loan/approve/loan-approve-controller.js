(function () {
    angular.module("appModule")
            .controller("ClientLoanApproveController", function ($scope, $timeout, ClientLoanApproveModel, Notification) {
                $scope.model = new ClientLoanApproveModel();
                $scope.ui = {};

                $scope.ui.approve = function () {
                    if (!$scope.model.detail.agreementNumber) {
                        Notification.error("Select Agreemenet Number");

                        $timeout(function () {
                            document.querySelectorAll("#agreementNumber")[0].focus();
                        }, 10);
                    } else if ($scope.model.detail.agreementNumber) {
                        $scope.model.approve();
                        $scope.model.clear();
                        $timeout(function () {
                            document.querySelectorAll("#rate")[0].focus();
                        }, 10);
                    }
                };

                $scope.ui.reject = function () {
                    $scope.model.reject();
                    $timeout(function () {
                        document.querySelectorAll("#rate")[0].focus();
                    }, 10);
                };

                $scope.ui.init = function () {
                    $scope.model.clear();
                };

                $scope.ui.selectDetail = function (indexNo) {
                    $scope.model.selectDetail(indexNo);
                    $scope.ui.selectedDetailIndex = indexNo;
                    $timeout(function () {
                        document.querySelectorAll("#agreementNumber")[0].focus();
                    }, 10);

                };

                $scope.ui.init();

            });
}());