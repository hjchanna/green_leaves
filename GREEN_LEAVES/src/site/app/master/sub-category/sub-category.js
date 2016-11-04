(function () {
    angular.module("subCategoryModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("subCategoryModule")
            .factory("subCategoryModule", function ($http, systemConfig) {
                var factory = {};
                //load
                factory.loadCategory = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/category";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

            });

    angular.module("subCategoryModule")
            .controller("subCategoryController", function ($scope, categoryFactory, Notification) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                $scope.model.category = [];

                $scope.ui.init = function () {
                    //load category
                    categoryFactory.loadCategory(function (data) {
                        console.log(data);
                    });
                };

                $scope.ui.init();

            });
}());

