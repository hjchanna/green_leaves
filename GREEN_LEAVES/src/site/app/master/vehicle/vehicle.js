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
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/employee";

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
            .controller("vehicleController", function ($scope, vehicleFactory, Notification, $filter, $timeout) {
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

                $scope.$watch('model.vehicleOwner.nicNumber', function (val) {
                    $scope.model.vehicleOwner.nicNumber = $filter('uppercase')(val);
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
                        if ($scope.ui.checkValidateVehicle()) {
                            if ($scope.ui.validateInfo.isError) {
                                Notification.error($scope.ui.validateInfo.errorMessage);
                                $scope.ui.forcusFunction($scope.ui.validateInfo.textForcus);
                                $scope.ui.validateInfo = {};
                            } else {
                                $scope.http.saveVehicle();
                            }
                        }

                    } else if ($scope.ui.tabPane === 1) {// is second tab selected 
                        if ($scope.ui.checkValidateVehicleOwner()) {
                            if ($scope.ui.validateInfo.isError) {
                                Notification.error($scope.ui.validateInfo.errorMessage);
                                $scope.ui.forcusFunction($scope.ui.validateInfo.textForcus);
                                $scope.ui.validateInfo = {};
                            }else{
                                $scope.http.insertVehicleOwner();
                            }
                        }
                    }
                };
                $scope.ui.forcusFunction = function (textId) {
                    $timeout(function () {
                        document.querySelectorAll(textId)[0].focus();
                    }, 10);
                };
                $scope.ui.checkValidateVehicle = function () {
                    $scope.ui.validateInfo = {};
                    if (!$scope.model.vehicle.vehicleNo) {
                        $scope.ui.validateInfo.isError = true;
                        $scope.ui.validateInfo.errorMessage = "Insert Vehicle No to Save";
                        $scope.ui.validateInfo.textForcus = "#vehicleNo";
                        return $scope.ui.validateInfo;
                    }
                    if (!$scope.model.vehicle.engineNo) {
                        $scope.ui.validateInfo.isError = true;
                        $scope.ui.validateInfo.errorMessage = "Insert Engine No to Save";
                        $scope.ui.validateInfo.textForcus = "#engineNo";
                        return $scope.ui.validateInfo;
                    }
                    if (!$scope.model.vehicle.chassisNo) {
                        $scope.ui.validateInfo.isError = true;
                        $scope.ui.validateInfo.errorMessage = "Insert chassis No to Save";
                        $scope.ui.validateInfo.textForcus = "#chassisNo";
                        return $scope.ui.validateInfo;
                    }
                    if (!$scope.model.vehicle.make) {
                        $scope.ui.validateInfo.isError = true;
                        $scope.ui.validateInfo.errorMessage = "Insert chassis make to Save";
                        $scope.ui.validateInfo.textForcus = "#make";
                        return $scope.ui.validateInfo;
                    }
                    if (!$scope.model.vehicle.model) {
                        $scope.ui.validateInfo.isError = true;
                        $scope.ui.validateInfo.errorMessage = "Insert Model to Save";
                        $scope.ui.validateInfo.textForcus = "#model";
                        return $scope.ui.validateInfo;
                    }
                    if (!$scope.model.vehicle.type) {
                        $scope.ui.validateInfo.isError = true;
                        $scope.ui.validateInfo.errorMessage = "Insert Type to Save";
                        $scope.ui.validateInfo.textForcus = "#type";
                        return $scope.ui.validateInfo;
                    }
                    if (!$scope.model.vehicle.vehicleOwner) {
                        $scope.ui.validateInfo.isError = true;
                        $scope.ui.validateInfo.errorMessage = "Select Vehicle Owner to Save";
                        $scope.ui.validateInfo.textForcus = "#ownerName";
                        return $scope.ui.validateInfo;
                    }
                    if (!$scope.model.vehicle.driver) {
                        $scope.ui.validateInfo.isError = true;
                        $scope.ui.validateInfo.errorMessage = "Select Driver to Save";
                        $scope.ui.validateInfo.textForcus = "#driverName";
                        return $scope.ui.validateInfo;
                    }
                    $scope.ui.validateInfo.isError = false;
                    return $scope.ui.validateInfo;
                };
                $scope.ui.checkValidateVehicleOwner=function(){
                    $scope.ui.validateInfo = {};
                    if (!$scope.model.vehicleOwner.name) {
                        $scope.ui.validateInfo.isError = true;
                        $scope.ui.validateInfo.errorMessage = "Insert Vehicle Owner Name to Save";
                        $scope.ui.validateInfo.textForcus = "#name";
                        return $scope.ui.validateInfo;
                    }
                    if (!$scope.model.vehicleOwner.nicNumber) {
                        $scope.ui.validateInfo.isError = true;
                        $scope.ui.validateInfo.errorMessage = "Insert NIC No to Save";
                        $scope.ui.validateInfo.textForcus = "#nicNumber";
                        return $scope.ui.validateInfo;
                    }
                    if (!$scope.model.vehicleOwner.mobileNumber) {
                        $scope.ui.validateInfo.isError = true;
                        $scope.ui.validateInfo.errorMessage = "Insert Mobile No to Save";
                        $scope.ui.validateInfo.textForcus = "#mobileNo";
                        return $scope.ui.validateInfo;
                    }
                    $scope.ui.validateInfo.isError = false;
                    return $scope.ui.validateInfo;
                };
                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    if ($scope.ui.tabPane === 0) {// is first tab selected 
                        $timeout(function () {
                            document.querySelectorAll("#vehicleNo")[0].focus();
                        }, 10);

                    } else if ($scope.ui.tabPane === 1) {// is second tab selected  
                        $timeout(function () {
                            document.querySelectorAll("#name")[0].focus();
                        }, 10);

                    }

                    $timeout(function () {
                        document.querySelectorAll("#name")[0].focus();
                    }, 10);
                };
//               tab pane
                $scope.ui.setTabPane = function (int) {
                    $scope.ui.tabPane = int;
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
                                Notification.success(data.vehicleNo + " Vehicle Successfully Saved");
                                $scope.model.vehicles.push(data);
                                $scope.ui.validateInfo = {};
                                $scope.model.makeList.push($scope.model.vehicle.make);
                                $scope.model.modelList.push($scope.model.vehicle.model);
                                $scope.model.typeList.push($scope.model.vehicle.type);

                                $scope.model.vehicle = {};
                                $timeout(function () {
                                    document.querySelectorAll("#vehicleNo")[0].focus();
                                }, 10);
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
                                Notification.success(data.indexNo+'success !');
                                $scope.model.vehicleOwnerList.push(data);
                                $scope.model.vehicleOwner = {};
                                $timeout(function () {
                                    document.querySelectorAll("#name")[0].focus();
                                }, 10);

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
                            $timeout(function () {
                                document.querySelectorAll("#name")[0].focus();
                            }, 10);
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
                            $scope.model.makeList.push($scope.model.vehicles[i].make);
                            $scope.model.modelList.push($scope.model.vehicles[i].model);
                            $scope.model.typeList.push($scope.model.vehicles[i].type);
                        }
                    });
                    //load Vehicle Owners
                    vehicleFactory.loadEmployeeList(function (data) {
                        //driver filter
                        $scope.model.drivers = data;
                    });
                    //load vehicle Owner
                    vehicleFactory.loadVehicleOwner(function (data) {
                        console.log(data);
                        $scope.model.vehicleOwnerList = data;
                    });

                };

                $scope.ui.init();
            });
}());





