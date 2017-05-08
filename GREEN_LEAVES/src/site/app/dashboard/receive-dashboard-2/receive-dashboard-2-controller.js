(function () {
    "use strict";

    angular.module("appModule")
            .controller("ReceiveDashboard2Controller", function ($scope, ReceiveDashboard2Service, Notification) {
                $scope.model = {};
                $scope.model.data = {};
                $scope.model.data.receiveDetails = [];
                $scope.model.selectedReceiveDetail = -1;

                $scope.model.routes = [];

                $scope.ui = {};

                $scope.chart = {};
                $scope.chart.series = ['FACTORY', 'COLLECTION'];
                $scope.chart.colors = ['#45b7cd', '#ff6384'];
                $scope.chart.options = {
                    responsive: true,
                    maintainAspectRatio: false
                };
                $scope.chart.data = [];

                $scope.ui.applyFilters = function () {
                    if ($scope.model.fromDate && $scope.model.toDate) {
                        ReceiveDashboard2Service.findReceiveDetails($scope.model.fromDate, $scope.model.toDate)
                                .success(function (data) {
                                    $scope.model.data = data;
                                    $scope.fillchartData();
                                })
                                .error(function () {
                                    $scope.model.data = {};
                                });
                    }else{
                        Notification.error("Please enter from date and to date.");
                    }
                };

                $scope.ui.selectReceiveDetail = function (index) {
                    $scope.model.selectedReceiveDetail = index;
                };

                $scope.ui.routeLabel = function (routeIndex) {
                    var label;
                    angular.forEach($scope.model.routes, function (route) {
                        if (route.indexNo === routeIndex) {
                            label = route.indexNo + " - " + route.name;
                        }
                    });

                    return label;
                };

                $scope.ui.init = function () {
                    ReceiveDashboard2Service.loadRoutes()
                            .success(function (data) {
                                $scope.model.routes = data;
                            })
                            .error(function () {
                                $scope.model.routes = [];
                            });

                };
                $scope.ui.init();

                $scope.fillchartData = function () {
                    $scope.chart.labels = [];
                    $scope.chart.data = [[], []];
                    angular.forEach($scope.model.data.receiveDetails, function (value) {
                        $scope.chart.labels.push(value.routeIndexNo + " - " + value.routeName.substring(0, 6));
                        $scope.chart.data[0].push(value.factoryNormal + value.factorySuper);
                        $scope.chart.data[1].push(value.collectionNormal + value.collectionSuper);
                    });
                    console.log($scope.chart.data);
                };

            });
}());