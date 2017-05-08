(function () {
    "use strict";

    var service = function ($http, systemConfig) {
        this.findReceiveDetails = function (fromDate, toDate) {
            return $http.get(systemConfig.apiUrl + "//api/v1/dashboard/receive-dashboard-2/receive-summary/" + new Date(fromDate).toISOString() + "/" + new Date(toDate).toISOString());
        };
        
        this.loadRoutes = function(){
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/routes");
        };
    };

    angular.module("appModule")
            .service("ReceiveDashboard2Service", service);
}());