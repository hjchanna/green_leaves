(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.loadClientLedgerHistory = function (client, asAtDate) {
            var url = systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/client-ledger/" + client + "/" + new Date(asAtDate).toISOString();
            console.log(url);

            return $http.get(url);
        };

        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/routes");
        };

        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/clients");
        };

        this.loadAdvanceRequestByNumber = function (number) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/" + number);
        };

        this.saveAdvanceRequest = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/save", data);
        };

        this.deleteAdvancerRequest = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/delete/" + indexNo);
        };

        //approve

        this.loadPendingRequests = function () {
            console.log("AA");
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/pending-requests");
        };

        this.approveRequest = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/approve-request-detail/" + indexNo);
        };

        this.rejectRequest = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/reject-request-detail/" + indexNo);
        };
    };

    angular.module("appModule")
            .service("ClientAdvanceRequestService", service);
}());