(function () {
    angular.module("appModule")
            .directive("sidePanel", function () {
                return {
                    restrict: 'E',
                    scope: {
                        client: "=",
                        date: "="
                    },
                    controller: 'sidePanelController',
                    templateUrl: "app/util/side-panel/side-panel.html"
                };
            });
}());