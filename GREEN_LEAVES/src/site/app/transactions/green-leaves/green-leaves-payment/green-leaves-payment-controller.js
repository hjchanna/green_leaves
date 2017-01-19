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

        $scope.ui.edit = function (voucher) {
            $scope.ui.mode = "EDIT";

            $timeout(function () {
                document.querySelectorAll("#paymentType")[0].focus();
            }, 10);
            $scope.model.tempData = voucher;
        };

        $scope.ui.discard = function () {
            $scope.ui.mode = "IDEAL";
            $timeout(function () {
                document.querySelectorAll("#transaction")[0].focus();
            }, 10);
        };

        $scope.ui.load = function () {
            $scope.model.getEachValue();
        };

        $scope.ui.selectDetail = function () {
            console.log('selectDetail');
            $scope.model.getEachValue();
            $scope.model.selectDetail();
//            $scope.ui.selectedDetailIndex = voucher.indexNo;
        };


        $scope.ui.modalOpen = function () {
            ModalDialog.modalOpen("cheque.html", "GreenLeavesPaymentController");
        };

        $scope.ui.insertChequeDetails = function () {
            $scope.model.insertChequeDetails();
            $scope.model.clear();
        };

        $scope.ui.save = function () {
            $scope.model.save();
        };
        $scope.ui.updateVoucher = function (tempData) {
            $scope.model.updateVoucher(tempData);
//            console.log(tempData);
        };

        $scope.ui.select = function (search) {
            $scope.model.selectAll(search,$scope.master);
        };

        //check box selected
        $scope.voucher = {
            roles: []
        };

        $scope.onSelect = function ($item, $model, $label) {
            $scope.model.getVoucher();
        };

        $scope.ui.init = function () {
            $scope.ui.mode = "IDEAL";
            $scope.model.getEachValue();
            $timeout(function () {
                document.querySelectorAll("#transaction")[0].focus();
            }, 10);
        };


        $scope.ui.init();

    };

    angular.module("appModule")
            .controller("GreenLeavesPaymentController", controller);
}());


