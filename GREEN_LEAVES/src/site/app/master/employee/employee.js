(function () {
    angular.module("employeeModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //----------http factory-----------
    angular.module("employeeModule")
            .factory("employeeFactory", function ($http, systemConfig) {
                var factory = {};


                //----load employee
                factory.loadEmployee = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/employees";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };


                //-----save employee
                factory.saveEmployee = function (summary, callBack) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/employees/save-employee";

                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callBack(data);
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
                $scope.validateInput = function () {
                    if ($scope.model.employee.name !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };

                $scope.http.saveEmployee = function () {
                    var details = $scope.model.employee;
                    var detailJSON = JSON.stringify(details);
                    console.log(detailJSON);

                    employeeFactory.saveEmployee(
                            detailJSON,
                            function (data) {
                                Notification.success("added success...");
                                $scope.model.employeeList.push(data);
//                                $scope.model.reset();
                                $scope.ui.mode = ("IDEAL");
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
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