(function () {
    angular.module("receiveDashboardModule", []);
    angular.module("receiveDashboardModule")
            .controller("receiveDashboardController", function ($scope, ModalDialog, GreenLeavesDashBoardModel) {
                $scope.model = new GreenLeavesDashBoardModel();

                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                };

                $scope.ui.searchUi;
                $scope.ui.toggleType = function (type) {
                    if (type === 'Summary') {
                        $scope.ui.searchUi = "Summary";
                    } else if (type === 'Receive') {
                        $scope.ui.searchUi = "Receive";
                    } else if (type === 'Bulk_Weigh') {
                        $scope.ui.searchUi = "Bulk_Weigh";
                    } else if (type === 'Supplier_Weigh') {
                        $scope.ui.searchUi = "Supplier_Weigh";
                    }
                };

                $scope.ui.popUpUiToggleType = function (type) {
                    $scope.ui.type = type;
                };

                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";

                    $scope.$watch("[model.data.fromDate,model.data.client,model.data.toDate,model.data.route,model.data.routeOfficer,model.data.routeHelper,model.data.vehicle]", function (newVal, oldVal) {
                        if ($scope.ui.searchUi === 'Summary') {
                            // $scope.model.greenLeavesAllSummry();
                        } else if ($scope.ui.searchUi === 'Receive') {
                            $scope.model.greenLeavesReceiveSummry();
                            $scope.model.greenLeavesChatFillData();
                        } else if ($scope.ui.searchUi === 'Bulk_Weigh') {
                            $scope.model.getGreenLeavesWeighSummry('BULK');

                        } else if ($scope.ui.searchUi === 'Supplier_Weigh') {
                            $scope.model.getGreenLeavesWeighSummry('SUPPLIER');
                        }
                    }, true);

                    $scope.series = ['Normal', 'Super'];
                    $scope.colors = ['#45b7cd', '#ff6384'];
                };

                $scope.options = {
                    responsive: true,
                    maintainAspectRatio: false
                };

//                $scope.ui.modalOpen = function (indexNo) {
//                    ModalDialog.modalOpen("lg", "greenLeavesWeighSummry.html", "receiveDashboardController");
//                    $scope.model.greenLeaveWeighDetailsByIndexNo(indexNo);
//                };

                $scope.onClick = function (points, evt) {
                    console.log(points, evt);
                };


                $scope.ui.init();
            });
}());