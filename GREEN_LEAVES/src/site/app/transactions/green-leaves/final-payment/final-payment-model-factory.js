(function () {
    angular.module("appModule")
            .factory("FinalPaymentModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    return {
                        "year": null,
                        "month": null,
                        "clientLedgerSummary": []
                    };
                };

                return factory;
            });
}());