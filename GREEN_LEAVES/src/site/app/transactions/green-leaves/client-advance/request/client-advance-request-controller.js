(function () {
    'use strict';

    var controller = function ($scope, $timeout, $filter, ConfirmPane, ClientAdvanceRequestModel, ClientAdvanceRequestService) {

        $scope.model = new ClientAdvanceRequestModel();
        $scope.model.clientLedgerHistory = [];
//        $scope.tempClient = null;


        $scope.ui = {};

        $scope.ui.new = function () {
            $scope.ui.mode = "EDIT";
            $scope.model.clear();

            //set current date
            $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

            $timeout(function () {
                document.querySelectorAll("#route")[0].focus();
            }, 10);
        };

        $scope.ui.addRequest = function () {
            console.log("add");
            $scope.model.addDetail()
                    .then(function () {
                        $scope.ui.focus();
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
            console.log("edit");
            $scope.model.editDetail(index);
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
                        angular.element(document.querySelectorAll("#asAtDate"))[0].focus();
                    }, 10);
                } else {
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#client"))[0].focus();
                    }, 10);
                }
            }
        };

        $scope.ui.focus = function () {
            $timeout(function () {
                angular.element(document.querySelectorAll("#client"))[0].focus();
            }, 10);
        };

        $scope.ui.save = function () {
            $scope.model.saveClientApproveRequest()
                    .then(function () {
                        $scope.ui.mode = "IDEAL";
                        $scope.model.clear();
                    });
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

//            $scope.$watch("[model.data.date,model.data.route]", function (newVal, oldVal) {
//                if ($scope.model.data.route) {
//                    $scope.model.findByRouteAndDate();
//                }
//            }, true);
//
//            $scope.$watch("[model.data.date,model.data.route,model.tempData.client]", function (newVal, oldVal) {
//                if ($scope.model.data.route) {
//                    $scope.model.getGreenLeavesHistory();
//                }
//            }, true);
//
//            $scope.$watch("[model.tempData.asAtDate,model.tempData.client]", function (newVal, oldVal) {
//                if ($scope.model.tempData.client) {
//                    $scope.model.getClientHistory();
//                }
//            }, true);

//            $scope.series = ['Normal', 'Super'];
//            $scope.colors = ['#45b7cd', '#ff6384'];

            //client ledger auto refresh
            $scope.$watch('[model.tempData.client, model.tempData.asAtDate]', function () {
                console.log("watch");
                var client = $scope.model.tempData.client;
                var asAtDate = $scope.model.tempData.asAtDate;

                if (client && asAtDate) {
                    ClientAdvanceRequestService.loadClientLedgerHistory(client, asAtDate)
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
                }else{
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