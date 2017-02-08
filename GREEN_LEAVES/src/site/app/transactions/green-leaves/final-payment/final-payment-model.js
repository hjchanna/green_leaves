(function () {
    var factory = function (FinalPaymentService, FinalPaymentModelFactory, $q) {
        function FinalPaymentModel() {
            this.constructor();
        }

        //prototype functions
        FinalPaymentModel.prototype = {
            constructor: function () {
                var that = this;

                that.data = FinalPaymentModelFactory.newData();
            },

            loadClientLedgerSummary: function () {
                var that = this;
                var defer = $q.defer();

                FinalPaymentService.loadClientLedgerSummary(that.data.year, that.data.month)
                        .success(function (data) {
                            console.log(data);
                            that.data.clientLedgerSummary = data;
                            defer.resolve();
                        })
                        .error(function () {
                            console.log("data");
                            that.data.clientLedgerSummary = [];
                            defer.reject();
                        });


                return defer.promise;
            }
        };

        return FinalPaymentModel;
    };

    angular.module("appModule")
            .factory("FinalPaymentModel", factory);
}());


