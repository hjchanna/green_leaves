(function () {
    angular.module("receiveDashboardModule", []);
    angular.module("receiveDashboardModule")
            .controller("receiveDashboardController", function ($scope, GreenLeavesDashBoardModel) {
                $scope.model = new GreenLeavesDashBoardModel();

                $scope.ui = {};
                
                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                };

                $scope.ui.searchUi;
                $scope.ui.toggleType = function (type) {
                    if (type === 'Summary') {
                        $scope.ui.searchUi = "Summary";
                        console.log("Summary");
                    } else if (type === 'Receive') {
                        console.log("Receive");
                        $scope.ui.searchUi = "Receive";
                    } else if (type === 'Bulk_Weigh') {
                        console.log("Bulk_Weigh");
                        $scope.ui.searchUi = "Bulk_Weigh";
                    } else if (type === 'Supplier_Weigh') {
                        console.log("Supplier_Weigh");
                        $scope.ui.searchUi = "Supplier_Weigh";
                    }
                };

                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";

                    $scope.$watch("[model.data.fromDate,model.data.toDate,model.data.route,model.data.routeOfficer,model.data.routeHelper,model.data.vehicle]", function (newVal, oldVal) {
                        if ($scope.ui.searchUi === 'Summary') {
                            $scope.model.greenLeavesAllSummry();

                        } else if ($scope.ui.searchUi === 'Receive') {

                        } else if ($scope.ui.searchUi === 'Bulk_Weigh') {
                            $scope.model.getGreenLeavesWeighSummry('BULK');

                        } else if ($scope.ui.searchUi === 'Supplier_Weigh') {
                            $scope.model.getGreenLeavesWeighSummry('SUPPLIER');
                        }
                    }, true);
                };

                $scope.ui.init();
            });
}());