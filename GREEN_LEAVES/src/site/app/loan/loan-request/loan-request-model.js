(function () {
    var factory = function (LoanRequestService, LoanRequestModelFactory, optionPane) {
        function LoanRequestModel() {
            this.constructor();
        }

        //prototype functions
        LoanRequestModel.prototype = {
            data: {},
            //temp input
            tempData: {},
            //client information
            clients: [],
            //constructor
            constructor: function () {
                var that = this;
                that.data = LoanRequestModelFactory.newData();
                that.tempData = LoanRequestModelFactory.newTempData();

                //load clients
                LoanRequestService.loadClients()
                        .success(function (data) {
                            that.clients = data;
                        });
            },
            //clear all data
            clear: function () {
                this.data = LoanRequestModelFactory.newData();
                this.tempData = LoanRequestModelFactory.newTempData();
            },
            //table added
            insertLoanRequest: function () {
                var that = this;

                that.data.loanRequestDetails.push(that.tempData);
                that.tempData = LoanRequestModelFactory.newTempData();
            },
            //save requests
            saveRequest: function () {
                console.log(this.data);
                var data = JSON.stringify(this.data);

                LoanRequestService.saveLoanRequest(data)
                        .success(function (data) {
                            optionPane.successMessage("Loan request saved successfully.");
                        })
                        .error(function (data) {
                            optionPane.dangerMessage("Loan request save failed.");
                        });

            },
            //return label for client
            ClientLabel: function (indexNo) {
                var label;
                angular.forEach(this.clients, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return label;
            }

        };

        return LoanRequestModel;
    };

    angular.module("appModule")
            .factory("LoanRequestModel", factory);
}());