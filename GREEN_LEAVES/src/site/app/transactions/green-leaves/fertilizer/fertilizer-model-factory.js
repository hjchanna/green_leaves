(function () {
    angular.module("appModule")
            .factory("FertilizerModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "indexNo": 1,
                        "branch": 1,
                        "number": 2,
                        "date": "2017-01-30",
                        "transaction": 1,
                        "status": "PENDING",
                        "tFertilizerDetailList": [
                            {
                                "indexNo": 1,
                                "month": 1,
                                "qty": 1,
                                "status": "PENDING",
                                "product": 1
                            }
                        ]
                    };
                    return data;
                };

                factory.newTempData = function () {
                    var tempData = {
                        "indexNo": null,
                        "client": null,
                        "normalLeavesQuantity": 0,
                        "superLeavesQuantity": 0,
                        "remark": null
                    };

                    return tempData;
                };

                return factory;
            });
}());