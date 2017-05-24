(function () {
    angular.module("appModule")
            .service("OfficerTeaLedgerSidePanelService", function (systemConfig, $http) {

                //officer tea ledger history
                this.loadOfficerTeaLedgerHistory = function (officer, asAtDate) {
                    var url = systemConfig.apiUrl + "/api/v1/green-leaves/tea-issue/officer-tea-ledger-summary/" + officer + "/" + new Date(asAtDate).toISOString();
                    return $http.get(url);
                };
            });
}());