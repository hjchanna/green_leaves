(function () {
    angular.module("appModule")
            .factory("TeaIssueModelFactory", function () {
                var factory = {};

                factory.newTeaIssue = function () {
                    var data = {
                        "indexNo": null,
                        "branch": null,
                        "date": null,
                        "number": null,
                        "transaction": null,
                        "route": null,
                        "type": null,
                        "status": "PENDING",
                        "teaIssueDetails": []
                    };
                    return data;
                };

                factory.newTeaIssueDetail = function () {
                    var data = {
                        "indexNo": null,
                        "client": null,
                        "routeOfficer": null,
                        "teaIssueItem": null,
                        "unitPrice": null,
                        "quantity": null,
                        "value": null
                    };

                    return data;
                };

                return factory;
            });
}());

