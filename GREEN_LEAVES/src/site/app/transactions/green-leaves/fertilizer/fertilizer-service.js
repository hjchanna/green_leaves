(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/clients");
        };

        this.loadProducts = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/product");
        };

        this.loadRouteOfficers = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/route-officers");
        };

        this.saveFertilizer = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer/save-fertilizer", data);
        };

        //find by fertilizer by branch and number
        this.loadFertilizer = function (date, number) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer/" + date + "/" + number);
        };

        this.deleteFertilizer = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer/delete-fertilizer/" + indexNo);
        };

        //fertilizer approve
        this.getPendingRequest = function (routeOfficer) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer/pending-fertilizer/" + routeOfficer);
        };

        this.getPendingRequestByRouteVise = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer/pending-route-vise-fertilizer");
        };
        
        this.approveOrRejectRequest = function (indexNo, status) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer/approve-or-reject-fertilizer/" + indexNo + "/" + status);
        };

    };

    angular.module("appModule")
            .service("FertilizerModelService", service);
}());