(function () {
    var service = function ($http, $cookies, systemConfig) {

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
                        callback && callback(true);
                    })
                    .error(function () {
                        callback && callback(false);
                    });
        };

        this.logout = function () {
            $cookies.remove('XSRF-TOKEN');
        };
    };

    angular.module("appModule")
            .service("LoginService", service);
}());