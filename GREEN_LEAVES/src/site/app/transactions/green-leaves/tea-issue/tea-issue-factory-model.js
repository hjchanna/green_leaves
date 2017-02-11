(function () {
    angular.module("appModule")
            .factory("TeaIssueModelFactory", function () {
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
                        "price": 0.00,
                        "qty": null,
                        "type": null,
                        "status": "PENDING",
                        "teaGrade":null
                    };
                    return data;
                };

                return factory;
            });
}());

