(function () {
    var service = function (systemConfig, $http) {
        
        //test ping
        this.ping = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/system/environment/ping");
        };
    };
    
    angular.module("appModule")
            .service("SecurityUtilService", service);
}());