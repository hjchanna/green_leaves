(function () {
    angular.module("appModule")
            .controller("ClientLoanCheckController", function ($scope, LoanCheckModel) {
                $scope.model = new LoanCheckModel();
                $scope.ui = {};

                $scope.ui.check = function () {
                    $scope.model.checkRequest();
                    $scope.model.clear();
                };

                $scope.ui.init = function () {
                    $scope.model.clear();

                    //calculate installment amount
                    $scope.$watch('[model.detail.installmentCount, model.detail.interestRate]', function () {
                        var loanAmount = $scope.model.detail.amount;
                        var interestRate = $scope.model.detail.interestRate / 100 / 12;
                        var installmentCount = $scope.model.detail.installmentCount;

                        var installmentAmount = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, installmentCount * -1));
                        installmentAmount = installmentAmount.toFixed(2);
                        
                        if (!isNaN(installmentAmount)) {
                            $scope.model.detail.installmentAmount = installmentAmount;
                        }else{
                            $scope.model.detail.installmentAmount = 0.0;
                        }
                        
                    });
                };

                $scope.ui.selectData = function (indexNo) {
                    $scope.model.selectData(indexNo);
                    $scope.ui.selectedDataIndex = indexNo;
                };

                $scope.ui.selectDetail = function (indexNo) {
                    $scope.model.selectDetail(indexNo);
                    $scope.ui.selectedDetailIndex = indexNo;

                    console.log($scope.model.detail);
                };

                $scope.ui.init();

            });
}());