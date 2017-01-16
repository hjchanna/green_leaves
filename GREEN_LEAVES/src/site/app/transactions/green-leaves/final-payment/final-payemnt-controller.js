(function () {
    //module
    angular.module("finalPaymentModule", []);

    //controller
    angular.module("finalPaymentModule")
            .controller("FinalPaymentController", function ($scope) {
               
                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                };
                
                $scope.ui.init();
            });
}());