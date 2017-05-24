(function () {
    angular.module("appModule")
            .directive("officerTeaLedgerSidePanel", function () {
                return {
                    restrict: 'E',
                    scope: {
                        officer: "=",
                        date: "="
                    },
                    controller: 'OfficerTeaLedgerSidePanelController',
                    templateUrl: "app/util/officer-tea-ledger-side-panel/officer-tea-ledger-side-panel.html"
                };
            });
}());