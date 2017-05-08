(function () {
    angular.module("appModule")
            .factory("ClientLoanCheckModelFactory", function () {
                var factory = {};
                factory.newData = function () {
                    var data = {
                        "client": null,
                        "date": null
                    };
                    return data;
                };
                factory.newTempData = function () {
                    var tempData = {
                        "expectedLoanDate": null,
                        "loanStartDate": null,
                        "interestRate": null,
                        "installmentCount": null,
                        "installmentAmount": null,
                        "panaltyRate": null
                    };
                    return tempData;
                };
                return factory;
            });
}());