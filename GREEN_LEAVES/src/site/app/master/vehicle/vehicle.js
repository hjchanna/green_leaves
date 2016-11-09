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
            .controller("vehicleController", function ($scope, vehicleFactory, Notification) {
                //data models 
                $scope.model = {};
                $scope.model.vehicleOwners = [];
                $scope.model.drivers = [];
                $scope.model.branch = 2;

                $scope.model.vehicleOwner = {};
                $scope.model.vehicleOwnerList = [];

                //ui models
                $scope.ui = {};
                $scope.ui.tabPane = null;

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;




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
                        if ($scope.model.vehicleOwner) {
                            $scope.http.insertVehicleOwner();
                            $scope.ui.mode = "IDEAL";
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
                                $scope.ui.mode = "IDEAL";

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

                    //load Vehicle
                    //load Vehicles
                    vehicleFactory.loadVehicle(function (data) {
                        $scope.model.vehicles = data;
                    });
                    //load Vehicle Owners
                    vehicleFactory.loadVehicleOwner(function (data) {
                        $scope.model.vehicleOwners = data;
                    });
                    //load vehicle Owner
                    vehicleFactory.loadVehicleOwner(function (data) {
                        $scope.model.vehicleOwnerList = data;
                    });
                    $scope.model.drivers = [
                        {
                            indexNo: 1,
                            branch: 1,
                            name: "kamal eranga",
                            type: "DRIVER",
                            nic_number: "8737359799V",
                            mobile_number: "0777727374"

                        },
                        {
                            indexNo: 2,
                            branch: 1,
                            name: "Jagath ariyarathna",
                            type: "DRIVER",
                            nic_number: "933910084V",
                            mobile_number: "098454746"

                        },
                        {
                            indexNo: 3,
                            branch: 1,
                            name: "rasika aberathna",
                            type: "DRIVER",
                            nic_number: "74449375V",
                            mobile_number: "05362727374"

                        },
                        {
                            indexNo: 4,
                            branch: 2,
                            name: "nuwan kumara",
                            type: "ROUTE_OFFICER",
                            nic_number: "6573474839V",
                            mobile_number: "0713272664"

                        }
                    ]
                            ;

                };

                $scope.ui.init();
            });
}());





