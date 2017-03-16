(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.loadEmployees = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/employee");
        };
        this.saveAdvanceRequest = function (data) {
            console.log(data);
            console.log("services");
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/employee-advance/save", data);
        };
        
//      approve
        this.loadPendingRequests = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/employee-advance/pending-requests");
        };
        this.findByStatus = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/employee-advance/pending-requests-by-status");
        };
        this.findByDate = function (date) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/employee-advance/pending-requests-by-date/" + date);
        };
        
        this.approveRequest = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/employee-advance/approve-request-detail/" + indexNo);
        };
        this.rejectRequest = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/employee-advance/reject-request-detail/" + indexNo);
        };
    };
    angular.module("appModule")
            .service("EmployeeAdvanceRequestService", service);
}());