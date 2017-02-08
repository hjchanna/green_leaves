(function () {
    //controller
    angular.module("appModule")
            .controller("FinalPaymentController", function ($scope, FinalPaymentModel, ProgressPane) {
                $scope.model = new FinalPaymentModel();

                $scope.ui = {};

                $scope.ui.loadClientLedgerSummary = function () {
                    var progress = ProgressPane.primaryProgress("Loading...");

                    $scope.model.loadClientLedgerSummary()
                            .then(
                                    function () {
                                        console.log(this.model);
                                        progress.close();
                                    },
                                    function () {
                                        console.log("error");
                                        progress.close();
                                    }
                            );
                };

                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                };

                $scope.ui.init();
            });
}());