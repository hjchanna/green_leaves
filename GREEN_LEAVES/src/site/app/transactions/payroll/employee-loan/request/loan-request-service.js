(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.loadEmployee = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/employee");
        };
        
        this.saveLoanRequest = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/employee-loan/loan-request/save", data);
        };

//        //check--------------------------
        this.loadPendingRequest = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/employee-loan/loan-request/pending-requests");
        };

        this.findByTLoanRequestDetailByIndexNo = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/v1/employee-loan/loan-request/find-by-loan-detail/" + indexNo);
        };

        this.checkRequest = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/employee-loan/loan-request/check-request-detail/", data);
        };

//        //approve---------------------------

        this.loadcheckPendingRequest = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/employee-loan/loan-request/check-pending-requests");
        };

        this.approveRequest = function (indexNo, agreementNumber) {
            return $http.get(systemConfig.apiUrl + "/api/v1/employee-loan/loan-request/approve-request/" + indexNo + "/" + agreementNumber);
        };

        this.rejectRequest = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/v1/employee-loan/loan-request/reject-request/" + indexNo);
        };
    };

    angular.module("appModule")
            .service("LoanRequestService", service);
}());