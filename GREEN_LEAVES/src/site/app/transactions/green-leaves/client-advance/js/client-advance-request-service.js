(function () {
    'use strict';

    var service = function (systemConfig, $http) {
        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/routes");
        };

        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/clients");
        };
    };

    angular.module("appModule")
            .service("ClientAdvanceRequestService", service);
}());