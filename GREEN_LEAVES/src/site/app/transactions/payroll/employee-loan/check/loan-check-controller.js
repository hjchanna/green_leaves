(function () {
    angular.module("appModule")
            .controller("EmployeeLoanCheckController", function ($scope, ConfirmPane, Notification) {
//                $scope.model = new LoanCheckModel();
                $scope.ui = {};
                $scope.ui.selectedDetailIndex = null;

//                $scope.ui.check = function () {
//                    if (!$scope.ui.selectedDetailIndex) {
//                        Notification.error("select client loan request");
//                    } else if (!$scope.model.tempData.interestRate) {
//                        Notification.error("Interest Rate");
//                    } else if (!$scope.model.tempData.installmentCount) {
//                        Notification.error("Installment Count");
//                    } else if (!$scope.model.tempData.installmentAmount) {
//                        Notification.error("Installment Amount");
//                    } else if (!$scope.model.tempData.panaltyRate) {
//                        Notification.error("Panalty Rate");
//                    } else if ($scope.model.tempData.interestRate
//                            && $scope.model.tempData.installmentCount
//                            && $scope.model.tempData.installmentAmount
//                            && $scope.model.tempData.panaltyRate) {
//                        ConfirmPane.primaryConfirm("This Loan Is Check!")
//                                .confirm(function () {
//                                    $scope.model.checkRequest();
//                                    $scope.ui.selectedDetailIndex = null;
//                                })
//                                .discard(function () {
//                                    console.log("REJECT");
//                                });
//                    }
//                };
//
//                $scope.ui.reject = function () {
//                    ConfirmPane.dangerConfirm("This Loan Is Reject!")
//                            .confirm(function () {
//                                $scope.model.reject();
//                                $scope.ui.selectedDetailIndex = null;
//                            })
//                            .discard(function () {
//                                console.log("REJECT");
//                            });
//                };
//
//                $scope.ui.init = function () {
//                    $scope.model.clear();
//
//                    //calculate installment amount
//                    $scope.$watch('[model.tempData.installmentCount, model.tempData.interestRate]', function () {
//                        var loanAmount = $scope.model.tempData.amount;
//                        var interestRate = $scope.model.tempData.interestRate / 100 / 12;
//                        var installmentCount = $scope.model.tempData.installmentCount;
//
//                        var installmentAmount = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, installmentCount * -1));
//                        installmentAmount = installmentAmount.toFixed(2);
//
//                        if (!isNaN(installmentAmount)) {
//                            $scope.model.tempData.installmentAmount = installmentAmount;
//                        } else {
//                            $scope.model.tempData.installmentAmount = 0.0;
//                        }
//
//                    });
//                };
//
//                $scope.ui.selectDetail = function (model) {
//                    $scope.model.data.client = model[3];
//                    $scope.model.data.date = model[2];
//                    $scope.model.selectDetail(model[0]);
//                    $scope.ui.selectedDetailIndex = model[0];
//                };
//
//                $scope.ui.init();
            });
}());