(function () {
    angular.module("appModule")
            .factory("EmployeeTeaIssueModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "branch": null,
                        "number": null,
                        "date": null,
                        "transaction": null,
                        "employee": null,
                        "price": 0.00,
                        "qty": null,
                        "status": "PENDING",
                        "teaGrade":null
                    };
                    return data;
                };

                return factory;
            });
}());
