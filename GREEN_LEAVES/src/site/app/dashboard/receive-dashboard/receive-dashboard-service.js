(function () {
    var service = function ($http, systemConfig) {
        //master data
        this.loadBranch = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/branch");
        };

        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/routes");
        };

        this.loadRouteOfficers = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/route-officers");
        };

        this.loadRouteHelpers = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/route-helpers");
        };

        this.loadVehicles = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/vehicles");
        };

        //green leaves  all summry
        this.getGreenWeighLeavesSummary = function (model) {
            return $http.post(systemConfig.apiUrl + "/api/dash-board/find-green-leave-weigh-dashboard-summary", model);
        };
//
//        //green leaves bulk weigh
//        this.getGreenLeavesWeighSummry = function (fromDate, toDate, route, routeOfficer, routeHelper, vehicle, type) {
//            return $http.get(systemConfig.apiUrl + "/api/dash-board/find-green-leave-dashboard-weigh/" + fromDate + "/" + toDate + "/" + route + "/" + routeOfficer + "/" + routeHelper + "/" + vehicle + "/" + type);
//        };
//
//        //green leaves bulk weigh details
//        this.greenLeaveWeighDetailsByIndexNo = function (indexNo) {
//            return $http.get(systemConfig.apiUrl + "/api/dash-board/find-green-leave-dashboard-weigh-by-indexNo/" + indexNo);
//        };
    };

    angular.module("appModule")
            .service("GreenLeavesDashBoardService", service);
}());