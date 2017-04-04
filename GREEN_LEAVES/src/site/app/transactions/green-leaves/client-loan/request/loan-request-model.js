(function () {
    var factory = function ($q, ClientLoanRequestService, LoanRequestModelFactory, optionPane) {
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
                
                console.log('client start');
                ClientLoanRequestService.loadClients()
                        .success(function (data) {
                            console.log('client');
                            console.log(data);
                            that.clients = data;
                        });
            },
            //clear all data
            clear: function () {
                this.data = LoanRequestModelFactory.newData();
                this.tempData = LoanRequestModelFactory.newTempData();
            },
            load: function () {
                var number = this.data.number;
                var that = this;
                var defer = $q.defer();
                ClientLoanRequestService.loadLoan(number)
                        .success(function (data) {
                            that.data = {};
                            angular.extend(that.data, data);
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            //table added
            insertLoanRequest: function () {
                var defer = $q.defer();
                var that = this;
                if (that.tempData.client
                        && that.tempData.amount > 0
                        && that.tempData.installmentCount > 0) {
                    that.data.loanRequestDetails.unshift(that.tempData);
                    that.tempData = LoanRequestModelFactory.newTempData();
                    defer.resolve();
                } else {
                    defer.reject();
                }

                return defer.promise;
            },
            //save requests
            saveRequest: function () {
                var data = JSON.stringify(this.data);
                ClientLoanRequestService.saveLoanRequest(data)
                        .success(function (data) {
                            optionPane.successMessage("Loan request saved successfully.");
                        })
                        .error(function (data) {
                            optionPane.dangerMessage("Loan request save failed.");
                        });

            },
            //return label for client
            clientLabel: function (indexNo) {
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