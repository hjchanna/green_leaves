(function () {
    angular.module("bankAccountModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);
    //http factory
    angular.module("bankAccountModule")
            .factory("bankAccountFactory", function ($http, systemConfig) {
                var factory = {};

                //load sub category
                factory.loadBankAccount = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/bank-account";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save sub category
                factory.saveBankAccount = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/bank-account/save-bankAccount";
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
                factory.deleteBankAccount = function (indexNo, callback,errorcallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/bank-account/delete-bankAccount/" + indexNo;
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

    //Controller
    angular.module("bankAccountModule")
            .controller("bankAccountController", function ($scope, bankAccountFactory, Notification, $timeout) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.model.bankAccount = [];

                //----------- data models ------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.bankAccount = {
                        active : true                
                    };
                };

                //----------validate funtion-------------
                $scope.validateInput = function () {
                    if ($scope.model.bankAccount.name !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //----------http funtion----------------
                $scope.http.deleteBankAccount = function (IndexNo, index) {
                    bankAccountFactory.deleteBankAccount(IndexNo
                    , function () {
                        Notification.success(IndexNo+" - " +"Bank Account Delete Successfully");
                        $scope.model.bankAccountList.splice(index, 1);
                    }
                    ,function (data){
                        Notification.error(data);
                    });
                };

                //save function 
                $scope.http.saveBankAccount = function () {
                    var detail = $scope.model.bankAccount;
                    var detailJSON = JSON.stringify(detail);
                    bankAccountFactory.saveBankAccount(
                            detailJSON,
                            function (data) {
                                $scope.model.bankAccountList.push(data);
                                Notification.success(data.indexNo+" - " +"Sub Category Save Successfully");
                                $scope.model.reset();
                                $scope.ui.focus();

                            },
                            function (data) {
                                Notification.error(data);
                                $scope.ui.focus();
                            }
                    );

                };

                //----------------ui funtion--------------
                //save function 
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveBankAccount();
                    } else {
                        Notification.error("Please Input Details");
                        $scope.ui.focus();
                    }
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.ui.focus();
                };

                //focus
                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#nameText")[0].focus();
                    }, 10);
                };

                //key event
                $scope.ui.keyEvent = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.save();
                    }
                };

                //edit function 
                $scope.ui.edit = function (subCategory, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.bankAccount = subCategory;
                    $scope.model.bankAccountList.splice(index, 1);
                    $scope.ui.focus();
                };

                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //rest model data
                    $scope.model.reset();

                    //lord subCategory
                    bankAccountFactory.loadBankAccount(function (data) {
                        $scope.model.bankAccountList = data;
                    });
                };
                
                $scope.ui.init();
            });
}());

