(function () {
    angular.module("appModule")
            .factory("GreenLeavesDashBoardModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "fromDate": null,
                        "toDate": null,
                        "route": 0,
                        "routeOfficer": 0,
                        "routeHelper": 0,
                        "vehicle": 0
                    };
                    return data;
                };
                factory.totalSummry = function () {
                    var data = {
                        "totalNormalWeigh": 0.0,
                        "totalSuperWeigh": 0.0,
                        "totalNormalReceive": 0.0,
                        "totalSuperReceive": 0.0,
                        "bulkWeighNormalTotal": 0.0,
                        "bulkWeighSuperTotal": 0.0,
                        "bulkReceiveNormalTotal": 0.0,
                        "bulkReceiveSuperTotal": 0.0,
                        "supplierWeighNormalTotal": 0.0,
                        "supplierWeighSuperTotal": 0.0,
                        "supplierReceiveSuperTotal": 0.0,
                        "                                                                                                                                ": 0.0
                    };
                    return data;
                };

                return factory;
            });
}());