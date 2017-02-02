(function () {
    angular.module("appModule")
            .factory("FertilizerModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "branch": null,
                        "number": null,
                        "date": null,
                        "transaction": null,
                        "routeOfficer": null,
                        "client": null,
                        "price": null,
                        "qty": null,
                        "status": "PENDING",
                        "teaGrade":null
                    };
                    return data;
                };

                return factory;
            });
}());

