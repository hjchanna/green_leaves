(function () {
    //module
    angular.module("fertilizerModule", []);
    angular.module("fertilizerModule")
            .factory("fertilizerFactory", function ($http, systemConfig) {
                var factory = {};

                return factory;

            });

    //controller
    angular.module("fertilizerModule")
            .controller("fertilizerController", function ($scope) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                //------------------ model functions ---------------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.category = {
                        "indexNo": null,
                        "name": null
                    };
                };

                //focus
                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#category")[0].focus();
                    }, 10);
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.ui.focus();
                };

                //edit funtion
                $scope.ui.edit = function (data, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.ui.focus();
                };


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    $scope.model.reset();
                };

                $scope.ui.init();

            });
}());