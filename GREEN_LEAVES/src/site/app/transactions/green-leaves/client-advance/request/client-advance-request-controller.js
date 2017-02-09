(function () {
    'use strict';

    var controller = function ($scope, $timeout, $filter, ConfirmPane, ClientAdvanceRequestModel, ClientAdvanceRequestService, Notification) {

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
            $scope.asAtDate = "This";
        };

        $scope.ui.addRequest = function () {
            $scope.model.addDetail()
                    .then(function () {
                        $scope.ui.focus();
                        $scope.asAtDate = "This";
                    });
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
                $scope.asAtDate = "This";
            } else {
                $scope.asAtDate = "Previous";
            }
            $scope.ui.focus();
        };

        $scope.ui.deleteRequest = function (index) {
            console.log("delete");
            $scope.model.deleteDetail(index);
            $scope.ui.focus();
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
                    Notification.error("client not found!");
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
                Notification.error("please select route!");
            } else if (!$scope.model.data.date) {
                Notification.error("please enter date!");
            } else if ($scope.model.data.clientAdvanceRequestDetails.length === 0) {
                Notification.error("please enter addvance client request!");
            } else if ($scope.model.data.date && $scope.model.data.route) {
                ConfirmPane.primaryConfirm("Save Green Leaves Advance Request!")
                        .confirm(function () {
                            $scope.model.saveClientApproveRequest()
                                    .then(function () {
                                        $scope.ui.mode = "IDEAL";
                                        $scope.model.clear();
                                    });
                        })
                        .discard(function () {
                            console.log("ReJECT");
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
            ConfirmPane.dangerConfirm("Delete Client Advance Request")
                    .confirm(function () {
                        $scope.model.deleteAdvanceRequest();
                    })
                    .discard(function () {
                        console.log("ReJECT");
                    });

        };

        $scope.ui.getClientLedgerTotal = function () {
            var sum = [0, 0, 0, 0];
            angular.forEach($scope.model.clientLedgerHistory, function (value) {
                sum[0] = sum[0] + value[2];
                sum[1] = sum[1] + value[3];
            });
            sum[2] = sum[0] - sum[1];
            sum[3] = sum[1] - sum[0];

            sum[2] = sum[2] > 0 ? sum[2] : 0.0;
            sum[3] = sum[3] > 0 ? sum[3] : 0.0;

            return sum;
        };

        $scope.ui.init = function () {
            $scope.ui.mode = "IDEAL";
            $scope.ui.type = "NORMAL";
            $scope.model.clear();

            $scope.$watch("[model.data.date,model.data.route]", function (newVal, oldVal) {
                if ($scope.model.data.route) {
                    $scope.model.findByRouteAndDate();
                }
            }, true);

            $scope.series = ['Normal', 'Super'];
            $scope.colors = ['#45b7cd', '#ff6384'];

            //client ledger auto refresh
            $scope.$watch('[model.tempData.client, asAtDate]', function () {

                var asAtDate = $scope.asAtDate;
                if (asAtDate === "This") {
                    var date = new Date();
                    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    $scope.model.tempData.asAtDate = lastDay;
                } else if (asAtDate === "Previous") {
                    var date = new Date();
                    var prev = new Date(date.getFullYear(), date.getMonth() - 1, date.getMonth());
                    var lastDay = new Date(prev.getFullYear(), prev.getMonth() + 1, 0);
                    $scope.model.tempData.asAtDate = lastDay;
                }
                $scope.model.getGreenLeavesHistory();

                if ($scope.model.tempData.client && $scope.model.tempData.asAtDate) {
                    ClientAdvanceRequestService.loadClientLedgerHistory($scope.model.tempData.client, $scope.model.tempData.asAtDate)
                            .success(function (data) {
                                $scope.model.clientLedgerHistory = data;
                            })
                            .error(function () {
                                $scope.model.clientLedgerHistory = [];
                            });
                } else {
                    $scope.model.clientLedgerHistory = [];
                }
            });

            $scope.$watch('model.tempData.client', function () {
                var c = $scope.model.client($scope.model.tempData.client);
                if (c) {
                    $scope.tempClient = c.clientNumber;
                } else {
                    $scope.tempClient = null;
                }
            });
        };

        $scope.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
        $scope.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        };

        $scope.ui.init();
    };

    angular.module("appModule")
            .controller("ClientAdvanceRequestController", controller);

}());