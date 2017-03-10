(function () {
    'use strict';

    var service = function (systemConfig, $http) {
        //load master data
        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/clients");
        };

        this.loadRouteOfficers = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/route-officers");
        };

        this.loadRouteHelpers = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/route-helpers");
        };

        this.loadVehicles = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/vehicles");
        };

        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/routes");
        };

        this.loadProducts = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer-item");
        };

        this.saveFertilizer = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer/save-fertilizer", data);
        };

        //find by fertilizer by branch and number
        this.loadFertilizer = function (number) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer/" + number);
        };

//        this.deleteFertilizer = function (indexNo) {
//            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer/delete-fertilizer/" + indexNo);
//        };

        this.deleteFertilizerDetail = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer/delete-fertilizer-detail/" + indexNo);
        };

        //fertilizer approve
        this.getPendingRequest = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer/pending-fertilizer-request");
        };

        this.getSelectdRequestDetails = function (date) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer/pending-fertilizer-request-details/" + date);
        };

        this.approveOrRejectRequest = function (indexNo, status) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer/approve-or-reject-fertilizer/" + indexNo + "/" + status);
        };

    };

    angular.module("appModule")
            .service("FertilizerModelService", service);
}());