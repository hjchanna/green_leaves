(function () {
    angular.module("clientModule", []);
    angular.module("clientModule")
            .factory("clientFactory", function ($http, systemConfig) {
                var factory = {};
                //---------- data loding ---------- 
                //load route
                factory.loadRoute = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/routes";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load supplier
                factory.loadSupplier = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/clients";
                    $http.get(url)
                            .success(function (data, status, header) {
                                callback(data);
                            })
                            .error(function (data, status, header) {

                            });
                };

                //save supplier
                factory.saveSupplier = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/clients/save-client";
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

                //delete supplier
                factory.deletesupplier = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/clients/delete-client/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;
            });
    angular.module("clientModule")
            .controller("clientController", function ($scope, clientFactory, Notification) {

                //data model
                $scope.model = {};
                
                //ui model
                $scope.ui = {};
                
                //http modal
                $scope.http = {};

                $scope.model.religion = [
                    "Buddhists",
                    "Hindus",
                    "Muslims",
                    "Roman Catholic",
                    "Christians"
                ];
                $scope.model.nationality = [
                    "Sinhalese",
                    "Sri Lanka Tamil"
                ];
                $scope.model.maritalStatus = [
                    "Single",
                    "Married",
                    "Divorced"
                ];
                $scope.model.clientType = [
                    "none",
                    "none1",
                    "none2"
                ];

                $scope.model.supplierBlackListed = [
                    {"name": "yes", "value": true},
                    {"name": "no", "value": false}
                ];
                $scope.model.dySupplier = [
                    {"name": "yes", "value": true},
                    {"name": "no", "value": false}
                ];



                //------------------ model functions ---------------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.data = {};
                };

                //------------------ ui functions ------------------------------
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                };

                $scope.ui.edit = function (supplier, index) {
                    $scope.model.data = supplier;
                    $scope.model.getSupplierBlackListed(supplier);
                    $scope.model.supplier.splice(index, 1);
                };

                $scope.ui.delete = function (indexNo, index) {
                    $scope.http.delete(indexNo, index);
                };

                $scope.ui.save = function () {
                    $scope.http.saveSupplier();
                };

                $scope.ui.checkSupplierExists = function (text, type) {
                    for (var i = 0; i < $scope.model.supplier.length; i++) {
                        if (type === "nicNumber") {
                            if (text === $scope.model.supplier[i].nicNumber) {
                                $scope.selectedRow = $scope.model.supplier[i];
                                $scope.model.data = $scope.model.supplier[i];
                                $scope.model.getSupplierBlackListed($scope.model.supplier[i]);
                                //Notification.error("this supplier is alrady exists");
                            }
                        } else if (type === "telephoneNumber") {
                            $scope.selectedRow = $scope.model.supplier[i];
                            if (text === $scope.model.supplier[i].telephoneNumber) {
                                $scope.model.data = $scope.model.supplier[i];
                                $scope.model.getSupplierBlackListed($scope.model.supplier[i]);
                                //Notification.error("this supplier is alrady exists");
                                break;
                            }
                        } else if (type === "mobileNumber") {
                            $scope.selectedRow = $scope.model.supplier[i];
                            if (text === $scope.model.supplier[i].mobileNumber) {
                                $scope.model.data = $scope.model.supplier[i];
                                $scope.model.getSupplierBlackListed($scope.model.supplier[i]);
                                //Notification.error("this supplier is alrady exists");
                            }
                        } else if (type === "name") {
                            if (text === $scope.model.supplier[i].name) {
                                $scope.selectedRow = $scope.model.supplier[i];
                                $scope.model.data = $scope.model.supplier[i];
                                $scope.model.getSupplierBlackListed($scope.model.supplier[i]);
                                //Notification.error("this supplier is alrady exists");
                            }
                        } else if (type === "suppplierNo") {
                            if (text === $scope.model.supplier[i].suppplierNo) {
                                $scope.selectedRow = $scope.model.supplier[i];
                                $scope.model.data = $scope.model.supplier[i];
                                $scope.model.getSupplierBlackListed($scope.model.supplier[i]);
                                //Notification.error("this supplier is alrady exists");
                            }
                        }
                    }
                };


                $scope.model.getSupplierBlackListed = function (supplier) {
                    //select supplierBlackListed boolean,dySupplier boolean
                    for (var i = 0; i < $scope.model.supplier.length; i++) {
                        if ($scope.model.supplier[i].supplierBlackListed) {
                            $scope.model.data.supplierBlackListed = "true";
                        } else {
                            $scope.model.data.supplierBlackListed = "false";
                        }

                        if ($scope.model.supplier[i].dySupplier) {
                            $scope.model.data.dySupplier = "true";
                        } else {
                            $scope.model.data.dySupplier = "false";
                        }
                    }
                };

                //------------------ http functions ------------------------------
                //save
                $scope.http.saveSupplier = function () {
                    console.log($scope.model.data.route);
                    var detail = $scope.model.data;
                    var detailJSON = JSON.stringify(detail);
                    console.log(detailJSON);
                    clientFactory.saveSupplier(
                            detailJSON,
                            function (data) {
                                Notification.success("success");
                                //reset model
                                $scope.model.supplier.push(data);
                                $scope.model.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                //delete
                $scope.http.delete = function (indexNo) {
                    clientFactory.deletesupplier(indexNo, function () {
                        var id = -1;
                        for (var i = 0; i < $scope.model.supplier.length; i++) {
                            if ($scope.model.supplier[i].indexNo === indexNo) {
                                id = i;
                            }
                        }
                        $scope.model.supplier.splice(id, 1);
                    });
                };

                $scope.init = function () {

                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset model
                    $scope.model.reset();

                    //loadRoute
                    clientFactory.loadRoute(function (data) {
                        $scope.model.routes = data;
                    });

                    //loadRoute
                    clientFactory.loadSupplier(function (data) {
                        $scope.model.supplier = data;
                    });
                };
                $scope.init();
            });
}());

