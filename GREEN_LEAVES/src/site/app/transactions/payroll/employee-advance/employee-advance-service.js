(function () {
    'use strict';

    var service = function (systemConfig, $http) {


        this.loadEmployees = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/employee");
        };

//        this.loadAdvanceRequestByNumber = function (number) {
//            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/" + number);
//        };
//
//
        this.saveAdvanceRequest = function (data) {
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
//        this.loadPendingRequests = function () {
//            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/pending-requests");
//        };
//        this.findByRoute = function (route) {
//            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/pending-requests-by-route/" + route);
//        };
//
//        this.approveRequest = function (indexNo) {
//            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/approve-request-detail/" + indexNo);
//        };
//
//        this.rejectRequest = function (indexNo) {
//            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/reject-request-detail/" + indexNo);
//        };
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