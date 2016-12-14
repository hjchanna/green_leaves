(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/clients");
        };

        this.saveLoanRequest = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/loan/loan-request/save", data);
        };
        
        //check--------------------------
        
        this.loadPendingRequest = function (){
            return $http.get(systemConfig.apiUrl + "/api/v1/loan/loan-request/pending-requests");
        };
        
        this.checkRequest = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/loan/loan-request/check-request-detail/",data);
        };
    };

    angular.module("appModule")
            .service("LoanRequestService", service);
}());