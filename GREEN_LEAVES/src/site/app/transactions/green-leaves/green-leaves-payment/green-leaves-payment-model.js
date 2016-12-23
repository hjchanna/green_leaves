(function () {
    angular.module("appModule")
            .factory("GreenLeavesPaymentModel", function (GreenLeavesPaymentModelFactory, GreenLeavesPaymentService, optionPane) {
                function GreenLeavesPaymentModel() {
                    this.constructor();
                }


                GreenLeavesPaymentModel.prototype = {
                    data: {},
                    tempData: {},
                    //voucher summary
                    amount :0,
                    //client details
                    clients: [],
                    //voucher details
                    vouchers: [],
                    constructor: function () {
                        var that = this;

                        that.data = GreenLeavesPaymentModelFactory.newData();
                        that.tempData = GreenLeavesPaymentModelFactory.newTempData();

                        GreenLeavesPaymentService.loadClients()
                                .success(function (data) {
                                    that.clients = data;
                                });
                        GreenLeavesPaymentService.vouchers()
                                .success(function (data) {
                                    that.vouchers = data;
                                });
                    },
                    clear: function () {

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
                                that.tempData.voucher = indexNo;

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
                    //save voucher payment
                    save: function () {
                        console.log(this.tempData);

                        var data = JSON.stringify(this.tempData);
//
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
