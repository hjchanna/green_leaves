(function () {
    angular.module("appModule")
            .factory("FertilizersModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "branch": null,
                        "date": null,
                        "route": null,
                        "routeOfficer": null,
                        "routeHelper": null,
                        "vehicle": null,
                        "number": null,
                        "transaction": null,
                        "status": "PENDING",
                        "tfertilizerDetailList": [
//                            {
//                                "indexNo": null,
//                                "client": null,
//                                "fertlizerItem": null,
//                                "qty": null,
//                                "amount": null,
//                                "instalmentCount": null,
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
                        "fertlizerItem": null,
                        "qty": null,
                        "amount": null,
                        "instalmentCount": null,
                        "status": "PENDING"
                    };

                    return tempData;
                };

                return factory;
            });
}());