(function () {
    'use strict';

    var controller = function ($scope, GreenLeavesPaymentModel, $timeout, ModalDialog, optionPane) {
        $scope.model = new GreenLeavesPaymentModel();


        $scope.ui = {};

        $scope.ui.new = function () {
            $scope.ui.mode = "EDIT";
            $scope.model.clear();
        };

        $scope.ui.edit = function (voucher) {
            $scope.ui.mode = "EDIT";
            $scope.model.tempData = voucher;
        };

        $scope.ui.discard = function () {
            $scope.ui.mode = "IDEAL";
        };

        $scope.ui.load = function () {
            $scope.model.getEachValue();
        };

        $scope.ui.selectDetail = function () {
            $scope.model.getEachValue();
            $scope.model.selectDetail();
        };


        $scope.ui.modalOpen = function () {
            ModalDialog.modalOpen("cheque.html", "GreenLeavesPaymentController");
        };

        $scope.ui.insertChequeDetails = function () {
            $scope.model.insertChequeDetails();
            $scope.model.clear();
        };

        $scope.ui.save = function () {
            var isSave = false;
            angular.forEach($scope.model.vouchers, function (voucher) {
                if (voucher.chxSelected) {
                    isSave = true;
                    return;
                }
            });
            if (isSave) {
                $scope.model.save();
                $scope.chxSelectAll=false;
                optionPane.successMessage("Save Successfully");
            } else {
                optionPane.dangerMessage("Select Vouchers to Save...!");
            }
        };
        $scope.ui.updateVoucher = function (tempData) {
            $scope.model.updateVoucher(tempData);
        };

        $scope.ui.select = function (search) {
            $scope.model.selectAll(search, $scope.chxSelectAll);
        };

        $scope.onSelect = function ($item, $model, $label) {
            $scope.model.getVoucher();
        };

        $scope.ui.init = function () {
            $scope.ui.mode = "IDEAL";
            $scope.model.getEachValue();
            $scope.search = {
                client: "",
                employee: "",
                paymentType: ""
            };
        };

        //selected class start
        $scope.addHeart = function ($event, voucher) {
            var element = angular.element($event.currentTarget);

            if (element.hasClass('selected')) {
                $scope.model.doSelectVoucher(false, voucher);
            } else {
                $scope.model.doSelectVoucher(true, voucher);
            }
            $scope.model.selectDetail();
        };
        //select class end
        $scope.ui.loadVoucherFromType = function (transactionType) {
            $scope.chxSelectAll = false;
            $scope.model.getVoucher(transactionType.indexNo);
        };
        $scope.ui.init();
    };

    angular.module("appModule")
            .controller("GreenLeavesPaymentController", controller);
}());


