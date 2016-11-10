(function () {
//module
    angular.module("homeModule", []);
    //controller
    angular.module("homeModule")
            .controller("homeController", function ($scope, $timeout, optionPane) {
                $scope.informationMessage = function () {
//                    optionPane.open('danger');
                    optionPane.defaultMessage("My message should be here");
                };
                
                $scope.default = function(){
                    optionPane.defaultMessage("My message should be here");
                };
                $scope.primary = function(){
                    optionPane.primaryMessage("My message should be here");
                };
                $scope.info = function(){
                    optionPane.infoMessage("My message should be here");
                };
                $scope.success = function(){
                    optionPane.successMessage("My message should be here");
                };
                $scope.warning = function(){
                    optionPane.warningMessage("My message should be here");
                };
                $scope.danger = function(){
                    optionPane.dangerMessage("My message should be here");
                };
            });
}());