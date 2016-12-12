(function () {
    var service = function ($http, systemConfig) {
        
        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/routes");
        };

        this.loadAdvanceRequest = function () {
            return $http.get(systemConfig.apiUrl + "");
        };

        this.loadLoanRequest = function () {
            return $http.get(systemConfig.apiUrl + "");
        }; 
    };
    
    angular.module("appModule")
            .service("FinalPaymentService",service);
});