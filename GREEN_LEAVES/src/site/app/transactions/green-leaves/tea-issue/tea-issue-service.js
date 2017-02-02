(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/clients");
        };

        this.loadTeaGrade = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/tea-grade");
        };

        this.loadRouteOfficers = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/route-officers");
        };

        this.saveTeaIssue = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/tea-issue/save-tea-issue", data);
        };

        //find by teaIssue by branch and number
        this.loadTeaIssue = function (date, number, type) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/tea-issue/" + date + "/" + number + "/" + type);
        };

        this.deleteTeaIssue = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/tea-issue/delete-tea-issue/" + indexNo);
        };

        //tea issue settlement
        this.getPendingTeaIssueRequest = function (type) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/tea-issue/pending-tea-issue/" + type);
        };

        this.approveOrRejectRequest = function (indexNo, status) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/fertilizer/approve-or-reject-fertilizer/" + indexNo + "/" + status);
        };

    };

    angular.module("appModule")
            .service("TeaIssueService", service);
}());