(function () {
    angular.module("routeModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //factory
    angular.module("routeModule")
            .factory("routeFactory", function ($http, systemConfig) {
                var factory = {};

                factory.loadRoutes = function () {
                    var url = systemConfig.api + "/api/green-leaves/route/route";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                
                factory.allRoutes = function (){
                    var url = systemConfig.api + "/api/green-leaves/route/route";
                }

//                factory.searchByRoute = function (routeName, callback) {
//                    var url = systemConfig.api + "/api/green-leaves/route/route" + routeName;
//
//                    $http.get(url)
//                            .success(function (data, status, headers) {
//                                callback(data);
//                            })
//                            .error(function (data, status, headers) {
//
//                            });
//                };

                return factory;

            });

    //controller
    angular.module("routeModule")
            .controller("routeController", function (routeFactory, $scope, Notification) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;




                //------------ ui funtion----------------


                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                };


                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";

                };

                $scope.ui.init();

            });
}());