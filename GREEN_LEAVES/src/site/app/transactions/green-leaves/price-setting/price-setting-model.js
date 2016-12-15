(function () {
    var factory = function (PriceSettingService, PriceSettingModelFactory, $q) {
        function PriceSettingModel() {
            this.constructor();
        }

        //prototype functions
        PriceSettingModel.prototype = {
            //data
            data: {},
            tempData: {},
            //route information
            routes: [],
            totalLeaves: null,
            constructor: function () {
                var that = this;

                that.data = PriceSettingModelFactory.newData();
                that.tempData = PriceSettingModelFactory.newTempData();

                //load default values
                PriceSettingService.loadRoutes()
                        .success(function (data) {
                            that.routes = data;
                        });
            },
            loadData: function () {
                var defer = $q.defer();

                if (this.data.year && this.data.month) {
                    var that = this;
                    PriceSettingService.loadPriceSetting(this.data.year, this.data.month)
                            .success(function (data) {
                                that.data = PriceSettingModelFactory.newData();
                                angular.extend(that.data, data);
                                defer.resolve();
                            })
                            .error(function () {
                                that.data = PriceSettingModelFactory.newData();
                                defer.reject();
                            });
                } else {
                    defer.reject();
                }

                return defer.promise;
            },
            loadTotalLeaves: function () {
                if (this.data.year && this.data.month) {
                    var that = this;
                    PriceSettingService.loadGreenLeavesTotal(that.data.year, that.data.month)
                            .success(function (data) {
                                that.totalLeaves = data;
                                console.log(data);
                            })
                            .error(function () {
                                that.totalLeaves = null;
                            });
                } else {
                    this.totalLeaves = null;
                }
            },
            saveData: function () {
                var defer = $q.defer();
                var that = this;
                PriceSettingService.savePriceSetting(this.data)
                        .success(function (data) {
                            that.clearData();
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });

                return defer.promise;
            },
            clearData: function () {
                this.data = PriceSettingModelFactory.newData();
                this.tempData = PriceSettingModelFactory.newTempData();
            },
            selectDetail: function (indexNo) {
                var that = this;
                angular.forEach(this.data.priceSettingDetails, function (value) {
                    if (value.indexNo === indexNo) {
                        that.tempData = value;
                        return;
                    }
                });
            },
            getTotalLeaves: function (route) {
                var total = [0, 0, 0];
                if (this.totalLeaves) {
                    angular.forEach(this.totalLeaves, function (value) {
                        if (value[0] === route) {
                            total = value;
                        }
                    });
                }
                return total;
            },
            getRoute: function (indexNo) {
                var route = null;
                angular.forEach(this.routes, function (value) {
                    if (value.indexNo === indexNo) {
                        route = value;
                        return;
                    }
                });
                return route;
            }
        };
        return PriceSettingModel;
    };

    angular.module("appModule")
            .factory("PriceSettingModel", factory);
}());