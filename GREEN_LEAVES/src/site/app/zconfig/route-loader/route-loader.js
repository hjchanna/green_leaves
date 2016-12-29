(function () {
    angular.module("appModule")
            .run(function ($rootScope, $location, $route, $timeout) {
                $rootScope.config = {};
                $rootScope.config.app_url = $location.url();
                $rootScope.config.app_path = $location.path();
                $rootScope.layout = {};
                $rootScope.layout.loading = false;

                $rootScope.$on('$routeChangeStart', function () {
                    //show loading gif
                    $timeout(function () {
                        $rootScope.layout.loading = true;
                    });
                });
                $rootScope.$on('$routeChangeSuccess', function () {
                    //hide loading gif
                    $timeout(function () {
                        $rootScope.layout.loading = false;
                    }, 700);
                });
                $rootScope.$on('$routeChangeError', function () {
                    //hide loading gif
                    $rootScope.layout.loading = false;
                });
            });
}());