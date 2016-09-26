(function () {
    //module
    angular.module("greenLeavesPaymentModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

    //controller
    angular.module("greenLeavesPaymentModule")
            .controller("greenLeavesPaymentController", function ($scope) {
                $scope.checkModel = {
                    left: true,
                    middle: false,
                    right: false
                };
            });
}());