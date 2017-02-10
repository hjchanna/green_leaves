(function (){
    var service=function ($http, systemConfig){
       
        //master data
        this.loadTeaIssue = function (){
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/tea-issue");
        };
        this.loadRoutOfficer = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/route-officers");
        };
        this.loadRout = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/routes");
        };
        this.loadGreenLeavesQty = function () {
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/routes");
        };
        
    };
     angular.module("sidePanelModule")
            .service("SidePanelService", service);
}());