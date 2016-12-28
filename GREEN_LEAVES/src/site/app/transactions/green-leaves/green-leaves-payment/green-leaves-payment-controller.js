(function () {
    'use strict';

    var controller = function ($scope, GreenLeavesPaymentModel, $timeout, ModalDialog) {
        $scope.model = new GreenLeavesPaymentModel();


        $scope.ui = {};

        $scope.ui.new = function () {
            $scope.ui.mode = "EDIT";
            $scope.model.clear();

            $timeout(function () {
                document.querySelectorAll("#type")[0].focus();
            }, 10);
        };

        $scope.ui.edit = function () {
            $scope.ui.mode = "EDIT";

            $timeout(function () {
                document.querySelectorAll("#type")[0].focus();
            }, 10);
        };

        $scope.ui.discard = function () {
            $scope.ui.mode = "IDEAL";
            $timeout(function () {
                document.querySelectorAll("#transaction")[0].focus();
            }, 10);
        };

        $scope.ui.selectDetail = function (indexNo) {
            $scope.model.selectDetail(indexNo);
            $scope.ui.selectedDetailIndex = indexNo;
        };

        $scope.ui.modalOpen = function () {
            ModalDialog.modalOpen("cheque.html", "GreenLeavesPaymentController");
        };
        
        $scope.ui.insertChequeDetails =function (){
            $scope.model.insertChequeDetails();
            $scope.model.clear();
        };

        $scope.ui.save = function () {
            $scope.model.save();
        };

        $scope.ui.init = function () {
            $scope.ui.mode = "IDEAL";

            $timeout(function () {
                document.querySelectorAll("#transaction")[0].focus();
            }, 10);
        };


        $scope.ui.init();
    };

    angular.module("appModule")
            .controller("GreenLeavesPaymentController", controller);
}());


