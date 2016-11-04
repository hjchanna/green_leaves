(function () {
    angular.module("vehicleModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("vehicleModule")
            .factory("vehicleFactory", function ($http, systemConfig) {
                var factory = {};

                //load
                factory.loadVehicle = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/vehicle";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save
                factory.saveVehicle = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/vehicle/save-vehicle";

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
                factory.deleteVehicle = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/vehicle/delete-vehicle/" + indexNo;

                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                return factory;
            });

    //controller
    angular.module("vehicleModule")
            .controller("vehicleController", function ($scope, vehicleFactory, Notification) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.model.category = [];


                //------------------ model functions ---------------
                //reset model
//                $scope.model.reset = function () {
//                    $scope.model.Vehicle = {
//                        "indexNo": null,
//                        "name": null
//                    };
//                };


                //----------------- validation functions -----------
                $scope.validateInput = function () {
                    if ($scope.model.category !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };


                //-------------------http function-------------------

                $scope.http.saveVehicle = function () {
                    if ($scope.validateInput()) {
                        var detail = $scope.model.vehicle;
                        var detailJSON = JSON.stringify(detail);
                        console.log(detailJSON);
                        //save
                        vehicleFactory.saveVehicle(
                                detailJSON,
                                function (data) {
                                    Notification.success("success");
                                    $scope.model.vehicles.push(data);
                                    // $scope.model.reset();
                                },
                                function (data) {
                                    Notification.error(data.message);
                                }
                        );
                    } else {
                        Notification.error("please input vehicle name");
                    }
                };


                $scope.http.deleteVehicle = function (indexNo, index) {
                    vehicleFactory.deleteVehicle(indexNo, function () {
                        Notification.success("delete success");
                        $scope.model.vehicles.splice(index, 1);
                    });
                };


                //-------------------ui funtiion---------------------
                //save function
                $scope.ui.save = function () {
                    $scope.http.saveVehicle();
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                };

//                edit funtion
                $scope.ui.edit = function (details, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.vehicle = details;
                    $scope.model.vehicles.splice(index, 1);
                };


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

//                    $scope.model.reset();
                    //load category
                    vehicleFactory.loadVehicle(function (data) {
                        $scope.model.vehicles = data;
                    });
                };

                $scope.ui.init();
            });
}());





