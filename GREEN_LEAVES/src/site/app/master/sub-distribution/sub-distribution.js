(function () {
    angular.module("subDistributionModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);
    //http factory
    angular.module("subDistributionModule")
            .factory("subDistributionFactory", function ($http, systemConfig) {
                var factory = {};

                //load sub subDistribution
                factory.loadSubDistribution = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/sub-distribution";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save sub category
                factory.saveSubDistribution = function (summary, callback, errorCallback) {
                        var url = systemConfig.apiUrl + "/api/green-leaves/master/sub-distribution/save-sub-distribution";
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
                factory.deleteSubDistribution = function (indexNo, callback,errorcallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/sub-distribution/delete-sub-distribution/" + indexNo;
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
    angular.module("subDistributionModule")
            .controller("subDistributionController", function ($scope, subDistributionFactory, Notification, $timeout) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.model.subDistribution = [];

                //----------- data models ------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.subDistribution = {
                        "indexNo": null,
                        "name": null
                    };
                };

                //----------validate funtion-------------
                $scope.validateInput = function () {
                    if ($scope.model.subDistribution.name !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //----------http funtion----------------
                $scope.http.deleteSubDistribution = function (IndexNo, index) {
                    subDistributionFactory.deleteSubDistribution(IndexNo
                    , function () {
                        Notification.success(IndexNo+" - " +"Sub Category Delete Successfully");
                        $scope.model.subDistributionList.splice(index, 1);
                    }
                    ,function (data){
                        Notification.error(data);
                    });
                };

                //save function 
                $scope.http.saveSubDistribution  = function () {
                    var detail = $scope.model.subDistribution;
                    var detailJSON = JSON.stringify(detail);
                    subDistributionFactory.saveSubDistribution(
                            detailJSON,
                            function (data) {
                                $scope.model.subDistributionList.push(data);
                                Notification.success(data.indexNo+" - " +"Sub Distribution Save Successfully");
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
                        $scope.http.saveSubDistribution();
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
                        document.querySelectorAll("#sub-distribution")[0].focus();
                    }, 10);
                };

                //key event
                $scope.ui.keyEvent = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.save();
                    }
                };

                //edit function 
                $scope.ui.edit = function (subDistribution, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.subDistribution = subDistribution;
                    $scope.model.subDistributionList.splice(index, 1);
                    $scope.ui.focus();
                };

                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //rest model data
                    $scope.model.reset();

                    //lord subCategory
                    subDistributionFactory.loadSubDistribution(function (data) {
                        $scope.model.subDistributionList = data;
                    });
                };

                $scope.ui.init();
            });
}());

