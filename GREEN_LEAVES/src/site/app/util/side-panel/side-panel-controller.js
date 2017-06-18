(function () {
    angular.module("appModule")
            .controller("sidePanelController", function ($scope, sidePanelService) {
                $scope.model = {};
                $scope.model.clientLedgerHistory = [];

                $scope.model.greenLeavesTotalSummary = {
                    "normalLeavesTotal": 0.0,
                    "superLeavesTotal": 0.0
                };

                $scope.getClientLedgerTotal = function () {
                    var sum = [0, 0, 0, 0];
                    angular.forEach($scope.model.clientLedgerHistory, function (value) {
                        sum[0] = sum[0] + value[2];
                        sum[1] = sum[1] + value[3];
                    });

                    var normalGLValue = $scope.model.greenLeavesTotalSummary.normalLeavesTotal * $scope.model.greenLeavesValue.normalLeavesTotal;
                    var superGLValue = $scope.model.greenLeavesTotalSummary.superLeavesTotal * $scope.model.greenLeavesValue.superLeavesTotal;
                    var glValue = normalGLValue + superGLValue;

                    sum[2] = sum[0] - sum[1] + glValue;
                    sum[3] = sum[1] - sum[0] - glValue;

                    sum[2] = sum[2] > 0 ? sum[2] : 0.0;
                    sum[3] = sum[3] > 0 ? sum[3] : 0.0;

                    return sum;
                };

                $scope.init = function () {
                    $scope.$watch("[client, date]", function () {
                        var client = $scope.client;
                        client = isNaN(client) ? null : client;//client number should be a number

                        var date = $scope.date;
                        if (client && date) {
                            //ledger history
                            sidePanelService.loadClientLedgerHistory(client, date)
                                    .success(function (data) {
                                        //client leger history
                                        $scope.model.clientLedgerHistory = data;
                                    })
                                    .error(function () {
                                        $scope.model.clientLedgerHistory = [];
                                    });

                            sidePanelService.loadReceiveSummary(date, client)
                                    .success(function (data, status, headers) {
                                        //green leaves receive total summry
                                        $scope.model.greenLeavesTotalSummary.normalLeavesTotal = data[0][0];
                                        $scope.model.greenLeavesTotalSummary.superLeavesTotal = data[0][1];
                                    })
                                    .error(function (data, status, headers) {
                                        $scope.model.greenLeavesTotalSummary = {
                                            "normalLeavesTotal": 0.0,
                                            "superLeavesTotal": 0.0
                                        };
                                        $scope.model.greenLeavesValue = {
                                            "normalLeavesTotal": 0.0,
                                            "superLeavesTotal": 0.0
                                        };
                                    });
                        } else {
                            $scope.model.clientLedgerHistory = [];
                            $scope.model.greenLeavesTotalSummary = {
                                "normalLeavesTotal": 0.0,
                                "superLeavesTotal": 0.0
                            };
                            $scope.model.greenLeavesValue = {
                                "normalLeavesTotal": 0.0,
                                "superLeavesTotal": 0.0
                            };
                        }
                    });
                };
                $scope.init();

            });
}());