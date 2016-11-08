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

                //load sub category
                factory.loadSubCategory = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/sub-category";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save sub category
                factory.saveSubCategory = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/sub-category/save-subCategory";
                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorCallback) {
                                    errorCallback(data);
                                }
                            });
                };

                //delete funtion
                factory.deleteSubCategory = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/sub-category/delete-sub-category/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                return factory;
            });

    //Controller
    angular.module("subCategoryModule")
            .controller("subCategoryController", function ($scope, subCategoryFactory, Notification) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.model.categoryList = [];
                $scope.model.subCategoryList = [];


                //----------- data models ------------------
                //reset model


                $scope.model.reset = function () {
                    $scope.model.data = {
                        "indexNo": null,
                        "name": null,
                        "category": null
                    };
                };

                //----------validate funtion-------------

                $scope.validateInput = function () {
                    if ($scope.model.data !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };


                //----------http funtion----------------

                $scope.http.deleteSubCategory = function (IndexNo, index) {
                    subCategoryFactory.deleteSubCategory(IndexNo, function () {
                        Notification.success("delete success");
                        $scope.model.subCategoryList.splice(index, 1);
                    });
                };



                //save function 
                $scope.ui.save = function () {

                };

                //delete funtion
//                $scope.ui.delete = function (indexNo, index) {
//                    $scope.model.subCategoryList.splice(index, 1);
//                    Notification.success("Delete Success");
//                    subCategoryFactory.deleteSubCategory(indexNo, function () {
//
//                    });
//                };

                //save function 


                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                };

                //edit function 
                $scope.ui.edit = function (subCategory, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.subCategoryList = subCategory;
                    $scope.model.subCategory.splice(index, 1);
                };


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //rest model data
                    $scope.model.reset();
                    //load category
//                    subCategoryFactory.loadCategory(function (data) {
//                        $scope.model.categoryList = data;
//                    });
                    //lord subCategory
                    subCategoryFactory.loadSubCategory(function (data) {
                        $scope.model.subCategoryList = data;
                    });
                };
                $scope.ui.init();
            });
}());

