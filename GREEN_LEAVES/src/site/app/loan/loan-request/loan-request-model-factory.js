(function () {
    angular.module("appModule")
            .factory("LoanRequestModelFactory", function () {
                var factory = {};
                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "date": null,
                        "transaction": 0,
                        "number": null,
                        "status": null,
                        loanRequestDetails: [
//                            {
//                                "indexNo": null,
//                                "remark": null,
//                                "client": null,
//                                "expectedLoanDate": null,
//                                "amount": null,
//                                "interestRate": 0.0,
//                                "installmentCount": 0,
//                                "installmentAmount": 0.0,
//                                "panaltyRate": 0.0
//                            }
                        ]
                    };
                    return data;
                };
                factory.newTempData = function () {
                    var tempData = {
                        "indexNo": null,
                        "remark": null,
                        "client": null,
                        "expectedLoanDate": null,
                        "amount": null
                    };
                    return tempData;
                };
                return factory;
            });
}());