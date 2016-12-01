(function () {
    angular.module("branchModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("branchModule")
            .factory("branchFactory", function ($http, systemConfig) {
                var factory = {};
                factory.lordBranch = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/branch";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, states, headers) {

                            });
                };

                factory.saveBranch = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/branch/save-branch";
                    $http.post(url, summary)
                            .success(function (data, states, headers) {
                                callback(data);
                            })
                            .error(function (data, states, headers) {
                                if (errorCallback) {
                                    errorCallback(data);
                                }
                            });
                };
                factory.deleteBranch = function (IndexNo, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/branch/delete-branch/" + IndexNo;

                    $http.delete(url , IndexNo)
                            .success(function (data, states, headers) {
                                callback(data);
                            })
                            .error(function (data, states, headers) {
                                if (errorcallback) {
                                    errorcallback(data)
                                }
                            });

                };

                return factory;
            });


    angular.module("branchModule")
            .controller("branchController", function ($scope, branchFactory, Notification, $timeout) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.model.branch = [];

                //----------- data models ------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.branch = {};
                };

                $scope.validateInput = function () {
                    if ($scope.model.branch.name !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //save function 
                $scope.http.saveBranch = function () {
                    var detail = $scope.model.branch;
                    var detailJSON = JSON.stringify(detail);
                    branchFactory.saveBranch(
                            detailJSON,
                            function (data) {
                                $scope.model.branchList.push(data);
                                Notification.success(data.indexNo + " - " + "Branch Save Successfully");
                                $scope.model.reset();
                                $scope.ui.focus();

                            },
                            function (data) {
                                Notification.error(data);
                                $scope.ui.focus();
                            }
                    );

                };
                $scope.http.deleteBranch = function (IndexNo, index) {
                    console.log(IndexNo);
                    branchFactory.deleteBranch(IndexNo
                            , function () {
                                Notification.success(IndexNo + " - " + "Brand Delete Successfully");
                                $scope.model.branchList.splice(index, 1);
                            }
                    , function (data) {
                        Notification.error(data);
                    });
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.ui.focus();
                };

                //focus
                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#branchCodeText")[0].focus();
                    }, 10);
                };

                //key event
                $scope.ui.keyEvent = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.save();
                    }
                };

                //edit function 
                $scope.ui.edit = function (branch, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.branch = branch;
                    $scope.model.branchList.splice(index, 1);
                    $scope.ui.focus();
                };

                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveBranch();
                        $scope.ui.focus();
                    } else {
                        Notification.error('No branch Name to Save ');
                        $scope.ui.focus();
                    }

                };

                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //rest model data
                    $scope.model.reset();

                    //lord brands
                    branchFactory.lordBranch(function (data) {
                        $scope.model.branchList = data;
                    });
                };

                $scope.ui.init();

            });
}());