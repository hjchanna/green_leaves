(function () {
    'use strict';

    var controller = function ($scope, $timeout, GreenLeavesReceiveModel) {
        $scope.model = new GreenLeavesReceiveModel();

        $scope.ui = {};

        $scope.ui.new = function () {
            $scope.ui.mode = "NEW";
            $scope.model.clear();
        };

        $scope.ui.edit = function () {
            $scope.ui.mode = "EDIT";
        };

        $scope.ui.load = function () {
            $scope.model.load()
                    .then(function () {
                        $scope.ui.mode = "SELECTED";
                    });
        };

        $scope.ui.save = function () {
            $scope.model.save()
                    .then(function () {
                        $scope.ui.mode = "IDEAL";
                        $scope.model.clear();
                    });
        };

        $scope.ui.discard = function () {
            $scope.ui.mode = "IDEAL";
            $scope.model.clear();
        };

        $scope.ui.addDetail = function () {
            $scope.model.addDetail()
                    .then(function () {
                        $timeout(function () {
                            angular.element(document.querySelectorAll("#client"))[0].focus();
                        }, 10);
                    });
        };

        $scope.ui.editDetail = function (index) {
            $scope.model.editDetail(index);
            $timeout(function () {
                angular.element(document.querySelectorAll("#client"))[0].focus();
            }, 10);
        };

        $scope.ui.deleteDetail = function (index) {
            $scope.model.deleteDetail(index);
            $timeout(function () {
                angular.element(document.querySelectorAll("#client"))[0].focus();
            }, 10);
        };

        $scope.ui.init = function () {
            $scope.ui.mode = "IDEAL";
        };
        $scope.ui.init();


        /*
         //current ui mode IDEAL, SELECTED, NEW, EDIT
         $scope.model = {};
         
         //date store model
         $scope.model.tempData = {};
         $scope.model.routes = {};
         $scope.model.clients = {};
         $scope.model.total = {};
         
         $scope.ui = {};
         $scope.ui.mode = "NEW";
         
         $scope.ui.new = function () {
         $scope.ui.mode = "NEW";
         $timeout(function () {
         angular.element(document.querySelectorAll("#date"))[0].focus();
         }, 10);
         };
         
         $scope.ui.forcus = function () {
         $timeout(function () {
         angular.element(document.querySelectorAll("#client"))[0].focus();
         }, 10);
         };
         
         $scope.ui.edit = function () {
         $scope.ui.mode = "EDIT";
         };
         
         $scope.ui.resetTempRequest = function () {
         $scope.model.tempData = {
         "indexNo": null,
         "branch": null,
         "greenLeavesReceive": null,
         "normalLeavesQuantity": 0,
         "superLeavesQuantity": 0,
         "client": null,
         "clientModel": null
         };
         };
         
         //---------------- table functions -------------------
         
         //insert data datable 
         $scope.ui.insertTableData = function () {
         if ($scope.model.tempData.client && parseInt($scope.model.tempData.normalLeavesQuantity + $scope.model.tempData.superLeavesQuantity) > 0) {
         if ($scope.model.data.checkGreenLeavesReseveDetailDuplicate($scope.model.tempData.client)) {
         Notification.error("this customer green leaves is already exists!");
         } else {
         $scope.model.tempData.clientModel = $scope.ui.getClient($scope.model.tempData.client);
         if ($scope.model.data.addReceiveDetail($scope.model.tempData)) {
         //validation succeed and added
         $scope.ui.totalSuperLevesQty;
         $scope.ui.totalNormalLevesQty();
         $scope.ui.forcus();
         $scope.ui.resetTempRequest();
         }
         }
         } else {
         Notification.error("please enter all inputs");
         }
         };
         
         //edit data table
         $scope.ui.editTableData = function (index) {
         $scope.model.tempData = $scope.model.data.editRecieveDetail(index);
         $scope.ui.totalSuperLevesQty;
         $scope.ui.totalNormalLevesQty();
         };
         
         //delete row data table
         $scope.ui.deleteTableData = function (index) {
         $scope.model.data.deleteReceiveDetail(index);
         $scope.ui.totalSuperLevesQty;
         $scope.ui.totalNormalLevesQty();
         };
         
         //---------------- ui fucntions -------------------
         //green leaves data save
         $scope.ui.save = function () {
         console.log($scope.model.data.route);
         if ($scope.model.data.route === null) {
         Notification.error("please enter route");
         } else {
         var data = JSON.stringify($scope.model.data);
         GreenLeavesReceiveService.saveGreenLeavesDetail(data)
         .success(function (data, status, headers) {
         $scope.ui.init();
         optionPane.successMessage("green leaves receive saved successfully.");
         $scope.selectedRow = -1;
         })
         .error(function (data, status, headers) {
         optionPane.dangerMessage("green leaves receive save failed.");
         });
         }
         };
         
         //---------------- validation functions -------------------
         $scope.ui.getClientLabel = function (client) {
         var label;
         angular.forEach($scope.model.clients, function (value, key) {
         if (value.indexNo === client) {
         label = value.indexNo + "-" + value.name;
         return;
         }
         });
         return label;
         };
         
         $scope.ui.getClient = function (clientId) {
         var client;
         angular.forEach($scope.model.clients, function (value, key) {
         if (value.indexNo === clientId) {
         client = value;
         return;
         }
         });
         return client;
         };
         
         $scope.ui.totalSuperLevesQty = function () {
         var factorySuperLeavesTotal = $scope.model.total.superLeavesTotal;
         var factoryNormalLeavesTotal = $scope.model.total.normalLeavesTotal;
         
         var superLeavesTotal = $scope.model.data.getSuperLeavesQuantityTotal();
         var factoryNormalTotal = $scope.model.data.getNormalLeavesQuantityTotal();
         
         $scope.model.total.defaranceSuperLeavesTotal = parseFloat(factorySuperLeavesTotal - superLeavesTotal);
         $scope.model.total.defaranceNormalLeavesTotal = parseFloat(factoryNormalLeavesTotal - factoryNormalTotal);
         
         return $scope.model.data.getSuperLeavesQuantityTotal();
         };
         
         $scope.ui.totalNormalLevesQty = function () {
         return $scope.model.data.getNormalLeavesQuantityTotal();
         };
         
         //table selection function
         $scope.selectedRow = null;
         $scope.ui.setClickedRow = function (index, route) {
         $scope.selectedRow = index;
         $scope.model.data.route = route.indexNo;
         
         //get selected row green leaves weight super leaves totala and normal leaves total
         var data = JSON.stringify($scope.model.data);
         GreenLeavesReceiveService.getSuperLeavesTotalAndNormalLeavesTotal(data)
         .success(function (data, status, headers) {
         $scope.model.total.superLeavesTotal = parseFloat(data[0]);
         $scope.model.total.normalLeavesTotal = parseFloat(data[1]);
         })
         .error(function (data, status, headers) {
         });
         };
         
         $scope.ui.init = function () {
         
         $scope.ui.mode = "IDEAL";
         
         //create new model
         $scope.model.data = new GreenLeavesReceiveModel();
         
         //set deafault date
         $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
         
         //load routes
         GreenLeavesReceiveService.loadRoutes()
         .success(function (data, status, headers) {
         $scope.model.routes = data;
         })
         .error(function (data, status, headers) {
         
         });
         
         //load clients
         GreenLeavesReceiveService.loadClients()
         .success(function (data, status, headers) {
         $scope.model.clients = data;
         })
         .error(function (data, status, headers) {
         
         });
         
         };
         
         $scope.ui.init();*/
    };

    angular.module("appModule")
            .controller("GreenLeavesReceiveController", controller);
}());