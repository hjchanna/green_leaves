(function () {
    angular.module("appModule")
            .factory("PriceSettingModelFactory", function () {
                var factory = {};
                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "branch": null,
                        "number": null,
                        "transaction": null,
                        "year": null,
                        "month": null,
                        "priceSettingDetails": [
//                            {
//                                "indexNo": null,
//                                "normalRate": null,
//                                "superRate": null,
//                                "route": null
//                            }
                        ]
                    };
                    return data;

                };

                factory.newTempData = function () {
                    var tempData = {
                        "indexNo": null,
                        "normalRate": null,
                        "superRate": null,
                        "route": null
                    };

                    return tempData;
                };

                return factory;
            });
}());