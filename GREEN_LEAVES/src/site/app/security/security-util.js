(function () {
    angular.module('appModule')
            .factory('XSRFInterceptor', function ($cookies, $log) {

                var XSRFInterceptor = {

                    request: function (config) {

                        var token = $cookies.get('XSRF-TOKEN');

                        if (token) {
                            config.headers['X-XSRF-TOKEN'] = token;
                        }

                        return config;
                    }
                };
                return XSRFInterceptor;
            });

    angular.module("appModule")
            .config(function ($httpProvider) {
                $httpProvider.defaults.withCredentials = true;
                $httpProvider.interceptors.push('XSRFInterceptor');
            });

    angular.module("appModule")
            .run(function ($rootScope, $location, $http, $cookies, LoginService) {
                $rootScope.$on("$routeChangeStart", function (event, next, current) {
                    var token = $cookies.get('XSRF-TOKEN');

                    //check whether already logged in
                    if (!token) {
                        $location.path("/login");
                    }
                });
            });
}());