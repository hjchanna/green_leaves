(function () {
    var service = function ($http, systemConfig) {
        //master data

        this.loadBranch = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/branch");
        };

        this.loadRoutes = function (branch) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/routes/" + branch);
        };

        this.loadRouteOfficers = function (branch) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/route-officers/" + branch);
        };

        this.loadRouteHelpers = function (branch) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/route-helpers/" + branch);
        };

        this.loadVehicles = function (branch) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/vehicles/" + branch);
        };

        //green leaves weigh
        this.loadWeigh = function (branch, number, type) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/" + branch + "/" + number + "/" + type);
        };

        this.loadPendingWeigh = function (type) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/find-pending-weigh/" + type);
        };

        this.approveWeigh = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/approve-weigh/" + indexNo);
        };

//        this.findByBranchAndRouteAndDate = function (branch, route, date) {
//            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/find-weight-by/" + branch + "/" + route + "/" + date);
//        };

        this.saveWeigh = function (weigh) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/save-weigh", weigh);
        };
        this.insertDetail = function (detail, weighIndexNo) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/insert-detail/" + weighIndexNo, detail);
        };

        this.deleteDetail = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/delete-detail/" + indexNo);
        };

        //delete green leaves weigh and green leaves weigh details
        this.deleteGreenLeavesWeigh = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/delete-green-leaves-weigh/" + indexNo);
        };
    };

    angular.module("appModule")
            .service("GreenLeavesWeighService", service);
}());