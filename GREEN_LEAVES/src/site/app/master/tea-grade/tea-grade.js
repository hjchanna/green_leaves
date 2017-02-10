(function () {
    angular.module("teaGradeModule", []);

    angular.module("teaGradeModule")
            .factory("teaGradeFactory", function ($http, systemConfig) {
                var factory = {};

                factory.loadTeaGrade = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/tea-grade";

                    $http.get(url)
                            .success(function (data, status, header) {
                                callback(data);
                            })
                            .error(function (data, status, header) {

                            });
                };

                factory.saveTeaGrade = function (teaGrade, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/tea-grade/save-teagrade";

                    $http.post(url, teaGrade)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorCallback) {
                                    errorCallback(data);
                                }
                            });

                };
                
                factory.deleteCategory = function (indexNo, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/tea-grade/delete-teagrade/" + indexNo;

                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorCallback) {
                                    errorCallback(data);
                                }
                            });

                };

                return factory;
            });

    angular.module("teaGradeModule")
            .controller("teaGradeController", function ($scope, teaGradeFactory, Notification, $timeout) {

                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //focus
                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#nameText")[0].focus();
                    }, 10);
                };

                //new funtion
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.ui.focus();
                };

                $scope.model.reset = function () {
                    $scope.model.teaGrade = {
                        "indexNo": null,
                        "name": null,
                        "price": null
                    };
                };

                $scope.validateInput = function () {
                    if ($scope.model.teaGrade.name) {
                        return true;
                    } else {
                        return false;
                    }
                };

                $scope.http.saveTeaGrade = function () {
                    var detail = $scope.model.teaGrade;
                    var detailJSON = JSON.stringify(detail);
                    //save
                    teaGradeFactory.saveTeaGrade(
                            detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + "Save Successfully");
                                $scope.model.teaGradeList.push(data);
                                $scope.model.reset();
                                $scope.ui.focus();
                            },
                            function (data) {
                                $scope.ui.focus();
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.http.deleteTeaGrade = function (indexNo, index) {
                    teaGradeFactory.deleteCategory(indexNo
                            , function () {
                                $scope.model.teaGradeList.splice(index, 1);
                                Notification.success(indexNo + " - " + "Delete Successfully");
                            },
                            function (data) {
                                Notification.error(data);
                            });
                };
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveTeaGrade();
                    } else {
                        Notification.error("please input detail");
                        $scope.ui.focus();
                    }
                };

                //edit funtion
                $scope.ui.edit = function (teaGrades, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.teaGrade = teaGrades;
                    $scope.model.teaGradeList.splice(index, 1);
                    $scope.ui.focus();
                };



                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";

                    teaGradeFactory.loadTeaGrade(function (data) {
                        console.log(data);
                        $scope.model.teaGradeList = data;
                    });
                };
                $scope.ui.init();
            });
}());