(function () {

    //XSRF Interceptor factory
    angular.module('appModule')
            .factory('XSRFInterceptor', function ($cookies, $rootScope, $q, $log) {

                var XSRFInterceptor = {
                    request: function (config) {

                        var token = $cookies.get('XSRF-TOKEN');

                        if (token) {
                            config.headers['X-XSRF-TOKEN'] = token;
                        }
                        
                        //see index-controller
                        $rootScope.addHttpRequest();

                        return config;
                    },

                    requestError: function (rejection) {
                        //see index-controller
                        $rootScope.removeHttpRequest();

                        return $q.reject(rejection);
                    },

                    response: function (response) {
                        //see index-controller
                        $rootScope.removeHttpRequest();

                        return response;
                    },

                    responseError: function (rejection) {
                        //see index-controller
                        $rootScope.removeHttpRequest();

                        return $q.reject(rejection);
                    }
                };
                return XSRFInterceptor;
            });


    //attch XSRF token to the request
    angular.module("appModule")
            .config(function ($httpProvider) {
                $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
                $httpProvider.defaults.withCredentials = true;
                $httpProvider.interceptors.push('XSRFInterceptor');
            });

    angular.module("appModule")
            .run(function ($rootScope, $location, $cookies, SecurityService) {
                $rootScope.$on("$routeChangeStart", function (event, next, current) {
                    //login back button false
                    SecurityService.ping()
                            .success(function (data, status, headers) {
                                //if login success redirrect to home page
                                if ($location.path() === "/login") {
                                    $location.path("/");
                                }
                            })
                            .error(function (data, status) {
                                $location.path("/login");
                        
                                console.log("XXXXXXXXXXXXXXXX");
                            });
                });
            });
}());