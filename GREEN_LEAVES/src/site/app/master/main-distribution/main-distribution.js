(function () {
    angular.module("mainDistributionModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);
    //http factory
    angular.module("mainDistributionModule")
            .factory("mainDistributionFactory", function ($http, systemConfig) {
                var factory = {};

                //load sub category
                factory.loadMainDistribution = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/main-distribution";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save sub category
                factory.saveMainDistribution = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/main-distribution/save-main-distribution";
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
                factory.deleteMainDistribution = function (indexNo, callback,errorcallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/main-distribution/delete-main-distribution/" + indexNo;
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
    angular.module("mainDistributionModule")
            .controller("mainDistributionController", function ($scope, mainDistributionFactory, Notification, $timeout) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.model.mainDistribution = [];

                //----------- data models ------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.mainDistribution = {};
                };
                
                //----------validate funtion-------------
                $scope.validateInput = function () {
                    if ($scope.model.mainDistribution.name !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //----------http funtion----------------
                $scope.http.deleteMainDistribution = function (IndexNo, index) {
                    mainDistributionFactory.deleteMainDistribution(IndexNo
                    , function () {
                        Notification.success(IndexNo+" - " +"Sub Category Delete Successfully");
                        $scope.model.mainDistributionList.splice(index, 1);
                    }
                    ,function (data){
                        Notification.error(data);
                    });
                };

                //save function 
                $scope.http.saveMainDistribution = function () {
                    var detail = $scope.model.mainDistribution;
                    var detailJSON = JSON.stringify(detail);
                    mainDistributionFactory.saveMainDistribution(
                            detailJSON,
                            function (data) {
                                $scope.model.mainDistributionList.push(data);
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
                        $scope.http.saveMainDistribution();
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
                    $scope.model.mainDistribution = subDistribution;
                    $scope.model.mainDistributionList.splice(index, 1);
                    $scope.ui.focus();
                };

                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //rest model data
                    $scope.model.reset();

                    //lord subCategory
                    mainDistributionFactory.loadMainDistribution(function (data) {
                        $scope.model.mainDistributionList = data;
                    });
                };

                $scope.ui.init();
            });            
}());

