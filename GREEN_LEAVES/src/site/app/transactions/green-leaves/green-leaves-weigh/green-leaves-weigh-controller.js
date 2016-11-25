(function () {
    angular.module("appModule")
            .controller("GreenLeavesWeighController", function ($scope, GreenLeavesWeighModel) {
                $scope.model = new GreenLeavesWeighModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.model.clear();
                };

                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";

                };

                $scope.ui.delete = function () {

                };

                $scope.ui.load = function () {
                    $scope.ui.mode = "SELECTED";

                };

                $scope.ui.clear = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();

                };

                $scope.ui.save = function () {

                };

                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };

                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                    
                    console.log($scope.model.routes);
                };
                $scope.ui.init();

            });
}());