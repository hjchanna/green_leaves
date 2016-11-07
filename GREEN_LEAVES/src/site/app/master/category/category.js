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
                factory.saveCategory = function (category, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/category/save-category";


                    $http.post(url, category)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorCallback) {
                                    errorCallback(data);
                                }
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
                $scope.totalItems = 64;
                $scope.currentPage = 4;

                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };

                $scope.pageChanged = function () {
                    $log.log('Page changed to: ' + $scope.currentPage);
                };
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;




                //------------------ model functions ---------------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.category = {
                        "indexNo": null,
                        "name": null
                    };
                };

                //------------------ validation functions ------------------------------
                $scope.validateInput = function () {
                    if ($scope.model.category !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };


                //<-----------------http funtiion------------------->
                $scope.http.saveCategory = function () {
                    if ($scope.validateInput()) {
                        var detail = $scope.model.category;
                        var detailJSON = JSON.stringify(detail);
                        //save
                        categoryFactory.saveCategory(
                                detailJSON,
                                function (data) {
                                    Notification.success("success");
                                    $scope.model.categorys.push(data);
                                    $scope.model.reset();
                                },
                                function (data) {
                                    Notification.error(data.message);
                                }
                        );
                    } else {
                        Notification.error("please input category name");
                    }
                };

                $scope.http.deleteCategory = function (indexNo, index) {
                    categoryFactory.deleteCategory(indexNo, function () {
                        Notification.success("delete success");
                        $scope.model.categorys.splice(index, 1);
                    });
                };

                //<-----------------ui funtiion--------------------->
                //save function
                $scope.ui.save = function () {
                    $scope.http.saveCategory();
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                };

                //edit funtion
                $scope.ui.edit = function (categorys, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.category = categorys;
                    $scope.model.categorys.splice(index, 1);
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