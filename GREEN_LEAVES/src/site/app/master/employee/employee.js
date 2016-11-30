(function () {
    angular.module("employeeModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //----------http factory-----------
    angular.module("employeeModule")
            .factory("employeeFactory", function ($http, systemConfig) {
                var factory = {};


                //load employee
                factory.loadEmployee = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/employee";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load employee types
                factory.loadEmployeeTypes = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/types";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };


                //save employee
                factory.saveEmployee = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/employee/save-employee";

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

                //delete employee
                factory.deleteEmployee = function (IndexNo, callback,errorcallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/employee/delete-employee/" + IndexNo;

                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                errorcallback(data);
                            });

                };


                return factory;
            });



    //-----------http controller---------
    angular.module("employeeModule")
            .controller("employeeController", function ($scope, employeeFactory, Notification, $timeout, $filter) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;


                //convert lovercase to uppercase 
                $scope.$watch('model.employee.nicNumber', function (val) {
                    $scope.model.employee.nicNumber = $filter('uppercase')(val);
                }, true);

                //-----------model function--------------

                //reset model
                $scope.model.reset = function () {
                    $scope.model.employee = {
                    };
                };

                //validate model
                $scope.validateInput = function () {
                    if ($scope.model.employee.name
                            && $scope.model.employee.mobileNumber
                            && $scope.model.employee.type) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //save model
                $scope.http.saveEmployee = function () {
                    var details = $scope.model.employee;
                    var detailJSON = JSON.stringify(details);

                    employeeFactory.saveEmployee(
                            detailJSON,
                            function (data) {
                                $scope.model.employeeList.push(data);
                                Notification.success(data.indexNo + "-" + "Employee Saved Successfully.");
                                $scope.model.reset();
                                $scope.ui.focus();
                            },
                            function (data) {
                                Notification.error(data.message);
                                $scope.ui.focus();
                            }
                    );
                };

                //delete
                $scope.http.deleteEmployee = function (indexNo) {
                    employeeFactory.deleteEmployee(indexNo
                    , function () {
                        var id = -1;
                        for (var i = 0; i < $scope.model.employeeList.length; i++) {
                            if ($scope.model.employeeList[i].indexNo === indexNo) {
                                id = i;
                            }
                        }
                        Notification.success(indexNo + "-" + "Employee Delete Successfully.");
                        $scope.model.employeeList.splice(id, 1);
                    }
                            ,function (data){
                                Notification.error(data);
                            });
                };


                //----------------ui funtion--------------
                //save function 
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveEmployee();
                    } else {
                        Notification.error("Please input details");
                        $scope.ui.focus();
                    }

                };

                //focus
                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#employee")[0].focus();
                    }, 10);
                };

                //key event
                $scope.ui.keyEvent = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.ui.save();
                    }
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.ui.focus();

                };

                //edit function 
                $scope.ui.edit = function (employee, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.employee = employee;
                    $scope.model.employeeList.splice(index, 1);

                    $scope.ui.focus();
                };

                //delete function
                $scope.ui.delete = function (indexNo) {
                    $scope.http.deleteEmployee(indexNo);
                };


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //reset text
                    $scope.model.reset();


                    //load employee
                    employeeFactory.loadEmployee(function (data) {
                        $scope.model.employeeList = data;
                    });
                };

                $scope.ui.init();

            });
}());