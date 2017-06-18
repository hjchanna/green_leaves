(function () {
    angular.module("appModule")
            .controller("IndexController", function ($scope, $rootScope, $cookies, $timeout, $location, SecurityService) {
                $scope.hamburgerOpen = false;

                $rootScope.httpLoaders = 0;

                $rootScope.addHttpRequest = function () {
                    $rootScope.httpLoaders = $rootScope.httpLoaders + 1;
                };

                $rootScope.removeHttpRequest = function () {
                    $timeout(function () {
                        $rootScope.httpLoaders = $rootScope.httpLoaders - 1;
                    }, 1000);
                };

                //route loading
                $rootScope.$watch("layout.loading", function () {
                    $scope.routeLoading = $rootScope.layout.loading;
                });

                $scope.userRoles = $rootScope.userRoles;
//                        [
//                    {
//                        name: "Green Leaves Officer",
//                        homepageUrl: "#/transactions/green-leaves/green-leaves-weigh/green-leaves-weigh"
//                    },
//                    {
//                        name: "Advance Officer"
//                    }
//                ]; 
                //TODO:should read from $globalScope



                $scope.homepageUrls = [];

                //init homepage urls
                angular.forEach($scope.userRoles, function (value) {
                    if (value.homepageUrl) {
                        $scope.homepageUrls.push({
                            "name": value.name,
                            "url": value.homepageUrl
                        });
                    }
                });


                $scope.toggleHamburger = function () {
                    $scope.hamburgerOpen = !$scope.hamburgerOpen;

                    if ($scope.hamburgerOpen) {
                        $timeout(function () {
                            angular.element(document.querySelector(".side-bar-left")).css("display", "none");
                        }, 600);
                    } else {
                        angular.element(document.querySelector(".side-bar-left")).css("display", "flex");
                    }
                };

                $scope.isHomepage = function () {
                    return $location.path() === "/";
                };

                $scope.logout = function () {
                    SecurityService.logout()
                            .success(function () {
                                $location.path("/login");
                            });
                };

                $scope.routeChange = function ($event) {
                    var text = $event.srcElement.text;

                    $cookies.put("current-route", text);
                };

                $scope.getCurrentRoute = function () {
                    return $cookies.get("current-route");
                };

                $scope.getBranchName = function () {
                    return $cookies.get("branch-name");
                };

                $scope.getUserName = function () {
                    return $cookies.get("nick-name");
                };

            });
}());