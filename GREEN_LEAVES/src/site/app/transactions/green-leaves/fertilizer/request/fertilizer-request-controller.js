(function () {
    'use strict';
    var controller = function ($scope, $filter, FertilizerRequestModel, $timeout, Notification, optionPane, ConfirmPane) {
        $scope.model = new FertilizerRequestModel();
        $scope.customerId;

        $scope.ui = {};

        $scope.ui.new = function () {
            $scope.ui.mode = "EDIT";
            $scope.model.clear();
            $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

            //focus route
            $timeout(function () {
                angular.element(document.querySelectorAll("#route"))[0].focus();
            }, 10);
        };

        $scope.ui.forcusItemSelections = function () {
            $timeout(function () {
                angular.element(document.querySelectorAll("#client"))[0].focus();
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
                var searchClient = $scope.model.searchClientByClientNo($scope.model.tempData.customerId);
                if (angular.isUndefined(searchClient)) {
                    Notification.error("client not found!");
                    $scope.model.tempData.client = null;
                } else {
                    var client = $scope.model.client(searchClient.indexNo);
                    $scope.model.tempData.client = client.indexNo;
                    $timeout(function () {
                        angular.element(document.querySelectorAll("#item"))[0].focus();
                    }, 10);
                }
            }
        };

        $scope.ui.discard = function () {
            $scope.ui.mode = "IDEAL";
            $scope.model.clear();
        };

        //add detail to table
        $scope.ui.addDetail = function () {
            if (!$scope.model.tempData.client) {
                Notification.error("please select client");
            } else if (!$scope.model.tempData.fertlizerItem) {
                Notification.error("please select fertilizer item");
            } else if (!$scope.model.tempData.qty) {
                Notification.error("please item qty");
            } else if ($scope.model.tempData.client
                    && $scope.model.tempData.fertlizerItem
                    && $scope.model.tempData.qty) {
                var requestStatus = $scope.model.requestDuplicateCheck($scope.model.tempData.fertlizerItem, $scope.model.tempData.client);
                if (angular.isUndefined(requestStatus)) {
                    $scope.model.addDetail()
                            .then(function () {
                                $scope.ui.focus();
                            });
                } else {
                    Notification.error("this item is allrady exists !");
                }

            }
        };

        $scope.ui.focus = function () {
            $timeout(function () {
                angular.element(document.querySelectorAll("#client"))[0].focus();
            }, 10);
        };

        $scope.ui.edit = function () {
            $scope.ui.mode = "EDIT";
        };

//        $scope.ui.delete = function () {
//            ConfirmPane.dangerConfirm("Delete Fertilizer")
//                    .confirm(function () {
//                        $scope.model.deleteFertilizer();
//                        optionPane.dangerMessage("Delete Fertilizer Success!");
//                        $scope.ui.mode = "IDEAL";
//                        $scope.model.clear();
//                    })
//                    .discard(function () {
//                        console.log("ReJECT");
//                    });
//
//        };

        $scope.ui.editDetail = function (index) {
            $scope.model.editDetail(index);
            $scope.ui.focus();
        };

        $scope.ui.deleteDetail = function (index) {
            ConfirmPane.dangerConfirm("Delete Fertilizer Detail")
                    .confirm(function () {
                        $scope.model.deleteDetail(index);
                        $scope.ui.focus();
                    })
                    .discard(function () {
                        console.log("REJECT");
                    });
        };

        $scope.ui.save = function () {
            if (!$scope.model.data.route) {
                Notification.error("please select route");
            } else if (!$scope.model.data.routeOfficer) {
                Notification.error("please select route officer");
            } else if (!$scope.model.data.routeHelper) {
                Notification.error("please select route heleper");
            } else if (!$scope.model.data.vehicle) {
                Notification.error("please select vehicle");
            } else if (!$scope.model.data.date) {
                Notification.error("please select date");
            } else if (!$scope.model.data.tfertilizerDetailList.length) {
                Notification.error("please select details");
            } else if ($scope.model.data.route
                    && $scope.model.data.routeOfficer
                    && $scope.model.data.routeHelper
                    && $scope.model.data.vehicle
                    && $scope.model.data.date) {
                ConfirmPane.primaryConfirm("Fertilizer Save")
                        .confirm(function () {
                            $scope.model.save()
                                    .then(function (data) {
                                        optionPane.successMessage("Fertilizer Save Success! Transaction Number " + data);
                                        $scope.model.clear();
                                        $scope.ui.mode = "IDEAL";
                                        $scope.ui.type = "NORMAL";
                                    });
                        })
                        .discard(function () {
                            console.log("REJECT");
                        });
            }
            ;
        };

        $scope.ui.getRouteOfficerAndRouteHelperAndVehicle = function (model) {
            $scope.model.getRouteOfficerAndRouteHelperAndVehicle(model);
        };

        $scope.ui.init = function () {
            $scope.ui.mode = "IDEAL";
            $scope.ui.type = "NORMAL";

            $scope.$watch("[model.tempData.price,model.tempData.qty]", function (newVal, oldVal) {
                $scope.model.tempData.amount = parseFloat($scope.model.tempData.price * $scope.model.tempData.qty);
            }, true);

            $scope.$watch("model.tempData.fertlizerItem", function (newVal, oldVal) {
                if ($scope.model.tempData.fertlizerItem) {
                    var fertiLizerItem = $scope.model.product($scope.model.tempData.fertlizerItem);
                    $scope.model.tempData.price = fertiLizerItem.salePrice;
                    $scope.model.tempData.instalmentCount = fertiLizerItem.instalmentCount;
                }
            }, true);
        };
        $scope.ui.init();
    };

    angular.module("appModule")
            .controller("FertilizerRequestController", controller);
}());