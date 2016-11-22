(function () {
    //module
    angular.module("itemDepartmentModule", ['ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("itemDepartmentModule")
            .factory("itemDepartmentFactory", function ($http, systemConfig) {
                var factory = {};

                //load Item Department
                factory.loadItemDepartment = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/item-departments";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //update or save summary
                factory.saveSummary = function (summary, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/green-leaves-weigh/save-summary";
                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //insert department
                factory.insertDepartment = function (detail, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/item-departments/insert-detail";
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
                factory.deleteDepartmemt = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/item-departments/delete-detail/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;
            });
    //controller
    angular.module("itemDepartmentModule")
            .controller("itemDepartmentController", function ($scope, itemDepartmentFactory, Notification, $timeout) {

                //data models 
                $scope.model = {};
                $scope.model.department = {};
                $scope.model.tempDepartment = {};
//                $scope.model.department.name = null;
//                $scope.model.department.indexNo = 0;

                //ui models
                $scope.ui = {};
                $scope.ui.event = "";

                //http models
                $scope.http = {};

                $scope.maxSize = 5;
                $scope.bigTotalItems = 175;
                $scope.bigCurrentPage = 1;

                $scope.model.departmentList = [];


                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $timeout(function () {
                        document.querySelectorAll("#name")[0].focus();
                    }, 10);

                };
                $scope.ui.keyEvent = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.save();

                    }
                };

                //edit function
                $scope.ui.edit = function (department) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.department = department;
                    for (var i = 0; i < $scope.model.departmentList.length; i++) {
                        if ($scope.model.departmentList[i].indexNo === $scope.model.department.indexNo) {
                            $scope.model.departmentList.splice(i, 1);
                            $timeout(function () {
                                document.querySelectorAll("#name")[0].focus();
                            }, 10);
                        }
                    }


                };
                //save department
                $scope.ui.save = function () {
                    if ($scope.model.department) {
                        $scope.http.insertItemDepartment();
                        $timeout(function () {
                            document.querySelectorAll("#name")[0].focus();
                        }, 10);
                    } else {
                        Notification.error('No Item Department Name to Save ');
                    }

                };

                //ui init function
                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset model
                    $scope.model = {};
                    //load routes
                    itemDepartmentFactory.loadItemDepartment(function (data) {
                        $scope.model.departmentList = data;
                    });
                };
                $scope.ui.init();

                $scope.http.insertItemDepartment = function () {
                    var detail = $scope.model.department;
                    var detailJSON = JSON.stringify(detail);
                    //save detail dirrectly
                    itemDepartmentFactory.insertDepartment(
                            detailJSON,
                            function (data) {
                                if (data !== "") {
                                    for (var i = 0; i < $scope.model.departmentList.length; i++) {
                                        if ($scope.model.departmentList[i].indexNo === data.indexNo) {
                                            $scope.model.departmentList.splice(i, 1);
                                            break;
                                        }
                                    }
                                    Notification.success(data.indexNo+' save successfylly !');
                                    $scope.model.departmentList.push(data);
                                    $scope.model.department = {};

                                } else {
                                    Notification.error('Already Exists !');
                                }
                                $timeout(function () {
                                    document.querySelectorAll("#name")[0].focus();
                                }, 10);
                            }
                    , function (data) {
                        Notification.error(data.message);
                        $timeout(function () {
                            document.querySelectorAll("#name")[0].focus();
                        }, 10);
                    }
                    );
                };
                $scope.http.deleteDepartment = function (indexNo) {
                    if (indexNo) {
                        itemDepartmentFactory.deleteDepartmemt(indexNo, function () {
                            console.log('delete success');
                            for (var i = 0; i < $scope.model.departmentList.length; i++) {
                                if ($scope.model.departmentList[i].indexNo === indexNo) {
                                    $scope.model.departmentList.splice(i, 1);
                                    break;
                                }
                            }
                            Notification.error(indexNo + ' Department Delete Successfully');
                            $scope.ui.mode = "IDEAL";
                        });
                    }
                };
            });
}());