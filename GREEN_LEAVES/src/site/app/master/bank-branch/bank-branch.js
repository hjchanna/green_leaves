(function () {
    angular.module("bankBranchModule", ['ngAnimate', 'ui.bootstrap']);
    angular.module("bankBranchModule")
            .factory("bankBranchFactory", function ($http, systemConfig) {
                var factory = {};

                factory.loadBankBranch = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/bank-branch";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                factory.loadBank = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/bank";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save Cheque Book
                factory.saveBankBranch = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/bank-branch/save-detail";
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
                //delete funtion
                factory.delete = function (indexNo, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/bank-branch/delete-detail/" + indexNo;
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
    angular.module("bankBranchModule")
            .controller("bankBranchController", function ($scope, $filter, $timeout, bankBranchFactory, Notification) {
                //data model
                $scope.model = {};
                $scope.model.bankBranch = {
                    bank: {
                        indexNo: null
                    }
                };
                $scope.model.bankBranchList = [];


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
                        document.querySelectorAll("#bank")[0].focus();
                    }, 10);
                };
                //save function 
                $scope.http.saveBankBranch = function () {
                    var detail = $scope.model.bankBranch;
                    var detailJSON = JSON.stringify(detail);
                    console.log(detailJSON);
                    console.log(detail);
                    bankBranchFactory.saveBankBranch(
                            detailJSON,
                            function (data) {
                                $scope.model.bankBranchList.push(data);
                                Notification.success(data.indexNo + " - " + "Save Successfully");
                                $scope.model.bankBranch = {};
                            },
                            function (data) {
                                Notification.error(data);
                            }
                    );
                    $scope.ui.focus();

                };
                //save function 
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveBankBranch();
                    } else {
                        Notification.error("Please Input Details");
                        $scope.ui.focus();
                    }
                };
                $scope.validateInput = function () {
                    if ($scope.model.bankBranch.bank.indexNo
                            && $scope.model.bankBranch.branchCode
                            && $scope.model.bankBranch.name
                            ) {
                        return true;
                    }
                    return true;
                };
                //delete
                $scope.http.delete = function (IndexNo, index) {
                    bankBranchFactory.delete(IndexNo
                            , function () {
                                Notification.success(IndexNo + " - " + " Delete Successfully");
                                $scope.model.bankBranchList.splice(index, 1);
                            }
                    , function (data) {
                        Notification.error(data);
                    });
                };
                $scope.init = function () {

                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset model
                    $scope.model.bankBranch = {
                        bank: {
                            indexNo: null
                        },
                        indexNo: null,
                        branchCode: null,
                        name: null
                    };
                    //edit function 
                    $scope.ui.edit = function (bankBranch, index) {
                        $scope.ui.mode = "EDIT";
                        $scope.model.bankBranch = bankBranch;
                        $scope.model.bankBranchList.splice(index, 1);
                        $scope.ui.focus();
                    };

                    //load 
                    bankBranchFactory.loadBankBranch(function (data) {
                        $scope.model.bankBranchList = data;
                    });
                    bankBranchFactory.loadBank(function (data) {
                        $scope.model.bankList = data;
                    });

                };

                $scope.init();
            });
}());


