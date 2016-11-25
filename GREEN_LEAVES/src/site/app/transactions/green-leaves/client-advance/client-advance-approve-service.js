(function () {
    'use strict';

    var service = function (systemConfig, $http) {
        this.loadRequests = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/client-advance//pending-requests");
        };
        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/routes");
        };
    };

    angular.module("appModule")
            .service("ClientAdvanceApproveService", service);
}());