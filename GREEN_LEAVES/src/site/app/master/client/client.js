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
                    var url = systemConfig.apiUrl + "/api/v1/green-leaves/clients";
                    $http.get(url)
                            .success(function (data, status, header) {
                                callback(data);
                            })
                            .error(function (data, status, header) {

                            });
                };

                //save supplier
                factory.saveSupplier = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/v1/green-leaves/clients/save-client";
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
                factory.deletesupplier = function (indexNo, callback,errorcallback) {
                    var url = systemConfig.apiUrl + "/api/v1/green-leaves/clients/delete-client/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorcallback) {
                                    errorcallback(data);
                                }
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
                $scope.model.clientType = [
                    "none",
                    "none1",
                    "none2"
                ];

                //convert lovercase to uppercase 
                $scope.$watch('model.data.nicNumber', function (val) {
                    $scope.model.data.nicNumber = $filter('uppercase')(val);
                }, true);

                //------------------ model functions ---------------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.data = {
                        active: true,
                        blackListed: true
                    };
                };

                //------------------ ui functions ------------------------------
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.ui.forcuse();
                };

                $scope.ui.forcuse = function () {
                    $timeout(function () {
                        document.querySelectorAll("#clientNo")[0].focus();
                    }, 10);
                };

                $scope.ui.edit = function (supplier, $index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.data = supplier;
                    //holder set
                    if ($scope.model.data.holder) {
                        $scope.holder = true;
                    } else {
                        $scope.holder = false;
                        $scope.model.data.holderNumber = null;
                    }
                    //married set
                    if ($scope.model.data.married) {
                        $scope.married = true;
                    } else {
                        $scope.married = false;
                    }
                    $scope.model.supplier.splice($index, 1);
                    $scope.ui.forcuse();
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
                    if (text === "false") {
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
                            && $scope.model.data.nicNumber
                            && $scope.model.data.name
                            && $scope.model.data.mobileNumber
                            && $scope.model.data.dateOfBirth
                            && $scope.model.data.religion
                            && $scope.model.data.nationality
                            && $scope.model.data.type
                            && $scope.model.data.route) {
                        return true;
                    } else {
                        return false;
                    }
                };

                $scope.ui.tabChnage = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.indextab = 1;
                        $timeout(function () {
                            document.querySelectorAll("#registerDate")[0].focus();
                        }, 10);
                    }
                };

                $scope.ui.keyEvent = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.ui.save();
                    }
                };

                //------------------ http functions ------------------------------
                //save
                $scope.http.saveSupplier = function () {
                    $scope.indextab = 0;
                    var detail = $scope.model.data;
                    console.log(detail);
                    var detailJSON = JSON.stringify(detail);
                    clientFactory.saveSupplier(
                            detailJSON,
                            function (data) {
                                Notification.success(data.indexNo +" - "+ "Client Save Successfully.");
                                //reset model
                                $scope.model.supplier.push(data);
                                $scope.model.reset();
                                $scope.ui.changeDefault();
                                $scope.ui.forcuse();
                            },
                            function (data) {
                                $scope.ui.forcuse();
                                Notification.error(data.message);
                            }
                    );
                };

                //delete
                $scope.http.delete = function (indexNo) {
                    clientFactory.deletesupplier(indexNo
                    , function () {
                        var id = -1;
                        for (var i = 0; i < $scope.model.supplier.length; i++) {
                            if ($scope.model.supplier[i].indexNo === indexNo) {
                                id = i;
                            }
                        }
                        Notification.success(indexNo +" - "+ "Client Delete Successfully.");
                        $scope.model.supplier.splice(id, 1);
                    }
                            ,function (data){
                                Notification.error(data);
                            });
                };

                //ui change default functions
                $scope.ui.changeDefault = function () {
                    $scope.status = true;
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

