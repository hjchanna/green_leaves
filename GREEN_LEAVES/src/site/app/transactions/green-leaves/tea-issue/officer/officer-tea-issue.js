(function () {
    //module
    angular.module("officerTeaIssueModule", []);
    //controller
    angular.module("officerTeaIssueModule")
            .controller("officerTeaIssueController", function ($scope) {
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