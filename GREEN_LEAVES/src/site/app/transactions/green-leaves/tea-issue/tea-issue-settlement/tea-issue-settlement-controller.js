(function () {
    //controller
    angular.module("appModule")
            .controller("TeaIssueSettlementController", function ($scope, TeaIssueSettlementModel, $filter, $timeout, Notification, ConfirmPane, optionPane) {
                $scope.model = new TeaIssueSettlementModel();

                $scope.ui = {};
                $scope.ui.ledgerType = "OFFICER";

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.model.clear();
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                    //focus date
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#route"))[0].focus();
                    }, 10);
                };

                $scope.ui.load = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.model.loadTeaIssue()
                                .then(function () {
                                    $scope.ui.mode = "SELECTED";
                                });
                    }
                };

                $scope.ui.delete = function () {
                    ConfirmPane.dangerConfirm("Do you sure want to delete current tea issue?")
                            .confirm(function () {
                                $scope.model.deleteTeaIssue();
                                $scope.ui.discard();
                            });
                };

                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };

                $scope.ui.focusRouteOfficer = function () {
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#routeOfficer"))[0].focus();
                    }, 10);
                };

                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";
                };

                //add detail to table
                $scope.ui.addDetail = function () {
                    if (!$scope.model.data.route) {
                        Notification.error("Please select a valid route.");
                    } else if (!$scope.model.data.date) {
                        Notification.error("Please enter a valid date.");
                    } else if (!$scope.model.tempData.client) {
                        Notification.error("Please enter a valid client.");
                    } else if (!$scope.model.tempData.teaIssueItem) {
                        Notification.error("Please select a valid tea issue item.");
                    } else if (!$scope.model.tempData.quantity) {
                        Notification.error("Please enter a valid tea issue quantity.");
                    } else {
                        var isDuplicate = $scope.model.detailDuplicateCheck($scope.model.tempData.client, $scope.model.tempData.teaIssueItem);
                        if (!isDuplicate) {
                            $scope.model.addDetail()
                                    .then(function () {
                                        $scope.ui.focusRouteOfficer();
                                    });
                        } else {
                            Notification.error("This client already has this tea issue item. Please edit it instead.");
                        }
                    }
                };

                $scope.ui.editDetail = function (index) {
                    $scope.model.editDetail(index);
                    $scope.ui.focusRouteOfficer();
                };

                $scope.ui.deleteDetail = function (index) {
                    ConfirmPane.dangerConfirm("Do you sure want to delete current tea issue detail?")
                            .confirm(function () {
                                $scope.model.deleteDetail(index)
                                        .then(function () {
                                            Notification.success("Tea issue detail deleted successfully.");
                                        }, function () {
                                            Notification.error("Failed to delete tea issue detail.");
                                        });
                            });
                };

                $scope.ui.save = function () {
                    if (!$scope.model.data.teaIssueDetails.length) {
                        Notification.error("Please add tea issue details to save.");
                    } else {
                        ConfirmPane.primaryConfirm("Do you sure want to save current tea issue?")
                                .confirm(function () {
                                    $scope.model.saveTeaIssue()
                                            .then(function () {
                                                optionPane.successMessage("Tea issue saved successfully.");
                                                $scope.ui.discard();
                                            });
                                });
                    }
                };
                
                $scope.ui.setLedgerType = function(type){
                    $scope.ui.ledgerType = type;
                };

                $scope.ui.searchClient = function (e) {
                    var code = e ? e.keyCode || e.which : 13;

                    if (code === 13) {
                        var clientNumber = $scope.model.tempData.clientNumber;

                        if (clientNumber) {
                            var client = $scope.model.clientByClientNumber(clientNumber);
                            if (client) {
                                $scope.model.tempData.client = client.indexNo;
                            } else {
                                Notification.error("Client number not found. Please search by name instead.");
                            }
                        }
                    }
                };

                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";

                    $scope.$watch("model.tempData.client", function () {
                        if ($scope.model.tempData.client) {
                            var client = $scope.model.client($scope.model.tempData.client);
                            $scope.model.tempData.clientNumber = client.clientNumber;

                            if ($scope.model.data.route !== client.route) {
                                var clientRoute = $scope.model.routeLabel(client.route);
                                optionPane.warningMessage("This client is from an another route. (" + clientRoute + ")");
                            }
                        }
                    }, true);
                };

                $scope.ui.init();
            });
}());