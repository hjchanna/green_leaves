(function () {
    var service = function ($http, systemConfig) {

        this.loadClientLedgerSummary = function (year, month) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/final-payment/summary/" + year + "/" + month);
        };
    };

    angular.module("appModule")
            .service("FinalPaymentService", service);
}());