(function () {
    //module
    angular.module("teaSettlementModule", []);
    //controller
    angular.module("teaSettlementModule")
            .controller("teaSettlementController", function ($scope, TeaSettlementModel, ConfirmPane) {
                $scope.model = new TeaSettlementModel();

                $scope.ui = {};
                $scope.ui.selectedRequest = null;
                $scope.ui.selectedIndex = null;

                $scope.ui.selectRequest = function (indexNo, index) {
                    $scope.ui.selectedRequest = indexNo;
                    $scope.ui.selectedIndex = index;
                };

                $scope.ui.approve = function () {
                    ConfirmPane.primaryConfirm("This Tea Issue Request Approve")
                            .confirm(function () {
                                $scope.model.approve($scope.ui.selectedRequest, $scope.ui.selectedIndex);
                                $scope.ui.selectedRequest = null;
                                $scope.ui.selectedIndex = null;
                            })
                            .discard(function () {
                                console.log("REJECT");
                            });
                };

                $scope.ui.reject = function () {
                    ConfirmPane.dangerConfirm("This Tea Issue Request Reject")
                            .confirm(function () {
                                $scope.model.approve($scope.ui.selectedRequest, $scope.ui.selectedIndex);
                                $scope.ui.selectedRequest = null;
                                $scope.ui.selectedIndex = null;
                            })
                            .discard(function () {
                                console.log("REJECT");
                            });
                };

                $scope.ui.clear = function () {
                    $scope.model.clear();
                };

                $scope.ui.init = function () {
                };

                $scope.ui.init();

            });
}());