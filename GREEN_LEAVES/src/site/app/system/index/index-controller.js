(function () {
    angular.module("appModule")
            .controller("IndexController", function ($scope, $rootScope, $location) {
                $scope.hamburgerOpen = false;

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


            });
}());