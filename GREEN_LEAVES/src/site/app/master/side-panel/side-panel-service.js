(function (){
    var service=function ($http, systemConfig){
       
        //master data
        this.loadTeaIssue = function (){
            return $http.get(systemConfig.apiUrl + "/api/green-leaves/master/tea-issue");
        };
        this.loadRouteOfficers = function () {
            return $http.get(systemConfig.apiUrl + "/api/v1/green-leaves/master/route-officers");
        };
        
    };
     angular.module("sidePanelModule")
            .service("SidePanelService", service);
}());