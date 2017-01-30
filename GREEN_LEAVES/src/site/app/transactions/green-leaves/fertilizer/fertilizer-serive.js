(function () {
    var service = function ($http, systemConfig) {
        //master data
        this.loadProducts = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/product");
        };
        //master data
        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/clients");
        };
    };

    angular.module("appModule")
            .service("FertilizerService", service);
}());