(function () {
    var service = function ($http, systemConfig) {
        this.load = function (controller, keyword, page) {
            var url = systemConfig.apiUrl + "/api/v1/master/" + controller + "/list";

            if (keyword) {
                url = url + "/" + keyword;
            }

            if (page) {
                url = url + "/" + page;
            }

            return $http.get(url);
        };
        
        this.save = function(controller, data){
            var url = systemConfig.apiUrl + "/api/v1/master/" + controller + "/save";
            
            return $http.post(url, JSON.stringify(data));
        };


        this.totalItems = function (controller, keyword) {
            var url = systemConfig.apiUrl + "/api/v1/master/" + controller + "/total-items";

            if (keyword) {
                url = url + "/" + keyword;
            }

            return $http.get(url);
        };

        this.loadEmployees = function () {
            var url = systemConfig.apiUrl + "/api/v1/master/employee-controller/list";

            return $http.get(url);
        };

        this.loadVehicles = function () {
            var url = systemConfig.apiUrl + "/api/v1/master/vehicle-controller/list";

            return $http.get(url);
        };
        
        this.loadRoutes = function(){
            var url = systemConfig.apiUrl + "/api/v1/master/route-controller/list";

            return $http.get(url);
        };
    };
    angular.module("appModule")
            .service("MasterService", service);

}());