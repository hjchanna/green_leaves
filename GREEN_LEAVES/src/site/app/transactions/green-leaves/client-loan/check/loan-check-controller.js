(function () {
    angular.module("appModule")
            .controller("ClientLoanCheckController", function ($scope, LoanCheckModel, ConfirmPane) {
                $scope.model = new LoanCheckModel();
                $scope.ui = {};
                $scope.ui.selectedDetailIndex = null;

                $scope.ui.check = function () {
                    ConfirmPane.primaryConfirm("This Loan Is Check!")
                            .confirm(function () {
                                $scope.model.checkRequest();
                                $scope.ui.selectedDetailIndex = null;
                            })
                            .discard(function () {
                                console.log("REJECT");
                            });
                };

                $scope.ui.init = function () {
                    $scope.model.clear();

                    //calculate installment amount
                    $scope.$watch('[model.tempData.installmentCount, model.tempData.interestRate]', function () {
                        var loanAmount = $scope.model.tempData.amount;
                        var interestRate = $scope.model.tempData.interestRate / 100 / 12;
                        var installmentCount = $scope.model.tempData.installmentCount;

                        var installmentAmount = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, installmentCount * -1));
                        installmentAmount = installmentAmount.toFixed(2);

                        if (!isNaN(installmentAmount)) {
                            $scope.model.tempData.installmentAmount = installmentAmount;
                        } else {
                            $scope.model.tempData.installmentAmount = 0.0;
                        }

                    });
                };

                $scope.ui.selectDetail = function (model) {
                    $scope.model.data.client = model[3];
                    $scope.model.data.date = model[2];
                    $scope.model.selectDetail(model[0]);
                    $scope.ui.selectedDetailIndex = model[0];
                };

                $scope.ui.init();

            });
}());