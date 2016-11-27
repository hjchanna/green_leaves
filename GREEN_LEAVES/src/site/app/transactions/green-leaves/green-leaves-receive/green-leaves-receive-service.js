(function () {
    'use strict';

    var service = function (systemConfig, $http) {
        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/routes");
        };

        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/clients");
        };

        this.loadReceive = function (number) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-receive/" + number);
        };

        this.saveReceive = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-receive/save-receive", data);
        };

        this.getFactoryQuantity = function (route, date) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-receive/get-factory-quantity/" + route + "/" + date.toISOString());
        };
    };

    angular.module("appModule")
            .service("GreenLeavesReceiveService", service);
}());