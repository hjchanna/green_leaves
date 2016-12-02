(function () {
    angular.module("chequeBookModule", ['ngAnimate', 'ui.bootstrap']);
    angular.module("chequeBookModule")
            .factory("chequeBookFactory", function ($http, systemConfig) {
                var factory = {};
                //load bank account
                factory.loadBankAccount = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/bank-account";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                //load cheque book
                factory.loadChequeBook = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/cheque-book";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save Cheque Book
                factory.saveChequeBook = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/cheque-book/save-detail";
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
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/cheque-book/delete-cheque-book/" + indexNo;
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
    angular.module("chequeBookModule")
            .controller("chequeBookController", function ($scope, $filter, $timeout, chequeBookFactory, Notification) {

                //data model
                $scope.model = {
                    chequeBook: {
                        indexNo: 0
                    }
                };
                $scope.model.chequeBookList = [];

//                new index No
                var lastIndexNo = 1;

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
                        document.querySelectorAll("#bankAccount")[0].focus();
                    }, 10);
                };

                $scope.ui.reset = function () {
                    $scope.model.chequeBook = {
                        bankAccount: null,
                        startNo: null,
                        noOfPages: null,
                        date: null,
                        active: null
                    };
                };

                //save function 
                $scope.http.saveChequeBook = function () {
                    if ($scope.ui.mode !== 'EDIT') {
                        $scope.model.chequeBook.indexNo = 0;
                    }
                    var detail = $scope.model.chequeBook;
                    var detailJSON = JSON.stringify(detail);
                    chequeBookFactory.saveChequeBook(
                            detailJSON,
                            function (data) {
                                $scope.model.chequeBookList.push(data);
                                Notification.success(data.indexNo + " - " + "Save Successfully");
                                $scope.ui.reset();
                                $scope.ui.lastIndex();
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
                        $scope.http.saveChequeBook();
                    } else {
                        Notification.error("Please Input Details");
                        $scope.ui.focus();
                    }
                };

                //----------validate funtion-------------
                $scope.validateInput = function () {
                    if ($scope.model.chequeBook.startNo
                            && $scope.model.chequeBook.noOfPages
                            && $scope.model.chequeBook.bankAccount.indexNo
                            ) {
                        return true;
                    } else {
                        return false;
                    }
                };
                //edit function 
                $scope.ui.edit = function (chequeBook, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.chequeBook = chequeBook;
                    $scope.model.chequeBookList.splice(index, 1);
                    $scope.ui.focus();
                };

                //delete
                $scope.http.delete = function (IndexNo, index) {
                    chequeBookFactory.delete(IndexNo
                            , function () {
                                Notification.success(IndexNo + " - " + " Delete Successfully");
                                $scope.model.chequeBookList.splice(index, 1);
                            }
                    , function (data) {
                        Notification.error(data);
                    });
                };
                
                //last Index
                $scope.ui.lastIndex = function () {
                    $scope.model.chequeBook.indexNo = $scope.model.chequeBookList[$scope.model.chequeBookList.length - 1].indexNo + 1;
                };

                
                //set last page value
                $scope.ui.setLastPage = function () {
                    var startNo = $scope.model.chequeBook.startNo;
                    var noOfPages = $scope.model.chequeBook.noOfPages;
                    $scope.model.chequeBook.lastNo = (startNo + noOfPages) - 1;
                    
                };
                //key Event
                $scope.ui.keyEvent=function(event){
                    var code = event ? event.keyCode || event.which : 13;
                    if (code === 13) {
                        $scope.ui.save();
                    }
                };
                $scope.init = function () {

                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset model
                    $scope.model = {
                        chequeBook: {
                            indexNo: 0
                        }
                    };

                    //load bank account
                    chequeBookFactory.loadBankAccount(function (data) {
                        $scope.model.bankAccountList = data;
                    });
                    //load cheque book
                    chequeBookFactory.loadChequeBook(function (data) {
                        $scope.model.chequeBookList = data;
                        $scope.ui.lastIndex();
                    });
                };

                $scope.init();
            });
}());