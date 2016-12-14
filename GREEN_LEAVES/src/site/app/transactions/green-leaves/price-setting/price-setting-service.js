(function () {
    var service = function ($http, systemConfig) {

        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/routes");
        };

        this.loadGreenLeavesTotal = function (year, month) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/price-setting/get-green-leaves-total/" + year + "/" + month);
        };
                                                                                                                                                                
        this.loadPriceSetting = function(year, month){
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/price-setting/" + year + "/" + month);
        };
        
        this.savePriceSetting = function(data){
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/price-setting/save-price-setting", data);
        };
    };

    angular.module("appModule")
            .service("PriceSettingService", service);
}());