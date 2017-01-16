(function () {
    angular.module("appModule")
            .factory("FinalPaymentModelFactory", function () {
                var factory = {};
                factory.newData = function () {
                    var data = {
                        indexNo:null,
                        branch:null,
                        date:null,
                        transaction:null,
                        transactionType:null,
                        client:null,
                        employee:null,
                        description:null,
                        account:null,
                        debitAmount:null,
                        creditAmount:null
                    };
                    return data;

                };

                factory.newTempData = function () {
                    var tempData = {

                    };

                    return tempData;
                };

                return factory;
            });
}());