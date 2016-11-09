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

                //ui models
                $scope.ui = {};

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




                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    $scope.model.reset();

                    //load Vehicle
                    //load Vehicles
                    vehicleFactory.loadVehicle(function (data) {
                        $scope.model.vehicles = data;
                    });
                    //load Vehicle Owners
                    vehicleFactory.loadVehicleOwner(function (data) {
                        $scope.model.vehicleOwners = data;
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





