(function () {
    'use strict';

    var service = function (systemConfig, $http) {
        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/routes");
        };

        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/clients");
        };

        this.saveGreenLeavesDetail = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/green-leaves/green-leaves-receive/save-green-leaves-receive", data);
        };
        this.getSuperLeavesTotalAndNormalLeavesTotal = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/green-leaves/green-leaves-weigh/get-total-leaves", data);
        };
    };

    angular.module("appModule")
            .service("GreenLeavesReceiveService", service);
}());