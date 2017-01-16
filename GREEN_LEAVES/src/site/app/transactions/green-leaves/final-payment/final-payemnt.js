(function () {
    angular.module("finalPaymentModule")

            .controller("finalPaymentModuleController", function ($scope, $filter, ModalDialog, $timeout, FinalPaymentModel, optionPane) {

                $scope.showBfAndCoinValues = true;
                $scope.model = new FinalPaymentModel();

                $scope.ui = {};

                //default date set
                $scope.year = $filter('date')(new Date(), 'yyyy');
                $scope.month = $filter('date')(new Date(), 'MM');
                //A /Payment,L/Installment,Fertilizer(P),Fertilizer(C),Tea,Savings,Other
                $scope.showOther = function () {
                    $scope.otherValues = true;
                    $scope.showGreenLeaveValues = false;
                    $scope.showBfAndCoinValues = false;
                };

                //GL Value
                $scope.showGLValues = function () {
                    $scope.showGreenLeaveValues = true;
                    $scope.otherValues = false;
                    $scope.showBfAndCoinValues = false;
                };

                //B/F,Coins
                $scope.showBfAndCoins = function () {
                    $scope.showBfAndCoinValues = true;
                    $scope.otherValues = false;
                    $scope.showGreenLeaveValues = false;
                };
                //modal Open
                $scope.modalOpen = function () {
                    ModalDialog.modalOpen("lg", "b/fModal.html", "finalPaymentModuleController");
                };
                //ui function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $timeout(function () {
                        document.querySelectorAll("#year_text")[0].focus();
                    }, 10);

                };
                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.accountTtransactionList=[];
                    $scope.model.accountTtransactionDetailList=[];

                };
                $scope.ui.load = function () {
                    var year = $scope.year;
                    var month = $scope.month;
                    $scope.ui.mode = "LOAD";
                    $scope.model.getAccountTransactionList(year, month);

                };
                $scope.ui.getDetail = function (year,month,typeId) {
                    console.log(year);
                    console.log(month);
                    console.log(typeId);
                    $scope.model.getAccountTransactionDetailList(year, month,typeId);

                };
                $scope.enterEvent = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.load();
                    }
                };
                //init
                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                };

                $scope.ui.init();
            });
}());