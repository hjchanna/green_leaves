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
//
//
//
//        this.deleteAdvancerRequest = function (indexNo) {
//            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/delete/" + indexNo);
//        };
//
//        this.deleteAdvanceRequestDetails = function (indexNo) {
//            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/delete-detail/" + indexNo);
//        };
//
//        //approve
        this.loadPendingRequests = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/employee-advance/pending-requests");
        };
        this.findByStatus = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/employee-advance/pending-requests-by-status");
        };
//
        this.findByDate = function (date) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/employee-advance/pending-requests-by-date/" + date);
        };
        
        this.approveRequest = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/employee-advance/approve-request-detail/" + indexNo);
        };
//
        this.rejectRequest = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/employee-advance/reject-request-detail/" + indexNo);
        };
//
//        //client history
//        this.clientHistory = function (date, client) {
//            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/find-client-account-transaction-history/" + date + "/" + client);
//        };
//
//        //grt super total leaves and normal total leaves by branch.route,date,client for chart
//        this.getGreenLeavesByBranchAndRouteAndDateAndClient = function (route, date, client) {
//            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/find-client-wise-receive-history/" + route + "/" + date + "/" + client);
//        };
//        
//                //get monthly and daily summry details
//        this.getGreenLeavesReceiveSummryDetails = function (date, client) {
//            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/find-green-leaves-receive-summry/" + new Date(date).toISOString() + "/" + client);
//        };
    };

    angular.module("appModule")
            .service("EmployeeAdvanceRequestService", service);
}());