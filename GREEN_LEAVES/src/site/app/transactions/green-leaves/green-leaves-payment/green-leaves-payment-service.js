(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/clients");
        };
        
        this.loadRoutes = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/routes");
        };
        
        this.loadChequeBook = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/chequebook");
        };
        
        this.loadEmployees = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/employees");
        };

        this.loadTransactionType = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/voucher-payment/all-transaction-type");
        };
        
        this.vouchers = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/voucher-payment");
        };

        this.saveVoucherPayment = function (data,maxTransactionNumber) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/voucher-payment/save-voucher/"+maxTransactionNumber+"/", data);
        };
        
        this.updateVoucher = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/v1/green-leaves/voucher-payment/update-voucher/", data);
        };
        
        this.maxTransactionNumber = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/voucher-payment/transaction-number");
        };


    };

    angular.module("appModule")
            .service("GreenLeavesPaymentService", service);
}());