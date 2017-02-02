(function () {
    //module
    angular.module("teaSettlementModule", []);
    //controller
    angular.module("teaSettlementModule")
            .controller("teaSettlementController", function ($scope) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                $scope.ui.init = function () {
                };

                $scope.ui.init();

            });
}());