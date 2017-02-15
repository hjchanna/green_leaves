(function () {
    angular.module("appModule")
            .service("sidePanelService", function (systemConfig,$http) {

        //client ledger history
        this.loadClientLedgerHistory = function (client, asAtDate) {
            var url = systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/client-ledger/" + client + "/" + new Date(asAtDate).toISOString();
            return $http.get(url);
        };

        //client history
        this.clientHistory = function (date, client) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/find-client-account-transaction-history/" + date + "/" + client);
        };
        
        //get monthly and daily summry details
        this.getGreenLeavesReceiveSummryDetails = function (asAtDate, client) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-advance/find-green-leaves-receive-summry/" + new Date(asAtDate).toISOString() + "/" + client);
        };
            });
}());