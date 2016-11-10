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
                factory.loadVehicleOwner = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/vehicle-owner";
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

                //Vehicle owner
                //load Vehicle Owner
                factory.loadVehicleOwner = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/vehicle-owner";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                //load Vehicle Owner
                factory.loadEmployeeList = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/employees";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };



                //insert Vehicle Owner
                factory.insertVehicleOwner = function (detail, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/vehicle-owner/save";
                    $http.post(url, detail)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorcallback) {
                                    errorcallback(data);
                                }
                            });
                };

                //delete VehicleOwner
                factory.deleteVehicleOwner = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/vehicle-owner/delete-vehicle-owner/" + indexNo;
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
            .controller("vehicleController", function ($scope, vehicleFactory, Notification, $filter) {
                //data models 
                $scope.model = {};
                $scope.model.vehicleOwners = [];
                $scope.model.drivers = [];
                $scope.model.branch = 2;

                $scope.model.vehicleOwner = {};
                $scope.model.vehicleOwnerList = [];
                $scope.model.makeList = [];
                $scope.model.modelList = [];
                $scope.model.typeList = [];

                //ui models
                $scope.ui = {};
                $scope.ui.tabPane = null;

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                //convert lovercase to uppercase 
                $scope.$watch('model.vehicle.vehicleNo', function (val) {
                    $scope.model.vehicle.vehicleNo = $filter('uppercase')(val);
                }, true);



                //------------------ model functions ---------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.vehicle = {
                        "indexNo": null,
                        "vehicleNo": null,
                        "engineNo": null,
                        "chassisNo": null,
                        "make": null,
                        "model": null,
                        "type": null,
                        "vehicleOwner": null,
                        "driver": null
                    };
                };

                //-------------------ui funtiion---------------------
                //save function
                $scope.ui.save = function () {
                    if ($scope.ui.tabPane === 0) {// is first tab selected 
                        if ($scope.model.vehicle.vehicleOwner) {
                            if ($scope.model.vehicle.driver) {
                                if ($scope.model.vehicle.vehicleNo && $scope.model.vehicle.chassisNo && $scope.model.vehicle.engineNo) {
                                    $scope.http.saveVehicle();
                                } else {
                                    Notification.error("please input vehicle Details to Save");
                                }
                            } else {
                                Notification.error("Select Default Driver to Save");
                            }
                        } else {
                            Notification.error("Select Vehicle Owner to Save");
                        }
                    } else if ($scope.ui.tabPane === 1) {// is second tab selected 
                        if ($scope.model.vehicleOwner.name && $scope.model.vehicleOwner.nicNumber && $scope.model.vehicleOwner.mobileNumber) {
                            $scope.http.insertVehicleOwner();
                        } else {
                            Notification.error('No Detail to Save ');
                        }






                    }
                };


                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                };
//               tab pane
                $scope.ui.setTabPane = function (int) {
                    $scope.ui.tabPane = int;
                };
                $scope.ui.myFilter = function () {
                    return name === $scope.search || nicNumber === $scope.search;
                };
//                edit funtion

                $scope.ui.edit = function (details, index) {
                    if ($scope.ui.tabPane === 0) {// is first tab selected 
                        $scope.ui.mode = "EDIT";
                        $scope.model.vehicle = details;
                        $scope.model.vehicles.splice(index, 1);

                    } else if ($scope.ui.tabPane === 1) {// is second tab selected 
                        $scope.ui.mode = "EDIT";
                        $scope.model.vehicleOwner = details;
                        $scope.model.vehicleOwnerList.splice(index, 1);
                    }
                };




                //----------------- validation functions -----------
                $scope.validateInput = function () {
                    if ($scope.model.vehicle.vehicleNo !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };


                //-------------------http function-------------------

                $scope.http.saveVehicle = function () {
                    $scope.model.vehicle.branch = 1;//defaule branch
                    var detail = $scope.model.vehicle;
                    var detailJSON = JSON.stringify(detail);
                    console.log(detailJSON);
                    //save
                    vehicleFactory.saveVehicle(
                            detailJSON,
                            function (data) {
                                Notification.success("success");
                                $scope.model.vehicles.push(data);
                                $scope.model.vehicle = {};

                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );

                };


                $scope.http.deleteVehicle = function (indexNo, index) {
                    vehicleFactory.deleteVehicle(indexNo, function () {
                        Notification.success("delete success");
                        $scope.model.vehicles.splice(index, 1);
                    });
                };
                $scope.http.insertVehicleOwner = function () {
                    $scope.model.vehicleOwner.branch = 1;
                    var detail = $scope.model.vehicleOwner;
                    var detailJSON = JSON.stringify(detail);
                    //save detail dirrectly
                    vehicleFactory.insertVehicleOwner(
                            detailJSON,
                            function (data) {
                                Notification.success('success !');
                                $scope.model.vehicleOwnerList.push(data);
                                $scope.model.vehicleOwner = {};

                            }
                    , function (data) {
                        Notification.error(data.message);

                    }
                    );
                };
                $scope.http.deleteVehicleOwner = function (indexNo, index) {
                    if (indexNo) {
                        vehicleFactory.deleteVehicleOwner(indexNo, function () {
                            $scope.model.vehicleOwnerList.splice(index, 1);

                            Notification.error(indexNo + ' Delete Successfully');
                        });
                    }
                };



                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.tabPane = 0;
                    $scope.model.vehicle = {};
                    $scope.model.vehicles = [];


                    //load Vehicles
                    vehicleFactory.loadVehicle(function (data) {
                        $scope.model.vehicles = data;
                        for (var i = 0; i < $scope.model.vehicles.length; i++) {
//                            for (var i = 0; i < $scope.model.makeList.length; i++) {//duplicate check
//                                if ($scope.model.makeList[i] !== $scope.model.vehicles[i].make) {
                            $scope.model.makeList.push($scope.model.vehicles[i].make);
//                                }
//                            }
//                            for (var i = 0; i < $scope.model.modelList.length; i++) {//duplicate check
//                                if ($scope.model.modelList[i] !== $scope.model.vehicles[i].model) {
                            $scope.model.modelList.push($scope.model.vehicles[i].model);
//                                }
//                            }
//                            for (var i = 0; i < $scope.model.typeList.length; i++) {//duplicate check
//                                if ($scope.model.typeList[i] !== $scope.model.vehicles[i].type) {
                            $scope.model.typeList.push($scope.model.vehicles[i].type);
//                                }
//                            }

                        }
                    });
                    //load Vehicle Owners
                    vehicleFactory.loadEmployeeList(function (data) {
                        $scope.model.drivers = data;
                    });
                    //load vehicle Owner
                    vehicleFactory.loadVehicleOwner(function (data) {
                        $scope.model.vehicleOwnerList = data;
                    });

                };

                $scope.ui.init();
            });
}());





