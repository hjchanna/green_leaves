(function () {
    angular.module("appModule")
            .controller("OfficerTeaLedgerSidePanelController", function ($scope, OfficerTeaLedgerSidePanelService) {
                $scope.model = {};
                $scope.model.officerTeaLedgerHistory = [];

                $scope.getOfficerTeaLedgerTotal = function () {
                    var sum = [0, 0, 0, 0];//in, out, in-balance, out-balance 
                    angular.forEach($scope.model.officerTeaLedgerHistory, function (value) {
                        sum[0] = sum[0] + value[2];
                        sum[1] = sum[1] + value[3];
                    });

                    sum[2] = sum[0] - sum[1];
                    sum[3] = sum[1] - sum[0];

                    sum[2] = sum[2] > 0 ? sum[2] : 0.0;
                    sum[3] = sum[3] > 0 ? sum[3] : 0.0;

                    return sum;
                };

                $scope.init = function () {
                    $scope.$watch("[officer, date]", function () {
                        var officer = $scope.officer;
                        var date = $scope.date;
                        if (officer && date) {
                            //ledger history
                            OfficerTeaLedgerSidePanelService.loadOfficerTeaLedgerHistory(officer, date)
                                    .success(function (data) {
                                        //client leger history
                                        $scope.model.officerTeaLedgerHistory = data;
                                    })
                                    .error(function () {
                                        $scope.model.officerTeaLedgerHistory = [];
                                    });
                        } else {
                            $scope.model.officerTeaLedgerHistory = [];
                        }
                    });
                };
                $scope.init();

            });
}());