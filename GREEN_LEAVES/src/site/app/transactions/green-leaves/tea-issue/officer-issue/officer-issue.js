(function () {
    //module
    angular.module("officerIssueModule", []);
    //controller
    angular.module("officerIssueModule")
            .controller("officerIssueController", function ($scope) {
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
}()); ;