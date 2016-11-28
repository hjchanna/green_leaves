(function () {
    angular.module("appModule")
            .controller("FertilizerController", function ($scope, $timeout) {
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    
                    $timeout(function () {
                        document.querySelectorAll("#route")[0].focus();
                    }, 10);
                };

                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";

                    $timeout(function () {
                        document.querySelectorAll("#route")[0].focus();
                    }, 10);
                };

                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                };
            });
}());