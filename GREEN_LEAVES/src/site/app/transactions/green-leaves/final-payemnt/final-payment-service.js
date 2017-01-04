(function () {
    var service = function ($http, systemConfig) {
        
        this.getAccountTransactionFromDate = function (year,month) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/final-payment/" + year + "/" + month);
        };
        
        this.getAccountTransactionsFromDescription = function (year,month,typeId) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/final-payment/get-account-transactions-from-description/"+year+"/"+month+"/"+typeId);
        };
        
        this.getTransactionType = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/final-payment/find-transaction-type/"+indexNo);
        };
        
        this.getAllTransactionType = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/final-payment/all-transaction-type");
        };
        
        this.getAllClient = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/final-payment/get-all-client/1");
        };
        
        this.getAllEmployee = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/final-payment/get-all-emplouee/1");
        };
    };
    
    angular.module("appModule")
            .service("FinalPaymentService",service);
}());