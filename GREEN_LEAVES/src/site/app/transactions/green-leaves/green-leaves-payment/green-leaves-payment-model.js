(function () {
    angular.module("appModule")
            .factory("GreenLeavesPaymentModel", function (GreenLeavesPaymentModelFactory, GreenLeavesPaymentService, optionPane, ModalDialog) {
                function GreenLeavesPaymentModel() {
                    this.constructor();
                }


                GreenLeavesPaymentModel.prototype = {
                    data: {},
                    tempData: {},
                    //voucher summary
                    voucherSummary: 0,
                    //cash summary
                    cashSummary: [],
                    cash: {
                        "amount": 0,
                        "count": 0
                    },
                    //client details
                    clients: [],
                    //employee details
                    employees: [],
                    //voucher details
                    vouchers: [],
                    //cheque books detail
                    chequeBooks: [],
                    //transation types details
                    transactionTypes: [],
                    //cash balance details
                    values: [5000, 2000, 1000, 500, 100, 50, 20, 10, 5, 2, 1],
                    //seleted
                    //selected: null,
                    //select all vouchers
                    selectAllVoucher: null,
                    constructor: function () {
                        var that = this;
                        that.data = GreenLeavesPaymentModelFactory.newData();
                        that.tempData = GreenLeavesPaymentModelFactory.newTempData();
                        GreenLeavesPaymentService.loadClients()
                                .success(function (data) {
                                    that.clients = data;
                                });
                        GreenLeavesPaymentService.loadEmployees()
                                .success(function (data) {
                                    that.employees = data;
                                });
                        GreenLeavesPaymentService.vouchers()
                                .success(function (data) {
                                    that.vouchers = data;
                                });
                        GreenLeavesPaymentService.loadChequeBook()
                                .success(function (data) {
                                    that.chequeBooks = data;
                                });
                        GreenLeavesPaymentService.loadTransactionType()
                                .success(function (data) {
                                    that.transactionTypes = data;
                                });
                    },
                    // clear data
                    clear: function () {
                        var that = this;
                        that.tempData = GreenLeavesPaymentModelFactory.newTempData();
                    },
                    //get client
                    getClient: function (indexNo) {
                        var client = null;
                        angular.forEach(this.clients, function (value) {
                            if (value.indexNo === indexNo) {
                                client = value;
                                return;
                            }
                        });
                        return client;
                    },
                    //select  voucher
                    selectDetail: function (indexNo) {
                        var that = this;
                        angular.forEach(this.vouchers, function (value) {
                            if (value.indexNo === indexNo) {
                                that.voucherSummary = value.amount;
                                that.amount = value.amount;
                                that.data.voucher = indexNo;
                                that.getCashSummary();
                            }
                        });
                    },
                    getCashSummary: function () {
                        var that = this;
                        that.cashSummary = [];

                        angular.forEach(that.values, function (value) {
                            var count = Math.floor(that.amount / value);
                            that.amount = that.amount - (count * value);

                            that.cash.amount = value;
                            that.cash.count = count;

                            if (that.cash.count !== 0) {
                                that.cashSummary.push(that.cash);
                                that.cash = {};
                            }
                        });
                    },
                    getRequestTotal: function (indexNo) {
                        var total = 0.0;
                        angular.forEach(this.vouchers, function (valueData) {
                            if (indexNo ? valueData.indexNo === indexNo : true) {
                                total = total + valueData.amount;
                            }
                        });
                        return total;
                    },
                    //insert cheque details
                    insertChequeDetails: function () {
                        var that = this;
                        that.data.companyCheque.push(that.tempData);
                    },
                    //select all vouchers
                    selectAll: function () {
                        var that = this;

                        if (that.selectAllVoucher) {
                            that.selectAllVoucher = true;
                        } else {
                            that.selectAllVoucher = false;
                        }
                        angular.forEach(this.vouchers, function (voucher) {
                            voucher.selected = that.selectAllVoucher;
                        });
                    },
                    //select one
                    selectOne: function (voucher) {
                        console.log(voucher.indexNo);
                    },
                    //save voucher payment
                    save: function () {
                        var that = this;

                        var data = JSON.stringify(this.data);
                        GreenLeavesPaymentService.saveVoucherPayment(data)
                                .success(function (data) {
                                    optionPane.successMessage("added successfully.");
                                    that.vouchers.splice(data.indexNo, 1);
                                    that.cashSummary = [];
                                })
                                .error(function (data) {
                                });
                    }
                };
                return GreenLeavesPaymentModel;
            });
}());
