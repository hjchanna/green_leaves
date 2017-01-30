(function () {
    'use strict';
    var controller = function ($scope, $timeout, $filter, FertilizerModel, ConfirmPane, optionPane, InputPane, Notification) {
        $scope.model = new FertilizerModel();
        $scope.customerId;

        $scope.ui = {};

        $scope.ui.new = function () {
            $scope.ui.mode = "EDIT";
            $scope.model.clear();
            $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

            //focus branch
            $timeout(function () {
                angular.element(document.querySelectorAll("#branch"))[0].focus();
            }, 10);
        };

        $scope.ui.edit = function () {
            $scope.ui.mode = "EDIT";
        };

        //find by receive by branch and number
        $scope.ui.load = function (e) {
            var code = e ? e.keyCode || e.which : 13;
            if (code === 13) {
                $scope.model.load()
                        .then(function () {
                            $scope.ui.mode = "SELECTED";
                        });
            }
        };

        //find client by client number
        $scope.ui.searchClient = function (e) {
            var code = e ? e.keyCode || e.which : 13;
            if (code === 13) {
                var searchClient = $scope.model.searchClientByClientNo($scope.customerId);
                if (angular.isUndefined(searchClient)) {
                    Notification.error("client not found!");
                    $scope.model.tempData.client = null;
                } else {
                    var client = $scope.model.client(searchClient.indexNo);
                    $scope.model.tempData.client = client.indexNo;
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#normalLeaves"))[0].focus();
                    }, 10);
                }
            }
        };

        //save green leaves receive and receive details
        $scope.ui.save = function () {
            $scope.model.save()
                    .then(function () {
                        $scope.ui.mode = "IDEAL";
                        $scope.model.clear();
                        $scope.ui.insertProcessing = false;
                    });
        };

        $scope.ui.discard = function () {
            $scope.ui.mode = "IDEAL";
            $scope.model.clear();
        };

        //new client add remark and client is null
        $scope.ui.addDetail = function () {
            $scope.model.addDetail()
                    .then(function () {
                        $scope.ui.focus();
                    });
            };

        $scope.ui.editDetail = function (index) {
            $scope.model.editDetail(index);
            $scope.ui.focus();
        };

        $scope.ui.deleteDetail = function (index) {
            $scope.model.deleteDetail(index);
            $scope.ui.focus();
        };

        $scope.ui.init = function () {
            $scope.ui.mode = "IDEAL";
            $scope.ui.type = "NORMAL";
        };
        $scope.ui.init();
    };

    angular.module("appModule")
            .controller("FertilizerController", controller);
}());