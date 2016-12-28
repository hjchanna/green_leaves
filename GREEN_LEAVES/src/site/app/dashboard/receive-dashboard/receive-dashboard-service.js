(function () {
    var service = function ($http, systemConfig) {
        //master data
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
        this.getGreenLeavesSummary = function (fromDate, toDate, route, routeOfficer, routeHelper, vehicle) {
            return $http.get(systemConfig.apiUrl + "/api/dash-board/find-green-leave-dashboard-summary/" + fromDate + "/" + toDate + "/" + route + "/" + routeOfficer + "/" + routeHelper + "/" + vehicle);
        };

        //green leaves bulk weigh
        this.getGreenLeavesWeighSummry = function (fromDate, toDate, route, routeOfficer, routeHelper, vehicle, type) {
            return $http.get(systemConfig.apiUrl + "/api/dash-board/find-green-leave-dashboard-weigh/" + fromDate + "/" + toDate + "/" + route + "/" + routeOfficer + "/" + routeHelper + "/" + vehicle + "/" + type);
        };
    };

    angular.module("appModule")
            .service("GreenLeavesDashBoardService", service);
}());