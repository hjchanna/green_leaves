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

        //load by number
        this.loadWeigh = function (number, type) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-supplier-weigh/" + number + "/" + type);
        };

        //pending weight
        this.loadPendingWeigh = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-supplier-weigh/find-pending-weigh");
        };

        this.saveWeigh = function (weigh) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-supplier-weigh/save-weigh", weigh);
        };
        
        this.insertDetail = function (detail, weighIndexNo) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-supplier-weigh/insert-detail/" + weighIndexNo, detail);
        };

        this.deleteDetail = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-supplier-weigh/delete-detail/" + indexNo);
        };

        this.confirmWeigh = function (indexNo) {
            console.log(indexNo);
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-supplier-weigh/approve-weigh/" + indexNo);
        };

        //delete green leaves weigh and green leaves weigh details
        this.deleteGreenLeavesWeigh = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/v1/green-leaves/green-leaves-supplier-weigh/delete-green-leaves-weigh/" + indexNo);
        };
    };

    angular.module("appModule")
            .service("SupplierGreenLeavesWeighService", service);
}());