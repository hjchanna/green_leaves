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
                        "month": null,
                        "transaction": null,
                        "status": "PENDING",
                        "client": null,
                        "tfertilizerDetailList": [
//                            {
//                                "indexNo": null,
//                                "qty": null,
//                                "status": "PENDING",
//                                "product": null
//                            }
                        ]
                    };
                    return data;
                };

                factory.newTempData = function () {
                    var tempData = {
                        "indexNo": null,
                        "product": null,
                        "qty": null,
                        "status": "PENDING"
                    };

                    return tempData;
                };

                return factory;
            });
}());