(function () {
    angular.module("employeeModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //----------http factory-----------
    angular.module("employeeModule")
            .factory("employeeFactory", function ($http, systemConfig) {
                var factory = {};


                //load employee
                factory.loadEmployee = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/employees";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };


                //save employee
                factory.saveEmployee = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/employees/save-employee";

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
                factory.deleteEmployee = function (IndexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/employees/delete-employee/" + IndexNo;

                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });

                };


                return factory;
            });



    //-----------http controller---------
    angular.module("employeeModule")
            .controller("employeeController", function ($scope, employeeFactory, Notification) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;


                //-----------model function--------------

                //reset model
                $scope.model.reset = function () {
                    $scope.model.employee = {
                        "indexNo": null,
                        "branch": null,
                        "name": null,
                        "type": null,
                        "birthday": null,
                        "nic": null,
                        "mobileNo": null,
                        "telephoneNo": null,
                        "address1": null,
                        "address2": null,
                        "address3": null
                    };
                };
                //validate model
                $scope.validateInput = function () {
                    if ($scope.model.employee.name && $scope.model.employee.nic && $scope.model.employee.birthday && $scope.model.employee.address1 && $scope.model.employee.mobileNo !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //save model
                $scope.http.saveEmployee = function () {
                    $scope.model.employee.branch = 1;
                    var details = $scope.model.employee;
                    var detailJSON = JSON.stringify(details);
                    console.log(detailJSON);

                    employeeFactory.saveEmployee(
                            detailJSON,
                            function (data) {
                                $scope.model.employeeList.push(data);
                                Notification.success("added success...");
                                $scope.model.reset();
                                $scope.ui.mode = ("IDEAL");
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                //delete model
                $scope.http.deleteEmployee = function (IndexNo, index) {
                    employeeFactory.deleteEmployee(IndexNo, function () {
                        Notification.success("Delete Success");
                        $scope.model.employeeList.splice(index, 1);
                    });
                };


                //----------------ui funtion--------------
                //save function 
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveEmployee();
                    } else {
                        Notification.error("Please input details");
                    }

                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                };

                //edit function 
                $scope.ui.edit = function (employee, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.employee = employee;
                    $scope.model.employeeList.splice(index, 1);
                };


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //reset text
                    $scope.model.reset();

                    //load employee
                    employeeFactory.loadEmployee(function (data) {
                        $scope.model.employeeList = data;
                        console.log($scope.model.employeeList);
                    });
                };

                $scope.ui.init();

            });
}());