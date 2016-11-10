(function () {
    angular.module("routeModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //factory
    angular.module("routeModule")
            .factory("routeFactory", function ($http, systemConfig) {
                var factory = {};

                //load routes
                factory.loadRoutes = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/routes";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load vehicle
                factory.loadVehicles = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/vehicle";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load vehicle
                factory.loadEmployees = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/employees";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };



                //find routes by branch
                factory.findRoutes = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/routes/find-routes/" + indexNo;

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save
                factory.saveRoute = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/routes/save-route";

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
                factory.deleteRoute = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/routes/delete-route/" + indexNo;

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
    angular.module("routeModule")
            .controller("routeController", function (routeFactory, $scope, Notification) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;


                //------------------ model functions ---------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.route = {
                        "indexNo": null,
                        "branch": null,
                        "name": null,
                        "vehicle": null,
                        "routeOfficer": null,
                        "routeHelper": null,
                        "tdRate": null
                    };
                };


                //------------http funtions--------------
                //save 
                $scope.http.saveRoutes = function () {
                    $scope.model.route.branch = 1;
                    var detail = $scope.model.route;
                    var detailJSON = JSON.stringify(detail);

                    routeFactory.saveRoute(
                            detailJSON,
                            function (data) {
                                Notification.success("success");
                                $scope.model.routes.push(data);
                                $scope.model.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                //delete
                $scope.http.deleteRoute = function (indexNo, index) {
                    routeFactory.deleteRoute(indexNo, function () {
                        Notification.success("delete success");
                        $scope.model.routes.splice(index, 1);
                    });
                };


                //----------------- validation functions -----------
                $scope.validateInput = function () {
                    if ($scope.model.route.name !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //------------ ui funtion----------------


                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                };

                //save
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveRoutes();
                    } else {
                        Notification.error("Please input Details");
                    }
                };

                //edit
                $scope.ui.edit = function (details, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.route = details;
                    $scope.model.routes.splice(index, 1);
                };



                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";

                    $scope.model.reset();
                    //load routes
                    routeFactory.loadRoutes(function (data) {
                        $scope.model.routes = data;
                    });

                    routeFactory.loadVehicles(function (data) {
                        $scope.model.vehicleList = data;
                    });

                    routeFactory.loadEmployees(function (data) {
                        $scope.model.officerList = data;
                    });
                };

                $scope.ui.init();

            });
}());