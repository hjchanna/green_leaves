(function () {
    angular.module("bankModule", ['ngAnimate', 'ui.bootstrap']);
    angular.module("bankModule")
            .factory("bankFactory", function ($http, systemConfig) {
                var factory = {};

                //load Item Department
                factory.loadBank = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/bank";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };


                //insert department
                factory.insertBank = function (detail, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/bank/insert-detail";
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
                factory.deleteBank = function (indexNo, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/bank/delete-detail/" + indexNo;
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
    angular.module("bankModule")
            .controller("bankController", function ($scope, $filter, $timeout, bankFactory, Notification) {

                //data model
                $scope.model = {};
                $scope.model.bank = {};
                $scope.model.bankList = [];


                //ui model
                $scope.ui = {};

                //http modal
                $scope.http = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.ui.focus();
                };

                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#code")[0].focus();
                    }, 10);
                };
                //save department
                $scope.ui.save = function () {
                    if ($scope.ui.checkValidateBank()) {
                        $scope.http.insertBank();
                    } else {
                        Notification.error('Insert Detail to Save !');
                    }
                    $scope.ui.focus();
                };
                $scope.ui.checkValidateBank = function () {
                    if ($scope.model.bank.bankCode
                            && $scope.model.bank.name) {
                        return true;
                    }
                    return false;
                };
                $scope.http.insertBank = function () {
                    var detail = $scope.model.bank;
                    var detailJSON = JSON.stringify(detail);
                    //save detail dirrectly
                    bankFactory.insertBank(
                            detailJSON,
                            function (data) {

                                Notification.success(data.indexNo + " - " + "Save Successfully !");
                                $scope.model.bankList.push(data);
                                $scope.model.bank = {};


                            }
                    , function (data) {
                        Notification.error(data);
                    }
                    );
                    $scope.ui.focus();
                };
                //edit function
                $scope.ui.edit = function (bank, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.bank = bank;
                    $scope.model.bankList.splice(index, 1);
                };
                $scope.http.delete = function (indexNo, index) {
                    if (indexNo) {
                        bankFactory.deleteBank(
                                indexNo,
                                function () {

                                    $scope.model.bankList.splice(index, 1);

                                    Notification.success(indexNo + " - " + "Delete Successfully");
                                    $scope.ui.mode = "IDEAL";
                                    $scope.model.bank = {};
                                }
                        , function (data) {
                            Notification.error(data);
                            $scope.model.bank = {};
                        });
                    }
                };
                $scope.init = function () {

                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset model
                    $scope.model = {
                    };

                    //load routes
                    bankFactory.loadBank(function (data) {
                        $scope.model.bankList = data;
                    });

                };

                $scope.init();
            });
}());

