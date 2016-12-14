(function () {
    angular.module("appModule")
            .controller("LoanRequestController", function ($scope, $timeout, LoanRequestModel) {
                $scope.model = new LoanRequestModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.model.clear();

                    $timeout(function () {
                        document.querySelectorAll("#number")[0].focus();
                    }, 10);
                };

                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";

                    $timeout(function () {
                        document.querySelectorAll("#number")[0].focus();
                    }, 10);
                };

                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };


                $scope.ui.insertLoanRequest = function () {
                    $scope.model.insertLoanRequest();
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

                $scope.ui.save = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.saveRequest();
                    $scope.model.clear();
                };


                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };
                $scope.ui.init();

            });
}());