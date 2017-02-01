
(function () {
    //module
    angular.module("sidePanelModule", []);
    //controller
    angular.module("sidePanelModule")
            .controller("sidePanelController", function ($scope,$timeout, SidePanelFunctionModel) {

                $scope.model = new SidePanelFunctionModel();

                $scope.ui = {};
                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = {};

                //ui models


                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $timeout(function () {
                        document.querySelectorAll("#officerText")[0].focus();
                    }, 10);
                };
                $scope.ui.routeOfficerDetail = function (model) {
                    $scope.model.lordRoutOfficerDetail(model);
                };
                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                };

                $scope.ui.init();

            });
}()); 