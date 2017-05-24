(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/routes");
        };

        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/clients");
        };

        this.loadRouteOfficers = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/route-officers");
        };

        this.loadTeaIssueItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/tea-issue-item");
        };





        this.loadTeaIssue = function (number, type) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/tea-issue/" + number + "/" + type);
        };

        this.saveTeaIssue = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/tea-issue/save-tea-issue", data);
        };

        this.deleteTeaIssue = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/tea-issue/delete-tea-issue/" + indexNo);
        };

        this.deleteTeaIssueDetail = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/tea-issue/delete-tea-issue-detail/" + indexNo);
        };
    };

    angular.module("appModule")
            .service("TeaIssueService", service);
}());