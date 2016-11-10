(function () {
    angular.module("supplierModule", []);
    angular.module("supplierModule")
            .factory("supplierFactory", function ($http, systemConfig) {
                var factory = {};

                //load supplier
                factory.loadSupplier = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/supplier";
                    $http.get(url)
                            .success(function (data, status, header) {
                                callback(data);
                            })
                            .error(function (data, status, header) {

                            });
                };

                //save supplier
                factory.saveSupplier = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/supplier/save-supplier";
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
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/supplier/delete-supplier/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;
            });
    angular.module("supplierModule")
            .controller("supplierController", function ($scope, supplierFactory, Notification) {

                //data model
                $scope.model = {};
                //ui model
                $scope.ui = {};
                //http modal
                $scope.http = {};


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
                    $scope.model.suppliers.splice(index, 1);
                };

                $scope.ui.delete = function (indexNo, index) {
                    $scope.http.delete(indexNo, index);
                };

                $scope.ui.save = function () {
                    $scope.http.saveSupplier();
                };

                $scope.ui.checkSupplierExists = function (text, type) {
                    for (var i = 0; i < $scope.model.suppliers.length; i++) {
                        if (type === "nicNumber") {
                            if (text === $scope.model.suppliers[i].nicNumber) {
                                $scope.selectedRow = $scope.model.suppliers[i];
                                $scope.model.data = $scope.model.suppliers[i];
                                //Notification.error("this supplier is alrady exists");
                            }
                        } else if (type === "telephoneNumber") {
                            $scope.selectedRow = $scope.model.suppliers[i];
                            if (text === $scope.model.suppliers[i].telephoneNumber) {
                                $scope.model.data = $scope.model.suppliers[i];
                                //Notification.error("this supplier is alrady exists");
                                break;
                            }
                        } else if (type === "mobileNumber") {
                            $scope.selectedRow = $scope.model.suppliers[i];
                            if (text === $scope.model.suppliers[i].mobileNumber) {
                                $scope.model.data = $scope.model.suppliers[i];
                                //Notification.error("this suppliers is alrady exists");
                            }
                        } else if (type === "name") {
                            if (text === $scope.model.suppliers[i].name) {
                                $scope.selectedRow = $scope.model.suppliers[i];
                                $scope.model.data = $scope.model.suppliers[i];
                                //Notification.error("this suppliers is alrady exists");
                            }
                        } else if (type === "suppplierNo") {
                            if (text === $scope.model.suppliers[i].suppplierNo) {
                                $scope.selectedRow = $scope.model.suppliers[i];
                                $scope.model.data = $scope.model.suppliers[i];
                                //Notification.error("this suppliers is alrady exists");
                            }
                        }
                    }
                };

                //------------------ http functions ------------------------------
                $scope.http.saveSupplier = function () {
                    var detail = $scope.model.data;
                    var detailJSON = JSON.stringify(detail);

                    supplierFactory.saveSupplier(
                            detailJSON,
                            function (data) {
                                Notification.success("success");
                                //reset model
                                $scope.model.suppliers.push(data);
                                $scope.model.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                //delete
                $scope.http.delete = function (indexNo, index) {
                    supplierFactory.deletesupplier(indexNo, function () {
                        var id = -1;
                        for (var i = 0; i < $scope.model.suppliers.length; i++) {
                            if ($scope.model.suppliers[i].indexNo === indexNo) {
                                id = i;
                            }
                        }
                        $scope.model.suppliers.splice(id, 1);
                    });

                };

                $scope.init = function () {

                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset model
                    $scope.model.reset();

                    //loadRoute
                    supplierFactory.loadSupplier(function (data) {
                        $scope.model.suppliers = data;
                    });
                };
                $scope.init();
            });
}());

