(function () {
    angular.module("subCategoryModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);
    //http factory
    angular.module("subCategoryModule")
            .factory("subCategoryFactory", function ($http, systemConfig) {
                var factory = {};

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
                factory.deleteSubCategory = function (indexNo, callback,errorcallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/sub-category/delete-sub-category/" + indexNo;
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

    //Controller
    angular.module("subCategoryModule")
            .controller("subCategoryController", function ($scope, subCategoryFactory, Notification, $timeout) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.model.subCategory = [];

                //----------- data models ------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.subCategory = {
                        "indexNo": null,
                        "name": null
                    };
                };

                //----------validate funtion-------------
                $scope.validateInput = function () {
                    if ($scope.model.subCategory.name !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //----------http funtion----------------
                $scope.http.deleteSubCategory = function (IndexNo, index) {
                    subCategoryFactory.deleteSubCategory(IndexNo
                    , function () {
                        Notification.success(IndexNo+" - " +"Sub Category Delete Successfully");
                        $scope.model.subCategoryList.splice(index, 1);
                    }
                    ,function (data){
                        Notification.error(data);
                    });
                };

                //save function 
                $scope.http.saveSubCategory = function () {
                    var detail = $scope.model.subCategory;
                    var detailJSON = JSON.stringify(detail);
                    subCategoryFactory.saveSubCategory(
                            detailJSON,
                            function (data) {
                                $scope.model.subCategoryList.push(data);
                                Notification.success(data.indexNo+" - " +"Sub Category Save Successfully");
                                $scope.model.reset();
                                $scope.ui.focus();

                            },
                            function (data) {
                                Notification.error(data);
                                $scope.ui.focus();
                            }
                    );

                };

                //----------------ui funtion--------------
                //save function 
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveSubCategory();
                    } else {
                        Notification.error("Please Input Details");
                        $scope.ui.focus();
                    }
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.ui.focus();
                };

                //focus
                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#sub-category")[0].focus();
                    }, 10);
                };

                //key event
                $scope.ui.keyEvent = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.save();
                    }
                };

                //edit function 
                $scope.ui.edit = function (subCategory, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.subCategory = subCategory;
                    $scope.model.subCategoryList.splice(index, 1);
                    $scope.ui.focus();
                };

                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //rest model data
                    $scope.model.reset();

                    //lord subCategory
                    subCategoryFactory.loadSubCategory(function (data) {
                        $scope.model.subCategoryList = data;
                    });
                };

                $scope.ui.init();
            });
}());

