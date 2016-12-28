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
                    amount: 0,
                    //client details
                    clients: [],
                    //employee details
                    employees: [],
                    //voucher details
                    vouchers: [],
                    //cheque books detail
                    chequeBooks: [],
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
                                that.amount = value.amount;
                                that.data.voucher = indexNo;

                            }
                        });
                    },
                    //
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
                    //save voucher payment
                    save: function () {
                        console.log(this.data);

                        var data = JSON.stringify(this.data);
                        GreenLeavesPaymentService.saveVoucherPayment(data)
                                .success(function (data) {
                                    optionPane.successMessage("added successfully.");
                                })
                                .error(function (data) {
                                });

                    }
                };

                return GreenLeavesPaymentModel;
            });
}());
