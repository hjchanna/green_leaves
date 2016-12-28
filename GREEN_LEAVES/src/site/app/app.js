(function () {
    //index module
    angular.module("appModule", [
        "ngRoute",
        "ngCookies",
        "ui.bootstrap",
        "homeModule",
//        "greenLeavesReceiveModule",
//        "greenLeavesWeighModule",
//        "clientAdvanceRequestModule",
//        "clientAdvanceApproveModule",
        "priceSettingModule",
        "finalPaymentModule",
        "monthlyGreenLeavesSummryModule",
        "routeDetailsModule",
        "clientModule",
        "categoryModule",
        "itemDepartmentModule",
        "vehicleModule",
        "subCategoryModule",
        "supplierModule",
        "productModule",
        "employeeModule",
        "routeModule",
        "fertilizerModule",
        "branchModule",
        "greenLeavesWeighReportModule",
        "chequeBookModule",
        "bankModule",
        "bankBranchModule",
        "receiveDashboardModule"
    ]);

    //constants
    angular.module("appModule")
            .constant("systemConfig", {
                apiUrl:
                        location.hostname === 'localhost'
                        ? "http://localhost:8080"
                        : location.protocol + "//" + location.hostname
            });
    //constants

    //route config
    angular.module("appModule")
            .config(function ($routeProvider) {
                $routeProvider
                        //system
                        .when("/", {
                            templateUrl: "app/system/home/home.html",
                            controller: "homeController"
                        })

                        .when("/login", {
                            templateUrl: "app/system/login/login.html",
                            controller: "LoginController"
                        })

                        //green leaves
                        .when("/transactions/green-leaves/green-leaves-weigh/green-leaves-weigh", {
                            templateUrl: "app/transactions/green-leaves/green-leaves-weigh/green-leaves-weigh.html",
                            controller: "GreenLeavesWeighController"
                        })
                        .when("/transactions/green-leaves/supplier-green-leaves-weigh/supplier-green-leaves-weigh", {
                            templateUrl: "app/transactions/green-leaves/supplier-green-leaves-weigh/supplier-green-leaves-weigh.html",
                            controller: "SupplierGreenLeavesWeighController"
                        })
                        .when("/transactions/green-leaves/green-leaves-receive", {
                            templateUrl: "app/transactions/green-leaves/green-leaves-receive/green-leaves-receive.html",
                            controller: "GreenLeavesReceiveController"
                        })
                        .when("/transactions/green-leaves/client-advance/client-advance-request", {
                            templateUrl: "app/transactions/green-leaves/client-advance/client-advance-request.html",
                            controller: "ClientAdvanceRequestController"
                        })
                        .when("/transactions/green-leaves/client-advance/client-advance-approve", {
                            templateUrl: "app/transactions/green-leaves/client-advance/client-advance-approve.html",
                            controller: "ClientAdvanceApproveController"
                        })
                        .when("/transactions/green-leaves/green-leaves-weigh/green-leaves-payment", {
                            templateUrl: "app/transactions/green-leaves/green-leaves-payment/green-leaves-payment.html",
                            controller: "GreenLeavesPaymentController"
                        })
                        .when("/transactions/green-leaves/green-leaves-weigh/price-setting", {
                            templateUrl: "app/transactions/green-leaves/price-setting/price-setting.html",
                            controller: "PriceSettingController"
                        })
                        .when("/transactions/green-leaves/green-leaves-weigh/final-payemnt", {
                            templateUrl: "app/transactions/green-leaves/final-payemnt/final-payemnt.html",
                            controller: "finalPaymentModuleController"
                        })
                        .when("/transactions/green-leaves/monthly-green-leaves-summry/monthly-green-leaves-summry", {
                            templateUrl: "app/transactions/green-leaves/monthly-green-leaves-summry/monthly-green-leaves-summry.html",
                            controller: "monthlyGreenLeavesSummryController"
                        })
                        .when("/transactions/green-leaves/route-details", {
                            templateUrl: "app/transactions/green-leaves/route-details/route-details.html",
                            controller: "routeDetailsController"
                        })
                        .when("/transactions/green-leaves/fertilizer", {
                            templateUrl: "app/transactions/green-leaves/fertilizer/fertilizer.html",
                            controller: "fertilizerController"
                        })
                        //master
                        .when("/master/client/manage-client", {
                            templateUrl: "app/master/client/client.html",
                            controller: "clientController"
                        })
                        .when("/master/supplier/manage-supplier", {
                            templateUrl: "app/master/supplier/supplier.html",
                            controller: "supplierController"
                        })
                        .when("/master/category/category", {
                            templateUrl: "app/master/category/category.html",
                            controller: "categoryController"
                        })

                        .when("/master/item/manage-item-department", {
                            templateUrl: "app/master/item-department/item-department.html",
                            controller: "itemDepartmentController"
                        })
                        .when("/master/vehicle/vehicle", {
                            templateUrl: "app/master/vehicle/vehicle.html",
                            controller: "vehicleController"
                        })
                        .when("/master/category/sub-category", {
                            templateUrl: "app/master/sub-category/sub-category.html",
                            controller: "subCategoryController"
                        })
                        .when("/master/product/product", {
                            templateUrl: "app/master/product/product.html",
                            controller: "productController"
                        })
                        .when("/master/employee/employee", {
                            templateUrl: "app/master/employee/employee.html",
                            controller: "employeeController"
                        })
                        .when("/master/route/route", {
                            templateUrl: "app/master/route/route.html",
                            controller: "routeController"
                        })
                        .when("/master/branch/branch", {
                            templateUrl: "app/master/branch/branch.html",
                            controller: "branchController"
                        })
                        .when("/master/cheque-book/cheque-book", {
                            templateUrl: "app/master/cheque-book/cheque-book.html",
                            controller: "chequeBookController"
                        })
                        .when("/master/bank/bank", {
                            templateUrl: "app/master/bank/bank.html",
                            controller: "bankController"
                        })
                        .when("/master/bank-branch/bank-branch", {
                            templateUrl: "app/master/bank-branch/bank-branch.html",
                            controller: "bankBranchController"
                        })
                        //reports
                        .when("/reports/green-leaves-weigh", {
                            templateUrl: "app/reports/report.html"
                        })

                        .when("/reports/green-leave-weigh-report", {
                            templateUrl: "app/reports/green-leaves-weigh/green-leaves-weigh.html",
                            controller: "GreenLeavesWeighReportController"
                        })
                        //loan
                        .when("/loan/loan-request", {
                            templateUrl: "app/loan/loan-request/loan-request.html",
                            controller: "LoanRequestController"
                        })
                        .when("/loan/loan-check", {
                            templateUrl: "app/loan/loan-request/loan-check.html",
                            controller: "LoanCheckController"
                        })
                        .when("/loan/loan-approve", {
                            templateUrl: "app/loan/loan-request/loan-approve.html",
                            controller: "LoanApproveController"
                        })
                        .when("/dashboard/dashboard", {
                            templateUrl: "app/dashboard/receive-dashboard/receive-dashboard.html",
                            controller: "receiveDashboardController"
                        })

                        .otherwise({
                            redirectTo: "/"
                        });
            });

//    angular.module("appModule")
//            .config(function (ChartJsProvider) {
//                ChartJsProvider.setOptions({
//                    responsive: true,
//                    maintainAspectRatio: false
//                });
//            });
//

//    angular.module("appModule")
//            .service("ScheduleService", function ($http, $interval, $rootScope, systemConfig) {
//                this.start = function () {
//                    $interval(function () {
//                        $http.get(systemConfig.apiUrl + "/api/v1/system/environment/system-date")
//                                .success(function (data) {
//                                    $rootScope.date = new Date(data);
//                                    console.log($rootScope.date);
//                                });
//                    }, 1000);
//                };
//            });
}());
