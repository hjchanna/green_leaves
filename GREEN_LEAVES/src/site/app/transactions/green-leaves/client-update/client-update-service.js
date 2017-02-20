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
        this.loadRemarkGreenLeavesReceive = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-update/green-leaves-receive");
        };
        this.loadRemarkGreenLeavesWeigh = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/client-update/green-leaves-weigh");
        };
    };

    angular.module("appModule")
            .service("ClientUpdateService", service);
}());