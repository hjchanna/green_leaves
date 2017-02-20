(function () {
//module
    angular.module("directTeaIssueModule", []);
    //controller
    angular.module("directTeaIssueModule")
            .controller("directTeaIssueController", function ($scope, DirectTeaIssueModel, $filter, $timeout, Notification, ConfirmPane, optionPane) {
                $scope.model = new DirectTeaIssueModel();

                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.model.clear();
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                    //focus date
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#clientId"))[0].focus();
                    }, 10);
                };

                //find by fertilizer by date and number
                $scope.ui.load = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.model.load()
                                .then(function () {
                                    $scope.ui.mode = "SELECTED";
                                });
                    }
                };

                $scope.ui.delete = function () {
                    ConfirmPane.dangerConfirm("Delete Direct Issue")
                            .confirm(function () {
                                $scope.model.deleteTeaIssue();
                                $scope.ui.discard();
                            })
                            .discard(function () {
                                console.log("REJECT");
                            });
                };

                //find client by client number
                $scope.ui.searchClient = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        var searchClient = $scope.model.searchClientByClientNo($scope.model.data.customerId);
                        if (angular.isUndefined(searchClient)) {
                            Notification.error("client not found!");
                            $scope.model.data.client = null;
                        } else {
                            var client = $scope.model.client(searchClient.indexNo);
                            $scope.model.data.client = client.indexNo;
                        }
                    }
                };

                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };

                $scope.ui.focus = function () {
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#clientId"))[0].focus();
                    }, 10);
                };

                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";
                };

                $scope.ui.getPrice = function (indexNo) {
                    $scope.model.data.price = $scope.model.teaGrade(indexNo).price;
                };

                //add detail to table
                $scope.ui.addDetail = function () {
                    if (!$scope.model.data.client) {
                        Notification.error("please select client");
                    } else if (!$scope.model.data.date) {
                        Notification.error("please select date");
                    } else if (!$scope.model.data.teaGrade) {
                        Notification.error("please select tea grade");
                    } else if (!$scope.model.data.qty) {
                        Notification.error("please select qty");
                    } else if ($scope.model.data.client
                            && $scope.model.data.date
                            && $scope.model.data.teaGrade) {
                        var requestStatus = $scope.model.requestDuplicateCheck($scope.model.data.client, $scope.model.data.teaGrade);
                        if (angular.isUndefined(requestStatus)) {
                            $scope.model.addDetail()
                                    .then(function () {
                                        $scope.ui.focus();
                                        $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                                    });
                        } else {
                            Notification.error("this client - tea grade is allrady exists!");
                        }
                    }
                };

                $scope.ui.editDetail = function (index) {
                    $scope.model.editDetail(index);
                    $scope.ui.focus();
                };

                $scope.ui.deleteDetail = function (index) {
                    $scope.model.deleteDetail(index);
                    $scope.ui.focus();
                };

                $scope.ui.save = function () {
                    if (!$scope.model.teaIssueList.length) {
                        Notification.error("please add tea issue requests");
                    } else if ($scope.model.teaIssueList.length) {
                        ConfirmPane.primaryConfirm("Save Direct Tea Issue")
                                .confirm(function () {
                                    $scope.model.save()
                                            .then(function () {
                                                optionPane.successMessage("Direct Tea Issue Save Success!");
                                                $scope.ui.discard();
                                            });
                                });
                    }
                };

                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";
                    $scope.$watch("[model.data.price,model.data.qty]", function (newVal, oldVal) {
                        $scope.model.data.amount = parseFloat($scope.model.data.price * $scope.model.data.qty);
                    }, true);
                };

                $scope.ui.init();
            });
}());