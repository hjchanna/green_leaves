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
                        if ($scope.model.vehicle.vehicleNo) {
                            if ($scope.model.vehicle.engineNo) {
                                if ($scope.model.vehicle.chassisNo) {
                                    if ($scope.model.vehicle.vehicleOwner) {
                                        if ($scope.model.vehicle.driver) {
                                            $scope.http.saveVehicle();
                                        } else {
                                            Notification.error("Select a Default Driver to Save");
                                            $timeout(function () {
                                                document.querySelectorAll("#driverName")[0].focus();
                                            }, 10);
                                        }
                                    } else {
                                        Notification.error("Select a Vehicle Owner to Save");
                                        $timeout(function () {
                                            document.querySelectorAll("#ownerName")[0].focus();
                                        }, 10);
                                    }
                                } else {
                                    Notification.error("Insert Chassis Number to Save");
                                    $timeout(function () {
                                        document.querySelectorAll("#chassisNo")[0].focus();
                                    }, 10);
                                }
                            } else {
                                Notification.error("Insert Engine Number to Save");
                                $timeout(function () {
                                    document.querySelectorAll("#engineNo")[0].focus();
                                }, 10);
                            }
                        } else {
                            Notification.error("Insert Vehicle Number to Save");
                            $timeout(function () {
                                document.querySelectorAll("#vehicleNo")[0].focus();
                            }, 10);
                        }
                    } else if ($scope.ui.tabPane === 1) {// is second tab selected 
                        if ($scope.model.vehicleOwner.name) {
                            if ($scope.model.vehicleOwner.nicNumber) {
                                if ($scope.model.vehicleOwner.mobileNumber) {
                                    $scope.http.insertVehicleOwner();
                                } else {
                                    Notification.error('Insert Mobile Number to Save ');
                                    $timeout(function () {
                                            document.querySelectorAll("#mobileNo")[0].focus();
                                        }, 10);
                                }
                            } else {
                                Notification.error('Insert NIC Number to Save  ');
                                $timeout(function () {
                                            document.querySelectorAll("#nicNumber")[0].focus();
                                        }, 10);
                            }
                        } else {
                            Notification.error('Insert Owner Name to Save');
                            $timeout(function () {
                                            document.querySelectorAll("#name")[0].focus();
                                        }, 10);
                        }
                    }
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
                                Notification.success('success !');
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
                        $scope.model.vehicleOwnerList = data;
                    });

                };

                $scope.ui.init();
            });
}());





