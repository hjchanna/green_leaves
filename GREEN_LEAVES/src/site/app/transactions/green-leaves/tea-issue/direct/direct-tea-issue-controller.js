(function () {
    //module
    angular.module("directTeaIssueModule", []);
    //controller
    angular.module("directTeaIssueModule")
            .controller("directTeaIssueController", function ($scope) {
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