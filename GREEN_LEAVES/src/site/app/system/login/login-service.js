(function () {
    var service = function ($http, $rootScope, systemConfig, $cookies) {

        this.login = function (credentials, callback) {
            var headers =
                    credentials ? {
                        authorization: "Basic " + btoa(credentials.username + ":" + credentials.password)
                    } : {};

            $http.get(systemConfig.apiUrl + "/security/login",
                    {
                        headers: headers
                    })
                    .success(function () {
                        $rootScope.authenticated = true;
                        callback && callback(true);
                    })
                    .error(function () {
                        $rootScope.authenticated = false;
                        callback && callback(false);
                    });
        };

        this.logout = function () {

        };
    };

    angular.module("appModule")
            .service("LoginService", service);
}());