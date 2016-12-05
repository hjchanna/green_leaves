(function () {
    angular.module("appModule")
            .factory("GreenLeavesReceiveModelFactory", function ($filter) {
                var factory = {};

                //new date subtract one day
                var newDate = new Date();
                newDate.setDate(newDate.getDate() - 1);
                var formatedDate = $filter('date')(newDate, 'yyyy-MM-dd');

                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "branch": null,
                        "route": null,
                        "number": null,
                        "date": formatedDate,
                        "transaction": null,
                        "status": null,
                        "greenLeavesReceiveDetails": [
//                            {
//                                "indexNo": null,
//                                "branch": null,
//                                "greenLeavesReceive": null,
//                                "normalLeavesQuantity": 0,
//                                "superLeavesQuantity": 0,
//                                "client": null
//                            }
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