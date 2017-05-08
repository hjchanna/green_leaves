(function () {
    'use strict';

    var controller = function ($scope, $timeout, $filter, ConfirmPane, optionPane, ClientAdvanceRequestModel, Notification) {

        $scope.model = new ClientAdvanceRequestModel();
        $scope.model.clientLedgerHistory = [];

        $scope.ui = {};

        $scope.ui.new = function () {
            $scope.ui.mode = "EDIT";
            $scope.model.clear();

            //set current date
            $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

            $timeout(function () {
                document.querySelectorAll("#route")[0].focus();
            }, 10);
            $scope.asAtDate = "CURRENT";
        };

        $scope.ui.addRequest = function () {
            var client = $scope.model.tempData.client;
            var date = $scope.model.tempData.asAtDate;
            var requestStatus = $scope.model.requestDuplicateCheck(client, date);
            if (angular.isUndefined(requestStatus)) {
                $scope.model.addDetail()
                        .then(function () {
                            $scope.ui.focus();
                            $scope.asAtDate = "CURRENT";
                        });
            } else {
                Notification.error("The selected client already have an advance request on current date.");
            }
        };

        $scope.ui.discard = function () {
            $scope.ui.mode = "IDEAL";
            $scope.model.clear();
        };

        $scope.ui.edit = function () {
            $scope.ui.mode = "EDIT";
        };

        $scope.ui.editRequest = function (index) {
            $scope.model.editDetail(index);
            var asAtDate = $scope.model.tempData.asAtDate;
            var date = new Date();
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            if (angular.equals(lastDay, asAtDate)) {
                $scope.asAtDate = "CURRENT";
            } else {
                $scope.asAtDate = "PREVIOUS";
            }
            $scope.ui.focus();
        };

        $scope.ui.deleteRequest = function (index) {
            ConfirmPane.dangerConfirm("Do you sure want to delete advance request detail?")
                    .confirm(function () {
                        $scope.model.deleteDetail(index);
                        $scope.ui.focus();
                    });
        };

        $scope.ui.validateClient = function (event) {
            var key = event ? event.keyCode || event.which : 13;
            if (key === 13) {
                console.log($scope.tempClient);
                $scope.model.validateClient($scope.tempClient);
                if ($scope.model.tempData.client) {
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#amount"))[0].focus();
                    }, 10);
                } else {
                    Notification.error("Client cannot find by number. Please try by name instead.");
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#client"))[0].focus();
                    }, 10);
                }
            }
        };

        $scope.ui.forcusAmount = function (model) {
            $timeout(function () {
                angular.element(document.querySelectorAll("#amount"))[0].focus();
            }, 10);
        };

        $scope.ui.focus = function () {
            $timeout(function () {
                angular.element(document.querySelectorAll("#clientId"))[0].focus();
            }, 10);
        };

        $scope.ui.save = function () {
            if (!$scope.model.data.route) {
                Notification.error("Please select a valid route.");
            } else if (!$scope.model.data.date) {
                Notification.error("Please enter a valid date.");
            } else if ($scope.model.data.clientAdvanceRequestDetails.length === 0) {
                Notification.error("Please add one advance request at least.");
            } else if ($scope.model.data.date && $scope.model.data.route) {
                ConfirmPane.primaryConfirm("Do you sure want to save advance request?")
                        .confirm(function () {
                            $scope.model.saveClientApproveRequest()
                                    .then(function () {
                                        $scope.ui.mode = "IDEAL";
                                        $scope.model.clear();
                                    });
                        });

            }
        };

        $scope.ui.load = function (e) {
            var code = e ? e.keyCode || e.which : 13;
            if (code === 13) {
                $scope.model.load()
                        .then(function () {
                            //$scope.ui.mode = "IDEAL";
                            $scope.ui.mode = "SELECTED";
                        });
            }
        };

        $scope.ui.delete = function () {
            ConfirmPane.dangerConfirm("Do you sure want to delete advance request?")
                    .confirm(function () {
                        $scope.model.deleteAdvanceRequest();
                    });

        };

        $scope.ui.init = function () {
            $scope.ui.mode = "IDEAL";
            $scope.model.clear();

            //client ledger auto refresh
            $scope.$watch('[model.tempData.client, asAtDate]', function () {
                var asAtDate = $scope.asAtDate;
                if (asAtDate === "CURRENT") {
                    var date = new Date();
                    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    $scope.model.tempData.asAtDate = $filter('date')(lastDay, 'yyyy-MM-dd');//lastDay;
                } else if (asAtDate === "PREVIOUS") {
                    var date = new Date();
                    var prev = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
                    var lastDay = new Date(prev.getFullYear(), prev.getMonth() + 1, 0);
                    $scope.model.tempData.asAtDate = $filter('date')(lastDay, 'yyyy-MM-dd');//lastDay;
                }
                
                console.log($scope.model.tempData.asAtDate);
            });

            //client route checkup
            $scope.$watch('model.tempData.client', function () {
                var c = $scope.model.client($scope.model.tempData.client);
                if (c) {
                    $scope.tempClient = c.clientNumber;

                    if ($scope.model.data.route !== c.route) {
                        var clientRoute = $scope.model.routeLabel(c.route);
                        optionPane.warningMessage("This client is from an another route. (" + clientRoute + ")");
                    }
                } else {
                    $scope.tempClient = null;
                }
            });
        };
        $scope.ui.init();
    };

    angular.module("appModule")
            .controller("ClientAdvanceRequestController", controller);

}());