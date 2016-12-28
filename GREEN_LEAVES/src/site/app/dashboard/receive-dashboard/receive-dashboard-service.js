(function () {
    var service = function ($http, systemConfig) {

        this.getGreenLeavesSummary = function (fromDate, toDate, route, routeOfficer, routeHelper, vehicle) {
            return $http.get(systemConfig.apiUrl + "/api/dash-board/find-green-leave-dashboard-summary/" + fromDate + "/" + toDate + "/" + route + "/" + routeOfficer + "/" + routeHelper + "/" + vehicle);
        };
    };

    angular.module("appModule")
            .service("GreenLeavesDashBoardService", service);
}());