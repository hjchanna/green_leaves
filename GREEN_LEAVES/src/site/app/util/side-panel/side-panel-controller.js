(function () {
    angular.module("appModule")
            .controller("sidePanelController", function ($scope, sidePanelService) {
                $scope.model = {};
                $scope.model.clientLedgerHistory = [];
                $scope.model.clientHistory = [];
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
                    sum[2] = sum[0] - sum[1];
                    sum[3] = sum[1] - sum[0];

                    sum[2] = sum[2] > 0 ? sum[2] : 0.0;
                    sum[3] = sum[3] > 0 ? sum[3] : 0.0;

                    return sum;
                };

                $scope.init = function () {
                    $scope.$watch("client", function () {
                        console.log("Client changed: " + $scope.client);
                        console.log("Client changed: " + $scope.date);

                        var client = $scope.client;
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

                            sidePanelService.clientHistory(date, client)
                                    .success(function (data, status, headers) {
                                        //get client history 
                                        $scope.model.clientHistory = data;
                                    })
                                    .error(function (data, status, headers) {
                                        $scope.model.clientHistory = [];
                                    });

                            sidePanelService.getGreenLeavesReceiveSummryDetails(date, client)
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
                            $scope.model.clientHistory = [];
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