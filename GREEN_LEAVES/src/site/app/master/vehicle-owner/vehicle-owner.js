(function () {
    //module
    angular.module("vehicleOwnerModule", ['ui.bootstrap', 'ui-notification']);
//http factory
    angular.module("vehicleOwnerModule")
            .factory("vehicleOwnerFactory", function ($http, systemConfig) {
                var factory = {};

                //load Item Department
                factory.loadVehicleOwner = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/vehicle-owner";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                

                //insert department
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

                //delete 
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
    angular.module("vehicleOwnerModule")
            .controller("vehicleOwnerController", function ($scope, $log, vehicleOwnerFactory, Notification) {
                $scope.totalItems = 64;
                $scope.currentPage = 4;

                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };

                $scope.pageChanged = function () {
                    $log.log('Page changed to: ' + $scope.currentPage);
                };
                //data models 
                $scope.model = {};
                $scope.model.vehicleOwner = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                $scope.maxSize = 5;
                $scope.bigTotalItems = 175;
                $scope.bigCurrentPage = 1;

                $scope.model.vehicleOwnerList = [];


                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";


                };

                //edit function
                $scope.ui.edit = function (vehicleOwner, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.vehicleOwner = vehicleOwner;
                    $scope.model.vehicleOwnerList.splice(index, 1);
                };
                //save department
                $scope.ui.save = function () {
                    if ($scope.model.vehicleOwner) {
                        $scope.http.insertVehicleOwner();
                        $scope.ui.mode = "IDEAL";
                    } else {
                        Notification.error('No Detail to Save ');
                    }

                };

                //ui init function
                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset model
                    $scope.model = {};
                    //load routes
                    vehicleOwnerFactory.loadVehicleOwner(function (data) {
                        $scope.model.vehicleOwnerList = data;
                    });
                };
                $scope.ui.init();

                $scope.http.insertVehicleOwner = function () {
                    var detail = $scope.model.vehicleOwner;
                    var detailJSON = JSON.stringify(detail);
                    //save detail dirrectly
                    vehicleOwnerFactory.insertVehicleOwner(
                            detailJSON,
                            function (data) {
                                if (data !== "") {
                                    for (var i = 0; i < $scope.model.vehicleOwnerList.length; i++) {
                                        if ($scope.model.vehicleOwnerList[i].indexNo === data.indexNo) {
                                            $scope.model.vehicleOwnerList.splice(i, 1);
                                            break;
                                        }
                                    }
                                    Notification.success('success !');
                                    $scope.model.vehicleOwnerList.push(data);
                                    $scope.model.vehicleOwner = {};
                                } else {
                                    Notification.error('Already Exists !');
                                }
                            }
                    , function (data) {
                        Notification.error(data.message);

                    }
                    );
                };
                $scope.http.deleteVehicleOwner = function (indexNo, index) {
                    if (indexNo) {
                        vehicleOwnerFactory.deleteVehicleOwner(indexNo, function () {
                            console.log('delete success');
                            $scope.model.vehicleOwnerList.splice(index, 1);

                            Notification.error(indexNo + ' Delete Successfully');
                        });
                    }
                };
            });
}());
