(function () {
    angular.module("appModule")
            .service("sidePanelService", function (systemConfig, $http) {

                //client ledger history
                this.loadClientLedgerHistory = function (client, asAtDate) {
                    var url = systemConfig.apiUrl + "/api/v1/green-leaves/common/client-ledger/" + client + "/" + new Date(asAtDate).toISOString();
                    return $http.get(url);
                };

                //get monthly and daily summry details
                this.loadReceiveSummary = function (asAtDate, client) {
                    return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/common/receive-summary/" + new Date(asAtDate).toISOString() + "/" + client);
                };
            });
}());