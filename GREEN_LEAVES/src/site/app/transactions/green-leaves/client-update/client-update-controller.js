(function () {
    angular.module("appModule")
            .controller("ClientUpdateController", function ($scope, ClientUpdateWeighModel, $filter) {
                $scope.model = new ClientUpdateWeighModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.model.clear();
                };

                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";
                };
                $scope.ui.init();

            });
}());

