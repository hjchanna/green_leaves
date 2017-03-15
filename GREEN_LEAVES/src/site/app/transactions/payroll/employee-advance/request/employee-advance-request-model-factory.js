(function () {
    angular.module("appModule")
            .factory("EmployeeAdvanceRequestFactory", function () {
                var factory = {};
                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "branch": null,
                        "date": null,
                        "number": null,
                        "transaction": null,
                        "status": "PENDING",
                        "employeeAdvanceRequestDetail": [
                        ] 
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

