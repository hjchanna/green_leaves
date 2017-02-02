(function () {
    angular.module("categoryModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("categoryModule")
            .factory("categoryFactory", function ($http, systemConfig) {
                var factory = {};

                //load category
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
                factory.deleteCategory = function (indexNo, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/category/delete-category/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorcallback) {
                                    errorcallback(data);
                                }
                            });
                };

                return factory;

            });

    angular.module("categoryModule")
            .controller("categoryController", function ($scope, categoryFactory, Notification, $timeout) {
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
                    if ($scope.model.category.name) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //<-----------------http funtiion------------------->
                $scope.http.saveCategory = function () {
                    var detail = $scope.model.category;
                    var detailJSON = JSON.stringify(detail);
                    //save
                    categoryFactory.saveCategory(
                            detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + "Save Successfully");
                                $scope.model.categorys.push(data);
                                $scope.model.reset();
                                $scope.ui.focus();
                            },
                            function (data) {
                                $scope.ui.focus();
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.http.deleteCategory = function (indexNo, index) {
                    categoryFactory.deleteCategory(indexNo
                            , function () {
                                $scope.model.categorys.splice(index, 1);
                                Notification.success(indexNo + " - " + "Delete Successfully");
                            },
                            function (data) {
                                Notification.error(data);
                            });
                };

                //<-----------------ui funtiion--------------------->
                //save function
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveCategory();
                    } else {
                        Notification.error("please input category name");
                        $scope.ui.focus();
                    }
                };

                //focus
                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#category")[0].focus();
                    }, 10);
                };

                //key event
                $scope.ui.keyEvent = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.save();
                    }
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.ui.focus();
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