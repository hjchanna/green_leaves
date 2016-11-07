(function () {
    angular.module("subCategoryModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("subCategoryModule")
            .factory("subCategoryFactory", function ($http, systemConfig) {
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
                factory.loadSubCategory = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/subCategory";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                return factory
            });


    angular.module("subCategoryModule")
            .controller("subCategoryController", function ($scope, subCategoryFactory, Notification) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                $scope.model.categoryList = [
                    {indexNo: 1, name: "Category 01"},
                    {indexNo: 2, name: "Category 02"},
                    {indexNo: 3, name: "Category 03"},
                    {indexNo: 4, name: "Category 04"}
                ];
                
                $scope.model.subCategoryList=[
                    {indexNo: 1, name:"Sub Category name", category:"Category 01"},
                    {indexNo: 2, name:"Sub Category name", category:"Category 02"},
                    {indexNo: 3, name:"Sub Category name", category:"Category 03"}
                ];

                $scope.ui.init = function () {

                    $scope.ui.mode = "IDEAL";
                    //load category
                    subCategoryFactory.loadCategory(function (data) {
                        console.log(data);
                    });
                    subCategoryFactory.loadSubCategory(function (data) {
                        console.log(data);
                    });


                };
                $scope.ui.init();

            });
}());

