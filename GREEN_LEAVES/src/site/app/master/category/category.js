(function () {
    angular.module("categoryModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("categoryModule")
            .factory("categoryFactory", function ($http, systemConfig) {
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

                //save or update
                factory.saveCategory = function (category, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/category/save-category";


                    $http.post(url, category)
                            .success(function (data, status, headers) {
                                callback(data);
                                console.log(data + "save category");
                            })
                            .error(function (data, status, headers) {

                            });

                };

                //delete
                factory.deleteCategory = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/category/delete-category/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;

            });

    angular.module("categoryModule")
            .controller("categoryController", function ($scope, categoryFactory, Notification) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.model.category = [];



                //------------------ model functions ---------------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.category = {
                        "indexNo": null,
                        "name": null
                    };
                };


                //<-----------------http funtiion------------------->
                $scope.http.saveCategory = function () {
                    var detailJSON = JSON.stringify($scope.model.category);
                    console.log(detailJSON);

                    categoryFactory.saveCategory(detailJSON, function (data) {
                        if (data !== "") {
                            $scope.model.category.indexNo = data;
                            $scope.model.categorys.push($scope.model.category);
                            Notification.success("Successfully Added");

                            $scope.ui.mode = "IDEAL";
                            $scope.model.category = {};
                        } else {
                            Notification.error("Category is already exists");
                        }
                    });
                };

                $scope.http.deleteCategory = function (indexNo) {
                    categoryFactory.deleteCategory(indexNo, function () {
                        var id = -1;
                        for (var i = 0; i < $scope.model.categorys.length; i++) {
                            if ($scope.model.categorys[i].indexNo === indexNo) {
                                id = i;
                            }
                        }

                        $scope.model.categorys.splice(id, 1);
                    });
                };

                //<-----------------ui funtiion--------------------->
                //save function
                $scope.ui.save = function () {
                    $scope.http.saveCategory();

                };

                //delete function
                $scope.ui.delete = function (indexNo) {
                    $scope.http.deleteCategory(indexNo);

                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                };

                //edit funtion
                $scope.ui.edit = function (categorys) {
                     $scope.ui.mode = "EDIT";
                     
                    $scope.model.category = categorys;
                    for (var i = 0; $scope.model.categorys.length; i++) {
                        if ($scope.model.categorys[i].indexNo === $scope.model.category.indexNo) {
                            $scope.model.categorys.splice(i, 1);
                        }
                    }
                };


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    $scope.model.reset();
                    //load category
                    categoryFactory.loadCategory(function (data) {
                        $scope.model.categorys = data;
                    });
                };

                $scope.ui.init();

            });
}());