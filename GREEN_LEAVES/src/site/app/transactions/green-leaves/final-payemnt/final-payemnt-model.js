(function () {
    var factory = function (FinalPaymentService, FinalPaymentModelFactory, $q, $filter) {
        function FinalPaymentModel() {
            this.constructor();
        }
        //prototype functions
        FinalPaymentModel.prototype = {
            //weigh data
            data: {},
            //temp input
            tempData: {},
            accountTtransactionList: [],
            accountTtransactionDetailList: [],
            transactionTypeList: [],
            supplierList: [],
            employeeList: [],
            year: "",
            month: "",
            totalCredit: 0.0,
            totalDebit: 0.0,
            totalCreditDetail: 0.0,
            totalDebitDetail: 0.0,
            transactionType: {},
            constructor: function () {
                var that = this;
                that.data = FinalPaymentModelFactory.newData();
                that.tempData = FinalPaymentModelFactory.newTempData();
                //load default values
                //default date set
                that.year = $filter('date')(new Date(), 'yyyy');
                that.month = $filter('date')(new Date(), 'MM');

                FinalPaymentService.getAccountTransactionFromDate(that.year, that.month)
                        .success(function (data) {
                            that.accountTtransactionList = data;
                            that.getTotalDebitCredit();
                        })
                        .error(function () {
                            console.log("Error");

                        });
                FinalPaymentService.getAllTransactionType()
                        .success(function (data) {
                            that.transactionTypeList = data;

                        })
                        .error(function () {
                            console.log("getAllTransactionType error");

                        });
                FinalPaymentService.getAllClient()
                        .success(function (data) {
                            that.supplierList = data;

                        })
                        .error(function () {
                            console.log("getAllClient error");

                        });
                FinalPaymentService.getAllEmployee()
                        .success(function (data) {
                            that.employeeList = data;

                        })
                        .error(function () {
                            console.log("getAllEmployee error");

                        });

            },
            getAccountTransactionList: function (year, month) {
                var that = this;
                FinalPaymentService.getAccountTransactionFromDate(year, month)
                        .success(function (data) {
                            that.accountTtransactionList = data;
                            that.getTotalDebitCredit();
                        })
                        .error(function () {
                            console.log("getAccountTransactionList Error");

                        });
            },
            getAccountTransactionDetailList: function (year, month, typeId) {
                var that = this;
                FinalPaymentService.getAccountTransactionsFromDescription(year, month, typeId)
                        .success(function (data) {
                            that.accountTtransactionDetailList = data;
                            that.getTotalDebitCreditForDetail();
                        })
                        .error(function () {
                            console.log("getAccountTransactionDetailList Error");

                        });
            },
            getTransactionType: function (indexNo) {
                var label;
                angular.forEach(this.transactionTypeList, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.name;
                        return;
                    }
                });
                return label;
            },
            getTotalDebitCredit: function () {
                var that = this;
                that.totalCredit = 0.0;
                that.totalDebit = 0.0;
                angular.forEach(that.accountTtransactionList, function (value) {

                    that.totalCredit += value.creditAmount;
                    that.totalDebit += value.debitAmount;
                });
            },
            getClient: function (index) {
                var that = this;
                var label;
                angular.forEach(that.supplierList, function (value) {
                    if (index === value.indexNo) {
                        label = "Supplier - " + value.clientNumber + " - " + value.name;
                        return;
                    }
                });
                console.log(label);
                return label;
            },
            getEmployee: function (index) {
                var that = this;
                var label;
                angular.forEach(that.employeeList, function (value) {
                    if (index === value.indexNo) {
                        label = "Employee - " + value.indexNo + " - " + value.name;
                        return;
                    }
                });
                console.log(label);
                return label;
            },
            getTotalDebitCreditForDetail: function () {
                var that = this;
                that.totalCreditDetail = 0.0;
                that.totalDebitDetail = 0.0;
                angular.forEach(that.accountTtransactionDetailList, function (value) {

                    that.totalCreditDetail += value.creditAmount;
                    that.totalDebitDetail += value.debitAmount;
                });
            },
            getCoins: function (debit, credit) {

                var balance = debit - credit;
                var coins = balance % 10;
                return coins;
            }
        };

        return FinalPaymentModel;
    };

    angular.module("appModule")
            .factory("FinalPaymentModel", factory);
}());


