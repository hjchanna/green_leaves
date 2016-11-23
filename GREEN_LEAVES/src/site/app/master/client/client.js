(function () {
    angular.module("clientModule", ['ngAnimate', 'ui.bootstrap']);
    angular.module("clientModule")
            .factory("clientFactory", function ($http, systemConfig) {
                var factory = {};

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
            .controller("clientController", function ($scope, $filter, $timeout, clientFactory, Notification) {

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
                $scope.model.married = [
                    "No",
                    "Yes"
                ];
                $scope.model.clientType = [
                    "none",
                    "none1",
                    "none2"
                ];
                $scope.model.holder = [
                    "Yes",
                    "No"
                ];

                //------------------ model functions ---------------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.data = {};
                };

                //------------------ ui functions ------------------------------
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $timeout(function () {
                        document.querySelectorAll("#clientNo")[0].focus();
                    }, 10);
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
                    if ($scope.validateInput()) {
                        $scope.http.saveSupplier();
                    } else {
                        Notification.error("Please Input Details");
                    }
                };

                $scope.ui.setDyNumber = function (text) {
                    if (text === "No") {
                        $scope.status = true;
                        $scope.model.data.holderNumber = null;
                    } else {
                        $scope.status = false;
                    }
                };

                //validate model
                $scope.validateInput = function () {
                    if ($scope.model.data.name
                            && $scope.model.data.clientNumber
                            && $scope.model.data.name
                            && $scope.model.data.nicNumber
                            && $scope.model.data.dateOfBirth
                            && $scope.model.data.mobileNumber
                            && $scope.model.data.religion
                            && $scope.model.data.nationality
                            && $scope.model.data.married
                            && $scope.model.data.type
                            && $scope.model.data.registerDate
                            && $scope.model.data.route.name !== null) {
                    return true;
                    } else {
                        return false;
                    }
                };

                $scope.ui.checkSupplierExists = function (text, type) {
                    for (var i = 0; i < $scope.model.supplier.length; i++) {
                        if (type === "nicNumber") {
                            if (text === $scope.model.supplier[i].nicNumber) {
                                $scope.selectedRow = $scope.model.supplier[i];
                                Notification.error("this supplier is alrady exists");
                            }
                        } else if (type === "telephoneNumber") {
                            if (text === $scope.model.supplier[i].telephoneNumber) {
                                $scope.selectedRow = $scope.model.supplier[i];
                                Notification.error("this supplier is alrady exists");
                                break;
                            }
                        } else if (type === "mobileNumber") {
                            if (text === $scope.model.supplier[i].mobileNumber) {
                                $scope.selectedRow = $scope.model.supplier[i];
                                Notification.error("this supplier is alrady exists");
                            }
                        } else if (type === "name") {
                            if (text === $scope.model.supplier[i].name) {
                                $scope.selectedRow = $scope.model.supplier[i];
                                Notification.error("this supplier is alrady exists");
                            }
                        } else if (type === "clientNumber") {
                            if (text === $scope.model.supplier[i].clientNumber) {
                                $scope.selectedRow = $scope.model.supplier[i];
                                Notification.error("this supplier is alrady exists");
                            }
                        }
                    }
                };

                $scope.model.getSupplierBlackListed = function (supplier) {
                    if (supplier.supplierBlackListed) {
                        $scope.model.data.blackListed = "Yes";
                    } else {
                        $scope.model.data.blackListed = "No";
                    }

                    if (supplier.active) {
                        $scope.model.data.active = "Yes";
                    } else {
                        $scope.model.data.active = "No";
                    }

                    if (supplier.holder) {
                        $scope.model.data.holder = "Yes";
                        $scope.status = false;
                    } else {
                        $scope.model.data.holder = "No";
                        $scope.status = true;
                    }
                    if (supplier.married) {
                        $scope.model.data.married = "Yes";
                    } else {
                        $scope.model.data.married = "No";
                    }
                };

                $scope.ui.tabChnage = function (event) {
                    if (event.keyCode === 13) {
                        $scope.indextab = 1;
                        $timeout(function () {
                            document.querySelectorAll("#registerDate")[0].focus();
                        }, 10);
                    }
                };

                $scope.ui.keyEvent = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.save();
                    }
                };

                //------------------ http functions ------------------------------
                //save
                $scope.http.saveSupplier = function () {
                    $scope.indextab = 0;
                    $scope.model.data.blackListed = false;
                    $scope.model.data.active = true;

                    //set holder
                    var holder = $scope.model.data.holder;
                    if (holder === "No") {
                        $scope.model.data.holder = false;
                    } else {
                        $scope.model.data.holder = true;
                    }
                    
                    //set married
                    var married = $scope.model.data.married;
                    if (married === "No") {
                        $scope.model.data.married = false;
                    } else {
                        $scope.model.data.married = true;
                    }

                    var detail = $scope.model.data;
                    var detailJSON = JSON.stringify(detail);
                    clientFactory.saveSupplier(
                            detailJSON,
                            function (data) {
                                Notification.success("success" + data.indexNo);
                                //reset model
                                $scope.model.supplier.push(data);
                                $scope.model.reset();
                                $scope.ui.changeDefault();
                                $timeout(function () {
                                    document.querySelectorAll("#clientNo")[0].focus();
                                }, 10);
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

                //ui change default functions
                $scope.ui.changeDefault = function () {
                    $scope.model.data.blackListed = "No";
                    var status = "No";
                    $scope.model.data.holder = status;
                    $scope.ui.setDyNumber(status);
                    $scope.model.data.active = "Yes";
                    $scope.model.data.registerDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                };

                $scope.init = function () {

                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset model
                    $scope.model.reset();
                    $scope.ui.changeDefault();

                    //loadRoute
                    clientFactory.loadRoute(function (data) {
                        $scope.model.routes = data;
                    });

                    //loadSupplier
                    clientFactory.loadSupplier(function (data) {
                        $scope.model.supplier = data;
                    });
                };
                $scope.init();
            });
}());

