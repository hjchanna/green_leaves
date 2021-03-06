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

        this.loadClient = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/clients");
        };

        //green leaves bulk and supplier weigh summry
        this.getGreenWeighLeavesSummary = function (model) {
            return $http.post(systemConfig.apiUrl + "/api/dash-board/find-green-leave-weigh-dashboard-summary", model);
        };

        //get green leaves receive summry
        this.getGreenReceiveLeavesSummary = function (model) {
            return $http.post(systemConfig.apiUrl + "/api/dash-board/find-green-leave-receive-dashboard-summary", model);
        };

        //get monthly and daily summry details
        this.getDailyAndMonthlySummryDetails = function (date) {
            return $http.get(systemConfig.apiUrl + "/api/dash-board/summry-details/" + date);
        };

    };

    angular.module("appModule")
            .service("GreenLeavesDashBoardService", service);
}());