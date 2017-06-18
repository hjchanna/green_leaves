(function () {
    angular.module("appModule")
            .controller("MasterController", function ($scope, $routeParams, MasterService, optionPane) {
                $scope.model = {};
                $scope.model.totalItems = 8000;
                $scope.model.currentPage = 1;
                $scope.model.maxSize = 5;
                $scope.model.itemsPerPage = 100;

                $scope.model.controller = null;
                $scope.model.keyword = "";
                $scope.model.data = {};
                $scope.model.list = [];

                $scope.ui = {};
                $scope.ui.mode = "IDEAL";

                $scope.ui.load = function () {
                    if (!$scope.ui.loading) {
                        $scope.ui.loading = true;


                        MasterService.totalItems($scope.model.controller, $scope.model.keyword)
                                .success(function (totalItems) {
                                    $scope.model.totalItems = totalItems;

                                    MasterService.load($scope.model.controller, $scope.model.keyword, $scope.model.currentPage)
                                            .success(function (data) {
                                                $scope.model.list = data;
                                                $scope.ui.loading = false;
                                            })
                                            .error(function () {
                                                $scope.model.list = [];
                                                $scope.ui.loading = false;
                                            });
                                })
                                .error(function () {
                                    $scope.model.totalItems = 0;
                                    $scope.ui.loading = false;
                                });

                    }
                };

                $scope.ui.new = function () {
                    $scope.model.data = {};
                    $scope.ui.mode = "EDIT";
                };

                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";
                };

                $scope.ui.delete = function () {

                };

                $scope.ui.select = function (model) {
                    $scope.ui.mode = "SELECTED";
                    $scope.model.data = model;
                };

                $scope.ui.save = function () {
                    MasterService.save($scope.model.controller, $scope.model.data)
                            .success(function (data) {
                                optionPane.successMessage("Saved successfully !!!");
                                //set index no
                                $scope.model.data.indexNo = data;

                                $scope.model.list.push($scope.model.data);
                                $scope.ui.discard();
                            })
                            .error(function () {
                                optionPane.dangerMessage("Saved failed !!!");
                            });
                };

                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.data = {};
                };

                //labels
                $scope.model.routeLabel = function (indexNo) {
                    var label;
                    angular.forEach($scope.model.routes, function (value) {
                        if (value.indexNo === indexNo) {
                            label = value.indexNo + "-" + value.name;
                            return;
                        }
                    });
                    return label;
                };

                $scope.ui.init = function () {
                    $scope.model.controller = $routeParams.controller;
                    $scope.ui.load();

                    $scope.$watch("[model.currentPage, model.keyword]", function () {
                        $scope.ui.load();
                    });

                    //load routes
                    if ($scope.model.controller === 'client-controller') {
                        MasterService.loadRoutes()
                                .success(function (data) {
                                    $scope.model.routes = data;
                                })
                                .error(function () {
                                    $scope.model.routes = [];
                                });
                    }

                    //load employees (route officers and route helpers)
                    if ($scope.model.controller === 'route-controller') {
                        MasterService.loadEmployees()
                                .success(function (data) {
                                    $scope.model.employees = data;
                                })
                                .error(function () {
                                    $scope.model.employees = [];
                                });
                    }


                    //load vehicles
                    if ($scope.model.controller === 'route-controller') {
                        MasterService.loadVehicles()
                                .success(function (data) {
                                    $scope.model.vehicles = data;
                                })
                                .error(function () {
                                    $scope.model.vehicles = [];
                                });
                    }
                };
                $scope.ui.init();
            });
}());