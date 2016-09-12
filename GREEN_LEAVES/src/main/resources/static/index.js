(function () {
    //index module
    angular.module("indexModule", ["ngRoute", "homeModule", "greenLeavesReceiveModule"]);

    //route config
    angular.module("indexModule")
            .config(function ($routeProvider) {
                $routeProvider
                        //system
                        .when("/", {
                            templateUrl: "app/system/home/home.html",
                            controller: "homeController"
                        })

                        //green leaves
                        .when("/transactions/green-leaves/green-leaves-receive", {
                            templateUrl: "app/transactions/green-leaves/green-leaves-receive/green-leaves-receive.html",
                            controller: "greenLeavesReceiveController"
                        })

                        .otherwise({
                            redirectTo: "/"
                        });
            });
}());