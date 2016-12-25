(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        //load master
        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/routes");
        };
        this.loadBranch = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/branch");
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

        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/clients");
        };

        //find by receive by branch and number
        this.loadReceive = function (branch, number) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-receive/" + branch + "/" + number);
        };

        //save green leaves receive and receive details
        this.saveReceive = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-receive/save-receive", data);
        };

        //get factory qty by route and date and branch
        this.getFactoryQuantity = function (route, date, branch) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-receive/get-factory-quantity/" + route + "/" + date + "/" + branch);
        };

        //find existing receive brancha and route and date
        this.findByBranchAndRouteAndDate = function (branch, route, date) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-receive/find-by/" + branch + "/" + route + "/" + date);
        };

        //get route officer and route helper and vehicle find by branch and route and date
        this.findByBranchAndRouteAndDateGreenLeavesWeigh = function (branch, route, date) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/find-weight-by/" + branch + "/" + route + "/" + date);
        };
        //delete green leaves receive and green leaves receive details
        this.deleteGreenLeavesReceive = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-receive/delete-green-leaves-receive/" + indexNo);
        };
    };

    angular.module("appModule")
            .service("GreenLeavesReceiveService", service);
}());