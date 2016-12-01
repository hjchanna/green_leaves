(function () {
    var service = function ($http, systemConfig) {
        //master data
        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/routes");
        };

        this.loadBranch = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/branch");
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

        //green leaves weigh
        this.loadWeigh = function (branch, number) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/" + branch + "/" + number);
        };

        this.saveWeigh = function (weigh) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/save-weigh", weigh);
        };

        this.insertDetail = function (detail, weighIndexNo) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/insert-detail/" + weighIndexNo, detail);
        };

        this.deleteDetail = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/delete-detail/" + indexNo);
        };
    };

    angular.module("appModule")
            .service("GreenLeavesWeighService", service);
}());