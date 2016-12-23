(function () {
    angular.module("appModule")
            .factory("GreenLeavesPaymentModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "branch": null,
                        "transactiion": 0,
                        "date": null,
                        "cashier": null,
                        "voucher": null,
                        "amount": 0,
                        "cashAmount": 0,
                        "chequeAmount": 0,
                        "status": null

                    };
                    return data;
                };

                factory.newTempData = function () {
                    var tempData = {
                        "indexNo": null,
                        "branch": null,
                        "transactiion": 0,
                        "date": null,
                        "cashier": null,
                        "voucher": null,
                        "amount": 200,
                        "cashAmount": 0,
                        "chequeAmount": 100,
                        "status": null
                    };

                    return tempData;
                };

                return factory;
            });
}());
