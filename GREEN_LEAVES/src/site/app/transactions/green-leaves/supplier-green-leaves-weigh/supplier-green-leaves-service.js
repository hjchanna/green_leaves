(function () {
    var service = function ($http, systemConfig) {
        //master data
        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/routes");
        };

        this.loadClient = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/clients");
        };

        this.loadBranch = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/branch");
        };

        //pending weight
        this.loadWeighByBranchAndType = function (branch, type) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/find-by-branch/" + branch + "/" + type);
        };
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

        this.confirmWeigh = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/confirm-detail/" + indexNo);
        };

        this.findByBranchAndDateAndClient = function (branch, date, client) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-weigh/find-weight/" + branch + "/" + date + "/" + client);
        };
    };

    angular.module("appModule")
            .service("SupplierGreenLeavesWeighService", service);
}());