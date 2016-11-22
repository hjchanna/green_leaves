(function () {
    'use strict';

    var service = function (systemConfig, $http) {
        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/routes");
        };

        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/clients");
        };

        this.loadAdvanceRequestByNumber = function (number) {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/client-advance/" + number);
        };

        this.saveAdvanceRequest = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/green-leaves/client-advance/save", data);
        };

        this.deleteAdvancerRequest = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/green-leaves/client-advance/delete/" + indexNo);
        };
    };

    angular.module("appModule")
            .service("ClientAdvanceRequestService", service);
}());