(function () {
    //module
    angular.module("greenLeavesWeighModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

    //controller
    angular.module("greenLeavesWeighModule")
            .controller("greenLeavesWeighController", function ($scope) {
                $scope.checkModel = {
                    left: false,
                    right: true
                };
            });
}());