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

        this.loadClient = function () {
            console.log("cliet");
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/clients");
        };

        this.loadAdvanceRequestByNumber = function (number) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/" + number);
        };
        
        this.findByRouteAndDate = function (route, date) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/find-by/" + route + "/" + date);
        };

        this.saveAdvanceRequest = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/save", data);
        };

        this.deleteAdvancerRequest = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/delete/" + indexNo);
        };

        this.deleteAdvanceRequestDetails = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/delete-detail/" + indexNo);
        };

        //approve
        this.loadPendingRequests = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/pending-requests");
        };

        this.approveRequest = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/approve-request-detail/" + indexNo);
        };

        this.rejectRequest = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/reject-request-detail/" + indexNo);
        };

        //client history
        this.clientHistory = function (date, client) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/find-client-account-transaction-history/" + date + "/" + client);
        };
        
        //grt super total leaves and normal total leaves by branch.route,date,client for chart
        this.getGreenLeavesByBranchAndRouteAndDateAndClient = function (route,date, client) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/find-client-wise-receive-history/" +route+"/" + date + "/" + client);
        };
    };

    angular.module("appModule")
            .service("ClientAdvanceRequestService", service);
}());