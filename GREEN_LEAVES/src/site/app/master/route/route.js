(function () {
    angular.module("routeModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //factory
    angular.module("routeModule")
            .factory("routeFactory", function ($http, systemConfig) {
                var factory = {};

                factory.loadRoute = function () {
                    var url = systemConfig.api + "/api/green-leaves/route/route";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;

            });

    //controller
    angular.module("routeModule")
            .controller("routeController", function (routeFactory, $scope, Notification) {




            });
}());