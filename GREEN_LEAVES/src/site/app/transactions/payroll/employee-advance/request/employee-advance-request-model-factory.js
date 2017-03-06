(function () {
    angular.module("appModule")
            .factory("EmployeeAdvanceRequestFactory", function () {
                var factory = {};
                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "branch": 0,
                        "date": null,
                        "number": 1,
                        "transaction": 1,
                        "status": "PENDING",
                        "employeeAdvanceRequestDetails": []
                    };

                    return data;
                };

                factory.newTempData = function () {
                    var tempData = {
                        "indexNo": null,
                        "employee": null,
                        "asAtDate": null,
                        "amount": 0.0,
                        "status": "PENDING"
                    };

                    return tempData;
                };

                return factory;
            });
}());

