(function () {
    //module
    angular.module("supplierModule", []);

    //controller
    angular.module("supplierModule")
            .controller("supplierController", function ($scope) {


                $scope.singleModel = 1;

                $scope.radioModel = 'Middle';

                $scope.checkModel = {
                    left: true,
                    middle: true,
                    right: true
                };

                $scope.checkResults = [];

                $scope.$watchCollection('checkModel', function () {
                    $scope.checkResults = [];
                    angular.forEach($scope.checkModel, function (value, key) {
                        if (value) {
                            $scope.checkResults.push(key);
                        }
                    });
                });
            });
}());


