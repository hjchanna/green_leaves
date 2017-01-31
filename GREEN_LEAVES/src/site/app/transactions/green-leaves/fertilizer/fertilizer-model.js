(function () {
    angular.module("appModule")
            .factory("FertilizerModel", function (FertilizerModelService, FertilizerModelFactory, $q, $filter) {
                function FertilizerModel() {
                    this.constructor();
                }

                FertilizerModel.prototype = {
                    data: {},
                    tempData: {},
                    //client information
                    clients: [],
                    //products information
                    products: [],
                    constructor: function () {
                        var that = this;
                        that.data = FertilizerModelFactory.newData();
                        that.tempData = FertilizerModelFactory.newTempData();
                        FertilizerModelService.loadProducts()
                                .success(function (data) {
                                    that.products = data;
                                });
                        FertilizerModelService.loadClients()
                                .success(function (data) {
                                    that.clients = data;
                                });
                    },
                    clear: function () {
                        var that = this;
                        that.data = FertilizerModelFactory.newData();
                        that.tempData = FertilizerModelFactory.newTempData();
                        this.itemTotal();
                    },
                    load: function () {
                        var that = this;
                        var defer = $q.defer();
                        var date = $filter('date')(this.data.date, 'yyyy-MM-dd');
                        var number = this.data.number;
                        FertilizerModelService.loadFertilizer(date, number)
                                .success(function (data) {
                                    that.data = {};
                                    angular.extend(that.data, data);
                                    that.itemTotal();
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.itemTotal();
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    addDetail: function () {
                        var defer = $q.defer();
                        if (parseInt(this.tempData.product + this.tempData.qty) > 0) {
                            this.data.tfertilizerDetailList.push(this.tempData);
                            this.tempData = FertilizerModelFactory.newTempData();
                            this.itemTotal();
                            defer.resolve();
                        } else {
                            this.itemTotal();
                            defer.reject();
                        }

                        return defer.promise;
                    },
                    editDetail: function (index) {
                        var fertilizer = this.data.tfertilizerDetailList[index];
                        this.data.tfertilizerDetailList.splice(index, 1);
                        this.tempData = fertilizer;
                        this.itemTotal();
                    },
                    deleteDetail: function (index) {
                        this.data.tfertilizerDetailList.splice(index, 1);
                        this.itemTotal();
                    },
                    itemTotal: function () {
                        var itemTotal = 0.0;
                        var that = this;
                            //ONE-MONTH
                        if (that.data.month === "ONE-MONTH") {
                            angular.forEach(this.data.tfertilizerDetailList, function (value) {
                                itemTotal += parseFloat(that.product(value.product).salePrice * value.qty);
                            });
                            return itemTotal;
                            //TWO-MONTH
                        } else {
                            angular.forEach(this.data.tfertilizerDetailList, function (value) {
                                itemTotal += parseFloat(that.product(value.product).salePrice * value.qty);
                            });
                            return itemTotal / 2;
                        }
                    },
                    save: function () {
                        console.log(this.data);
                        var that = this;
                        var defer = $q.defer();
                        if (this.data.date && this.data.client && this.data.month) {
                            FertilizerModelService.saveFertilizer(JSON.stringify(this.data))
                                    .success(function (data) {
                                        defer.resolve();
                                        that.clear();
                                    })
                                    .error(function (data) {
                                        that.clear();
                                        defer.reject();
                                    });
                        }
                        return defer.promise;
                    },
                    deleteFertilizer: function () {
                        var that = this;
                        FertilizerModelService.deleteFertilizer(this.data.indexNo)
                                .success(function () {
                                    that.clear();
                                });
                    },
                    client: function (indexNo) {
                        var client;
                        angular.forEach(this.clients, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                client = value;
                                return;
                            }
                        });
                        return client;
                    },
                    product: function (indexNo) {
                        var client;
                        angular.forEach(this.products, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                client = value;
                                return;
                            }
                        });
                        return client;
                    },
                    clientLabel: function (indexNo) {
                        var label;
                        angular.forEach(this.clients, function (value) {
                            if (value.indexNo === indexNo) {
                                label = value.clientNumber + "-" + value.name;
                                return;
                            }
                        });
                        return label;
                    },
                    productLabel: function (indexNo) {
                        var label;
                        angular.forEach(this.products, function (value) {
                            if (value.indexNo === indexNo) {
                                label = value.indexNo + "-" + value.name;
                                return;
                            }
                        });
                        return label;
                    },
                    //find customer by client number
                    searchClientByClientNo: function (clientNumber) {
                        var client;
                        angular.forEach(this.clients, function (value) {
                            if (value.clientNumber === parseInt(clientNumber)) {
                                client = value;
                                return;
                            }
                        });
                        return client;
                    }
                };
                return FertilizerModel;
            });
}());