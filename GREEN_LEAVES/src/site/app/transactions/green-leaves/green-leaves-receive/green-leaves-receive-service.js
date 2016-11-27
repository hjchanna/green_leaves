(function () {
    'use strict';

    var service = function (systemConfig, $http) {
        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/routes");
        };

        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/clients");
        };

        this.saveGreenLeavesDetail = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-receive/save-green-leaves-receive", data);
        };
        this.getSuperLeavesTotalAndNormalLeavesTotal = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/get-total-leaves", data);
        };
        this.loadGreenLeaveReceive = function (number) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-receive/get-detail/" + number);
        };
    };

    angular.module("appModule")
            .service("GreenLeavesReceiveService", service);
}());