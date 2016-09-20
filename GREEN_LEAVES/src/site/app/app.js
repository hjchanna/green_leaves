(function () {
    //index module
    angular.module("appModule", ["ngRoute", "homeModule", "greenLeavesReceiveModule","clientAdvanceRequestModule","clientAdvanceApproveModule"]);

    //route config
    angular.module("appModule")
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

                        .when("/transactions/green-leaves/client-advance/client-advance-request", {
                            templateUrl: "app/transactions/green-leaves/client-advance/client-advance-request.html",
                            controller: "clientAdvanceRequestController"
                        })
                        .when("/transactions/green-leaves/client-advance/client-advance-approve", {
                            templateUrl: "app/transactions/green-leaves/client-advance/client-advance-approve.html",
                            controller: "clientAdvanceApproveController"
                        })

                        .otherwise({
                            redirectTo: "/"
                        });
            });
}());