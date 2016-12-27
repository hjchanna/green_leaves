(function () {
    angular.module("appModule")
            .factory("GreenLeavesDashBoardModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "fromDate": null,
                        "toDate": null,
                        "route": null,
                        "routeOfficer": null,
                        "routeHelper": null,
                        "vehicle": null
                    };
                    return data;
                };

                return factory;
            });
}());