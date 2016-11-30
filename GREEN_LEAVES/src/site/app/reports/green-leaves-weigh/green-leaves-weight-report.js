(function () {
    angular.module("greenLeavesWeighReportModule", ['chart.js', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

    angular.module("greenLeavesWeighReportModule")
            .factory("weighFactory", function ($http, systemConfig) {
                var factory = {};

                //load weigh detail
                factory.weighDetail = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };


                return factory;
            });

    angular.module("greenLeavesWeighReportModule")
            .controller("GreenLeavesWeighReportController", function ($scope, weighFactory, optionPane) {
                //ui models
                $scope.ui = {};

                //ui-function
                $scope.labels = ['Monday', 'TuesDay', 'Websday', 'Tursday', 'Friday', 'Saturday', 'Sunday'];
                $scope.series = ['Series A', 'Series B'];

                $scope.data = [
                    [65, 59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ];

                $scope.filterMessage = function () {
                    optionPane.defaultMessage("My message should be here");
                };


                $scope.details = [
                    {
                        client: "nidura",
                        route: "Panadura",
                        date: "05/04/2016",
                        normal: "100KG",
                        super: "200KG",
                        amount: "30000"
                    },
                    {
                        client: "nidura",
                        route: "Panadura",
                        date: "05/04/2016",
                        normal: "100KG",
                        super: "200KG",
                        amount: "30000"
                    },
                    {
                        client: "nidura",
                        route: "Panadura",
                        date: "05/04/2016",
                        normal: "100KG",
                        super: "200KG",
                        amount: "30000"
                    }
                ];
                return $scope.details;




            });
}());

