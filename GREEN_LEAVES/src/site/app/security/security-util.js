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
            .run(function ($rootScope, $location, $cookies, SecurityUtilService) {
                $rootScope.$on("$routeChangeStart", function (event, next, current) {
                    var token = $cookies.get('XSRF-TOKEN');

                    //check whether already logged in
                    if (!token) {
                        $location.path("/login");
                    }

                    //login back button false
//                    if ($location.path() === "/login") {
//                        console.log("true");
//                        SecurityUtilService.ping()
//                                .success(function (data, status, headers) {
////                                     $location.path("/login");
//                                    $location.path("/");
//                                })
//                                .error(function (data, status, headers) {
//                                });
//                    }
                });
            });
}());