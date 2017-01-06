(function () {
    angular.module("appModule")
            .factory("ClientAdvanceRequestFactory", function () {
                var factory = {};
                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "branch": null,
                        "date": null,
                        "number": null,
                        "transaction": null,
                        "route": null,
                        "status": "PENDING",
                        "isDelete": "ACTIVE",
                        "clientAdvanceRequestDetails": [
//                            {
//                                "indexNo": null,
//                                "client": null,
//                                "asAtDate": null,
//                                "amount": 0.0,
//                                "status": "PENDING"
//                            }
                        ]
                    };

                    return data;
                };

                factory.newTempData = function () {
                    var tempData = {
                        "indexNo": null,
                        "client": null,
                        "asAtDate": null,
                        "amount": 0.0,
                        "status": "PENDING"
                    };

                    return tempData;
                };

                return factory;
            });
}());

