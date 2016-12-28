(function () {
    var factory = function (GreenLeavesDashBoardService, GreenLeavesDashBoardModelFactory, $q) {
        function GreenLeavesDashBoardModel() {
            this.constructor();
        }

        //prototype functions
        GreenLeavesDashBoardModel.prototype = {
            //data
            data: {},
            //route information
            greenLeavesReceiveList: [],
            greenLeavesWeighList: [],
            greenLeavesSupplierWeighList: [],
            constructor: function () {
                var that = this;

                that.data = GreenLeavesDashBoardModelFactory.newData();
            },
            loadData: function () {
                var defer = $q.defer();

                var that = this;
                var toDate = this.data.toDate;
                var fromDate = this.data.fromDate;
                var route = this.data.route;
                var routeOfficer = this.data.routeOfficer;
                var routeHelper = this.data.routeHelper;
                var vehicle = this.data.vehicle;
                
                GreenLeavesDashBoardService.getGreenLeavesSummary(toDate, fromDate,route,routeOfficer,routeHelper,vehicle)
                        .success(function (data) {
                            that.data = {};
                            angular.extend(that.data, data);
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });

                return defer.promise;
            }
        };
        return GreenLeavesDashBoardModel;
    };

    angular.module("appModule")
            .factory("GreenLeavesDashBoardModel", factory);
}());