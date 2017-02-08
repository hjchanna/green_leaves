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
                    correctSaveCount: 0,
                    incorrectSaveCount: 0,
                    //cash summary
                    cashSummary: [],
                    cashSummaryTemp: [],
                    eachValues: {}, //cash:2000,cheque:4000,Bank:7600
                    cash: {
                        "amount": 0,
                        "count": 0
                    },
                    //client details
                    clients: [],
                    //employee details
                    employees: [],
                    //route details
                    routes: [],
                    //voucher details
                    vouchers: [],
                    selectedVouchersIndex: [],
                    //voucher details
                    paymentTypes: ["CASH", "CHEQUE", "BANK"],
                    //cheque books detail
                    chequeBooks: [],
                    //transation types details
                    transactionTypes: [],
                    //cash balance details
                    values: [5000, 1000, 500, 100, 50, 20, 10, 5, 1],
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
                        GreenLeavesPaymentService.loadRoutes()
                                .success(function (data) {
                                    that.routes = data;
                                });
                        GreenLeavesPaymentService.loadEmployees()
                                .success(function (data) {
                                    that.employees = data;
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
                        return client.indexNo + '-' + client.name;
                    },
                    //get client
                    getRoute: function (indexNo) {
                        var route = null;
                        var routeIndexNo = null;

                        angular.forEach(this.clients, function (value) {
                            if (value.indexNo === indexNo) {
                                routeIndexNo = value.route;
                                return;
                            }
                        });
                        angular.forEach(this.routes, function (value) {
                            if (value.indexNo === routeIndexNo) {
                                route = value.indexNo + '-' + value.name;
                                return;
                            }
                        });
                        return route;
                    },
                    getVoucher: function () {
                        var that = this;
                        GreenLeavesPaymentService.vouchers()
                                .success(function (data) {
                                    that.vouchers = data;
                                });
                    },
                    //select  voucher
                    selectDetail: function () {
                        var that = this;
                        that.cashSummary = null;
                        angular.forEach(this.vouchers, function (voucher) {
                            if (voucher.chxSelected === true) {
                                that.voucherSummary = voucher.amount;
                                that.amount = voucher.amount;
                                if (voucher.paymentType === "CASH") {
                                    that.getCashSummary();
                                }
                            }
                        });
                    },
                    getCashSummary: function () {
                        var that = this;
                        that.cashSummaryTemp = [];
                        angular.forEach(that.values, function (value) {
                            var count = Math.floor(that.amount / value);
                            that.amount = that.amount - (count * value);

                            that.cash.amount = value;
                            that.cash.count = count;

                            angular.forEach(that.cashSummary, function (cashSummary) {
                                if (cashSummary.amount === value) {
                                    that.cash.count += cashSummary.count;
                                }
                            });

                            if (that.cash.count !== 0) {
                                that.cashSummaryTemp.push(that.cash);
                            }

                            that.cash = {};
                        });
//                        that.cashSummaryTemp=[];
                        that.cashSummary = that.cashSummaryTemp;
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
                    selectAll: function (search, val) {
                        var that = this;

                        angular.forEach(that.vouchers, function (voucher) {
                            var isSelect = 2;
                            if (search.transactionType) {
                                if (voucher.transactionType === search.transactionType.indexNo) {
                                    isSelect = 1;
                                } else {
                                    isSelect = 0;
                                }
                            }
                            if (search.paymentType) {
                                if (isSelect !== 0) {
                                    if (voucher.paymentType === search.paymentType) {
                                        isSelect = 1;
                                    } else {
                                        isSelect = 0;
                                    }
                                }
                            }
                            if (search.client) {
                                if (isSelect !== 0) {
                                    if (voucher.client === search.client.indexNo) {
                                        isSelect = 1;
                                    } else {
                                        isSelect = 0;
                                    }
                                }
                            }
                            if (isSelect === 1) {
                                voucher.chxSelected = val;
                            }
                        });
                        that.getEachValue();
                        that.selectDetail();
                    },
                    //save voucher payment
                    save: function () {
                        var that = this;
                       
                        angular.forEach(that.vouchers, function (voucher) {
                            if (voucher.chxSelected) {
                                var data = JSON.stringify(voucher);
                                GreenLeavesPaymentService.saveVoucherPayment(data)
                                        .success(function (data) {
                                            this.correctSaveCount+1;
                                        })
                                        .error(function (data) {
                                            this.incorrectSaveCount+1;
                                        });
                            }
                        });
                        
                        optionPane.successMessage( "Save Successfully");
                        that.cashSummary= [];
                        GreenLeavesPaymentService.vouchers()
                                .success(function (data) {
                                    that.vouchers = data;
                                });
                                that.getEachValue();
                                
                    },
                    //save voucher payment
                    updateVoucher: function (voucher) {
                        var that = this;
                        var data = JSON.stringify(voucher);
                        GreenLeavesPaymentService.updateVoucher(data)
                                .success(function (data) {
                                    optionPane.successMessage(data + " Update successfully.");
                                    that.tempData = {};
                                })
                                .error(function (data) {
                                    optionPane.successMessage("Update fail.");

                                });
                    },
                    getEachValue: function () {
                        var that = this;
                        that.eachValues = {
                            cash: 0.00,
                            cheque: 0.00,
                            bank: 0.00,
                            total: 0.00
                        };
                        angular.forEach(that.vouchers, function (voucher) {
                            if (voucher.chxSelected) {
                                if ("CASH" === voucher.paymentType) {
                                    that.eachValues.cash += voucher.amount;
                                }
                                if ("CHEQUE" === voucher.paymentType) {
                                    that.eachValues.cheque += voucher.amount;
                                }
                                if ("BANK" === voucher.paymentType) {
                                    that.eachValues.bank += voucher.amount;
                                }
                                that.eachValues.total += voucher.amount;
                            }
                        });
                    }
                    
                };
                return GreenLeavesPaymentModel;
            });
}());
