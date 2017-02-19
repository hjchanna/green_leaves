(function () {
    angular.module("appModule")
            .controller("ClientUpdateController", function ($scope, ClientUpdateWeighModel) {
                $scope.model = new ClientUpdateWeighModel();
                $scope.ui = {};

                $scope.ui.init = function () {
                };
                $scope.ui.init();

            });
}());

