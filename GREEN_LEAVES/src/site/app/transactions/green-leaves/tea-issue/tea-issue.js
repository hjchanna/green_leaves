(function () {
    //module
    angular.module("teasIssueModule", []);
    //controller
    angular.module("teasIssueModule")
            .controller("teasIssueController", function ($scope) {
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