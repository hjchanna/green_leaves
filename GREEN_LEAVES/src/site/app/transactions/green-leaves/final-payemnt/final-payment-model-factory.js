(function () {
    angular.module("appModule")
            .factory("FinalPaymentModelFactory", function () {
                var factory = {};
                factory.newData = function () {
                    var data = {

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