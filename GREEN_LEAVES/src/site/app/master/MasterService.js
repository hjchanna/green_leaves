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
        
        
        this.totalItems = function (controller, keyword) {
            var url = systemConfig.apiUrl + "/api/v1/master/" + controller + "/total-items";

            if (keyword) {
                url = url + "/" + keyword;
            }

            return $http.get(url);
        };
    };
    angular.module("appModule")
            .service("MasterService", service);

}());