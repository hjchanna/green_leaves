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
            .controller("supplierController", function ($scope, $timeout, supplierFactory, Notification) {

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
                    $scope.ui.forcuse();
                };

                $scope.ui.forcuse = function () {
                    $timeout(function () {
                        document.querySelectorAll("#name")[0].focus();
                    }, 10);
                };

                $scope.ui.edit = function (supplier, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.data = supplier;
                    $scope.model.suppliers.splice(index, 1);
                    $scope.ui.forcuse();
                };

                $scope.ui.delete = function (indexNo) {
                    $scope.http.delete(indexNo);
                };

                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveSupplier();
                    } else {
                        Notification.error("please input details");
                    }
                };

                //validate model
                $scope.validateInput = function () {
                    if ($scope.model.data.name
                            && $scope.model.data.nicNumber
                            && $scope.model.data.mobileNumber) {
                        return true;
                    } else {
                        return false;
                    }
                };

                $scope.ui.keyEvent = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.save();
                    }
                };

                //------------------ http functions ------------------------------
                $scope.http.saveSupplier = function () {
                    var detail = $scope.model.data;
                    var detailJSON = JSON.stringify(detail);

                    supplierFactory.saveSupplier(
                            detailJSON,
                            function (data) {
                                Notification.success("saved successfully.");
                                //reset model
                                $scope.model.suppliers.push(data);
                                $scope.model.reset();
                                $scope.ui.forcuse();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                //delete
                $scope.http.delete = function (indexNo) {
                    supplierFactory.deletesupplier(indexNo, function () {
                        var id = -1;
                        for (var i = 0; i < $scope.model.suppliers.length; i++) {
                            if ($scope.model.suppliers[i].indexNo === indexNo) {
                                id = i;
                            }
                        }
                        Notification.success("delete successfully.");
                        $scope.model.suppliers.splice(id, 1);
                    });
                };

                $scope.ui.keyEvent = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.save();
                    }
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

