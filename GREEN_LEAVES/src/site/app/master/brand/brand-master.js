(function () {
//module
    angular.module("brandMasterModule", ["ngAnimate", "ui.bootstrap"]);
    //controller
    angular.module("brandMasterModule")
            .controller("brandMasterController", function ($scope) {
                $scope.brand = [
                    {
                        indexNo: "001",
                        name: "brand 1"
                    },
                    {
                        indexNo: "002",
                        name: "brand 2"
                    },
                    {
                        indexNo: "003",
                        name: "brand 3"
                    },
                    {
                        indexNo: "004",
                        name: "brand 5"
                    },
                    {
                        indexNo: "005",
                        name: "brand 5"
                    }
                ];

                $scope.totalItems = 64;
                $scope.currentPage = 4;

                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };

                $scope.pageChanged = function () {
                    $log.log('Page changed to: ' + $scope.currentPage);
                };

                $scope.maxSize = 5;
                $scope.bigTotalItems = 175;
                $scope.bigCurrentPage = 1;
            });
}());