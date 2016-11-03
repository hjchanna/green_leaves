(function () {
//module
    angular.module("brandMasterModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);
    //controller
    angular.module("brandMasterModule")
            .factory("brandMasterFactory", function ($http, systemConfig) {
                var factory = {};
                //load brands
                factory.loadBrand = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/brand";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                //save brand
                factory.saveBrand = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/brand/save-brand";
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

                //delete 
                factory.deleteBrand = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/brand/delete-brand/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;
            });
    angular.module("brandMasterModule")
            .controller("brandMasterController", function ($scope, brandMasterFactory, Notification) {

                //data models 
                $scope.model = {};
                //ui models
                $scope.ui = {};
                //http models
                $scope.http = {};
                //contains all route objects, should be assigned at init
                $scope.model.brand = null;

                //------------------ model functions ---------------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.data = {
                        "indexNo": null,
                        "name": null
                    };
                };

                //------------------ ui functions ------------------------------
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                };

                //edit
                $scope.ui.edit = function (brand, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.data = brand;
                    $scope.model.brand.splice(index, 1);
                };

                //finish edits
                $scope.ui.finish = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.reset();
                };

                //------------------ validation functions ------------------------------
                $scope.validateInput = function () {
                    if ($scope.model.data.name !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //------------------ http functions ------------------------------
                $scope.http.saveBrand = function () {
                    if ($scope.validateInput()) {
                        var detail = $scope.model.data;
                        var detailJSON = JSON.stringify(detail);
                        //save
                        brandMasterFactory.saveBrand(
                                detailJSON,
                                function (data) {
                                    Notification.success("success");
                                    $scope.model.brand.push(data);
                                    $scope.model.reset();
                                },
                                function (data) {
                                    Notification.error(data.message);
                                }
                        );
                    } else {
                        Notification.error("please input branch name");
                    }
                };

                //delete
                $scope.http.deleteBrand = function (indexNo, index) {
                    brandMasterFactory.deleteBrand(indexNo, function () {
                        Notification.success("delete success");
                        $scope.model.brand.splice(index, 1);
                    });
                };

                //ui init function
                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //reset model
                    $scope.model.reset();

                    //load brands
                    brandMasterFactory.loadBrand(function (data) {
                        $scope.model.brand = data;
                    });
                };
                $scope.ui.init();
            });
}());