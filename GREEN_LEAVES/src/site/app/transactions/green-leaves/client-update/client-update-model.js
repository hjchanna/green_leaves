(function () {
    var factory = function (ClientUpdateService) {
        function ClientUpdateWeighModel() {
            this.constructor();
        }

        //prototype functions
        ClientUpdateWeighModel.prototype = {
            //route information
            routes: [],
            //branch information
            branchs: [],
            //vehicle information
            vehicles: [],
            //green leaves receive
            greenLeavesReceiveList: [],
            //supplier green leaves weigh
            greenLeavesWeighList: [],
            //constructor
            constructor: function () {
                var that = this;
                //load default values
                ClientUpdateService.loadRoutes()
                        .success(function (data) {
                            that.routes = data;
                        });
                ClientUpdateService.loadBranch()
                        .success(function (data) {
                            that.branchs = data;
                        });
                ClientUpdateService.loadRemarkGreenLeavesReceive()
                        .success(function (data) {
                            that.greenLeavesReceiveList = data;
                            console.log(that.greenLeavesReceiveList);
                        });
                ClientUpdateService.loadRemarkGreenLeavesWeigh()
                        .success(function (data) {
                            that.greenLeavesWeighList = data;
                            console.log(that.greenLeavesWeighList);
                        });
            },
            //clear all data
            clear: function () {
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
            branchLable: function (indexNo) {
                var lable;
                angular.forEach(this.branchs, function (value) {
                    if (value.indexNo === indexNo) {
                        lable = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return lable;
            },
            route: function (indexNo) {
                var route;
                angular.forEach(this.routes, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        route = value;
                        return;
                    }
                });
                return route;
            }
        };

        return ClientUpdateWeighModel;
    };

    angular.module("appModule")
            .factory("ClientUpdateWeighModel", factory);
}());