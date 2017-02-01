(function () {
    'use strict';
    var controller = function ($scope, $filter, FertilizerModel, $timeout, Notification, ConfirmPane) {
        $scope.model = new FertilizerModel();
        $scope.customerId;

        $scope.ui = {};

        //Douple click duplicate bug fix
        $scope.ui.insertProcessing = false;

        $scope.ui.new = function () {
            $scope.ui.mode = "EDIT";
            $scope.model.clear();
            $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

            //focus date
            $timeout(function () {
                angular.element(document.querySelectorAll("#date"))[0].focus();
            }, 10);
        };

        //find by fertilizer by date and number
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
                    $scope.model.data.client = null;
                } else {
                    var client = $scope.model.client(searchClient.indexNo);
                    $scope.model.data.client = client.indexNo;
                }
            }
        };

        $scope.ui.discard = function () {
            $scope.ui.mode = "IDEAL";
            $scope.model.clear();
        };

        //add detail to table
        $scope.ui.addDetail = function () {
            $scope.model.addDetail()
                    .then(function () {
                        $scope.ui.focus();
                    });
        };

        $scope.ui.focus = function () {
            $timeout(function () {
                angular.element(document.querySelectorAll("#item"))[0].focus();
            }, 10);
        };

        $scope.ui.edit = function () {
            $scope.ui.mode = "EDIT";
        };

        $scope.ui.delete = function () {
            ConfirmPane.dangerConfirm("Delete Fertilizer")
                    .confirm(function () {
                        $scope.model.deleteFertilizer();
                    })
                    .discard(function () {
                        console.log("ReJECT");
                    });

        };

        $scope.ui.getPrice = function (indexNo) {
            $scope.model.tempData.price = $scope.model.product(indexNo).salePrice;
        };

        $scope.ui.editDetail = function (index) {
            $scope.model.editDetail(index);
            $scope.ui.focus();
        };

        $scope.ui.deleteDetail = function (index) {
            $scope.model.deleteDetail(index);
            $scope.ui.focus();
        };

        $scope.ui.save = function () {
            if (!$scope.ui.insertProcessing) {
                $scope.ui.insertProcessing = true;
                $scope.model.save()
                        .then(function () {
                            $scope.ui.mode = "IDEAL";
                            $scope.model.clear();
                            $scope.ui.insertProcessing = false;
                        });
            }
        };

        $scope.ui.init = function () {
            $scope.ui.mode = "IDEAL";
            $scope.ui.type = "NORMAL";

            $scope.$watch("[model.tempData.price,model.tempData.qty]", function (newVal, oldVal) {
                $scope.model.tempData.amount = parseFloat($scope.model.tempData.price * $scope.model.tempData.qty);
            }, true);
        };
        $scope.ui.init();
    };

    angular.module("appModule")
            .controller("FertilizerApproveController", controller);
}());