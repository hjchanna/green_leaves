(function () {
    angular.module("appModule")
            .controller("MasterController", function ($scope, $routeParams, MasterService) {
                $scope.model = {};
                $scope.model.totalItems = 8000;
                $scope.model.currentPage = 1;
                $scope.model.maxSize = 5;
                $scope.model.itemsPerPage = 100;

                $scope.model.controller = null;
                $scope.model.keyword = null;
                $scope.model.data = {};
                $scope.model.list = [];

                $scope.ui = {};
                $scope.ui.mode = "IDEAL";

                $scope.ui.load = function () {
                    if (!$scope.ui.loading) {
                        $scope.ui.loading = true;


                        MasterService.totalItems($scope.model.controller, $scope.model.keyword)
                                .success(function (totalItems) {
                                    $scope.model.totalItems = totalItems;

                                    MasterService.load($scope.model.controller, $scope.model.keyword, $scope.model.currentPage)
                                            .success(function (data) {
                                                $scope.model.list = data;
                                                $scope.ui.loading = false;
                                            })
                                            .error(function () {
                                                $scope.model.list = [];
                                                $scope.ui.loading = false;
                                            });
                                })
                                .error(function () {
                                    $scope.model.totalItems = 0;
                                    $scope.ui.loading = false;
                                });

                    }
                };

                $scope.ui.new = function () {
                    $scope.model.data = {};
                    $scope.ui.mode = "EDIT";
                };

                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";
                };

                $scope.ui.delete = function () {

                };

                $scope.ui.select = function (model) {
                    $scope.ui.mode = "SELECTED";
                    $scope.model.data = model;
                };

                $scope.ui.save = function () {

                };

                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                };

                $scope.ui.init = function () {
                    $scope.model.controller = $routeParams.controller;
                    $scope.ui.load();

                    $scope.$watch("[model.currentPage, model.keyword]", function () {
                        console.log("AA");
                        $scope.ui.load();
                    });
                };
                $scope.ui.init();
            });
}());