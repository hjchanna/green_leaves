(function () {
    var factory = function (GreenLeavesDashBoardService, GreenLeavesDashBoardModelFactory, $filter, $q) {
        function GreenLeavesDashBoardModel() {
            this.constructor();
        }

        //prototype functions
        GreenLeavesDashBoardModel.prototype = {
            //data
            data: {},
            totalSummry: {},
            //route information
            routes: [],
            //branch information
            branchs: [],
            //route officer information
            routeOfficers: [],
            //route helper information
            routeHelpers: [],
            //vehicle information 
            vehicles: [],
            greenLeavesWeigh: [],
//            greenLeavesReceiveList: [],
            greenLeavesBulkWeighList: [],
//            greenLeavesSupplierWeighList: [],
            constructor: function () {
                var that = this;
                that.data = GreenLeavesDashBoardModelFactory.newData();
                that.totalSummry = GreenLeavesDashBoardModelFactory.totalSummry();
                that.greenLeavesWeigh = GreenLeavesDashBoardModelFactory.greenLeavesWeigh();

                GreenLeavesDashBoardService.loadRoutes()
                        .success(function (data) {
                            that.routes = data;
                        });
                GreenLeavesDashBoardService.loadRouteOfficers()
                        .success(function (data) {
                            that.routeOfficers = data;
                        });

                GreenLeavesDashBoardService.loadRouteHelpers()
                        .success(function (data) {
                            that.routeHelpers = data;
                        });

                GreenLeavesDashBoardService.loadVehicles()
                        .success(function (data) {
                            that.vehicles = data;
                        });

            },
            greenLeavesAllSummry: function () {
                var defer = $q.defer();

                var that = this;
                var toDate = $filter('date')(that.data.toDate, 'yyyy-MM-dd');
                var fromDate = $filter('date')(that.data.fromDate, 'yyyy-MM-dd');
                var route = that.data.route;
                var routeOfficer = that.data.routeOfficer;
                var routeHelper = that.data.routeHelper;
                var vehicle = that.data.vehicle;

                GreenLeavesDashBoardService.getGreenLeavesSummary(fromDate, toDate, route, routeOfficer, routeHelper, vehicle)
                        .success(function (data) {
                            that.totalSummry = {};
                            angular.extend(that.totalSummry, data);
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                            that.greenLeavesBulkWeighList = [];
                        });

                return defer.promise;
            },
            getGreenLeavesWeighSummry: function (type) {
                var defer = $q.defer();

                var that = this;
                var toDate = $filter('date')(that.data.toDate, 'yyyy-MM-dd');
                var fromDate = $filter('date')(that.data.fromDate, 'yyyy-MM-dd');
                var route = that.data.route;
                var routeOfficer = that.data.routeOfficer;
                var routeHelper = that.data.routeHelper;
                var vehicle = that.data.vehicle;

                GreenLeavesDashBoardService.getGreenLeavesWeighSummry(fromDate, toDate, route, routeOfficer, routeHelper, vehicle, type)
                        .success(function (data) {
                            that.greenLeavesBulkWeighList = data;
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });

                return defer.promise;
            },
            //
            greenLeaveWeighDetailsByIndexNo: function (indexNo) {
                console.log(indexNo);
                var defer = $q.defer();
                var that = this;
                GreenLeavesDashBoardService.greenLeaveWeighDetailsByIndexNo(indexNo)
                        .success(function (data) {
                            that.greenLeavesWeigh = data;
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });

                return defer.promise;
            },
            //return label for route
            routeLabel: function (indexNo) {
                var label;
                angular.forEach(this.routes, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return label;
            },
            //return label for route officer
            routeOfficerLabel: function (indexNo) {
                var label;
                angular.forEach(this.routeOfficers, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return label;
            },
            //return label for route helpers
            routeHelperLabel: function (indexNo) {
                var label;
                angular.forEach(this.routeHelpers, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return label;
            },
            //return label for route officer
            vehicleLabel: function (indexNo) {
                var label;
                angular.forEach(this.vehicles, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.indexNo + "-" + value.vehicleNo;
                        return;
                    }
                });
                return label;
            }
        };
        return GreenLeavesDashBoardModel;
    };

    angular.module("appModule")
            .factory("GreenLeavesDashBoardModel", factory);
}());