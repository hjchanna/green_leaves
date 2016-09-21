(function () {
    //module
    angular.module("greenLeavesReceiveModule", ["ngAnimate", "ui.bootstrap"]);

    //controller
    angular.module("greenLeavesReceiveModule")
            .controller("greenLeavesReceiveController", function ($scope, $http) {
                $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

                //get route officers
                $scope.getRouteOfficers = function (hint) {
                    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                        params: {
                            address: hint,
                            sensor: false
                        }
                    }).then(function (response) {
                        return response.data.results.map(function (item) {
                            return item.formatted_address;
                        });
                    });
                };

                //get route helpers
                $scope.getRouteHelpers = function (hint) {
                    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                        params: {
                            address: hint,
                            sensor: false
                        }
                    }).then(function (response) {
                        return response.data.results.map(function (item) {
                            return item.formatted_address;
                        });
                    });
                };
            });
}());