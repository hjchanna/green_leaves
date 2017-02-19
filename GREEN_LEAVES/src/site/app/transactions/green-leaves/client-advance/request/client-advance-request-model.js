(function () {
    var factory = function (ClientAdvanceRequestService, ClientAdvanceRequestFactory, $q, $filter) {
        function ClientAdvanceRequestModel() {
            this.constructor();
        }

        //prototype functions
        ClientAdvanceRequestModel.prototype = {
            data: {},
            //temp input
            tempData: {},
            //route information
            routes: [],
            //client information
            clients: [],
            //requets count
            requestTotal: {
                requestTotal: 0.0,
                requestAmountTotal: 0.0
            },
            //constructor
            constructor: function () {
                var that = this;
                that.data = ClientAdvanceRequestFactory.newData();
                that.tempData = ClientAdvanceRequestFactory.newTempData();
                //load default values
                ClientAdvanceRequestService.loadRoutes()
                        .success(function (data) {
                            that.routes = data;
                        });
                ClientAdvanceRequestService.loadClient()
                        .success(function (data) {
                            that.clients = data;
                        });
            },
            //find by number
            load: function () {
                var that = this;
                var defer = $q.defer();
                ClientAdvanceRequestService.loadAdvanceRequestByNumber(this.data.number)
                        .success(function (data) {
                            that.data = {};
                            angular.extend(that.data, data);
                            that.refreshQuantity();
                            defer.resolve();
                        })
                        .error(function (data) {
                            that.data.indexNo = null;
                            that.data.banch = null;
                            that.data.date = null;
                            // that.data.number = null;
                            that.data.transaction = null;
                            that.data.route = null;
                            that.data.status = "PENDING";
                            that.data.clientAdvanceRequestDetails = [];
                            that.refreshQuantity();
                            defer.reject();
                        });
                return defer.promise;
            },
            //find by branch nd route and date
            findByRouteAndDate: function () {
                var that = this;
                var defer = $q.defer();
                var route = this.data.route;
                var date = $filter('date')(this.data.date, 'yyyy-MM-dd');
                ClientAdvanceRequestService.findByRouteAndDate(route, date)
                        .success(function (data) {
                            that.data = {};
                            angular.extend(that.data, data);
                            that.refreshQuantity();
                            defer.resolve();
                        })
                        .error(function (data) {
                            that.data.indexNo = null;
                            //that.data.banch = null;
                            //that.data.date = null;
                            that.data.number = null;
                            that.data.transaction = null;
                            //that.data.route = null;
                            that.data.status = "PENDING";
                            that.data.clientAdvanceRequestDetails = [];
                            that.refreshQuantity();
                            defer.reject();
                        });
                return defer.promise;
            },
            //clear all data
            clear: function () {
                this.data = ClientAdvanceRequestFactory.newData();
                this.tempData = ClientAdvanceRequestFactory.newTempData();
            },
            //table add temp data
            addDetail: function () {
                var defer = $q.defer();
                if (this.tempData.client && this.tempData.asAtDate && this.tempData.amount) {
                    this.data.clientAdvanceRequestDetails.push(this.tempData);
                    this.tempData = ClientAdvanceRequestFactory.newTempData();
                    this.refreshQuantity();
                    defer.resolve();
                } else {
                    defer.reject();
                }

                return defer.promise;
            },
            //table detail edit
            editDetail: function (index) {
                var requestDetails = this.data.clientAdvanceRequestDetails[index];
                this.data.clientAdvanceRequestDetails.splice(index, 1);
                this.tempData = requestDetails;
                this.refreshQuantity();
            },
            //table detail delete
            deleteDetail: function (index) {
                var that = this;
                var indexNo = this.data.clientAdvanceRequestDetails[parseInt(index)];
                if (indexNo.indexNo) {
                    console.log("exists request delete");
                    var indexNo = parseInt(indexNo.indexNo);
                    ClientAdvanceRequestService.deleteAdvanceRequestDetails(indexNo)
                            .success(function (data) {
                                console.log(data);
                                that.data.clientAdvanceRequestDetails.splice(index, 1);
                                that.refreshQuantity();
                            })
                            .error(function (data) {

                            });
                } else {
                    console.log("new request delete");
                    this.data.clientAdvanceRequestDetails.splice(index, 1);
                    this.refreshQuantity();
                }

            },
            //delete fully client advance request and request details
            deleteAdvanceRequest: function () {
                var that = this;
                ClientAdvanceRequestService.deleteAdvancerRequest(this.data.indexNo)
                        .success(function (data) {
                            that.clear();
                        });
            },
            //get total request count and total request amount
            refreshQuantity: function () {
                var requestAmountTotal = 0.0;
                angular.forEach(this.data.clientAdvanceRequestDetails, function (value) {
                    requestAmountTotal += parseFloat(value.amount);
                    return;
                });
                this.requestTotal.requestAmountTotal = requestAmountTotal;
                this.requestTotal.requestTotal = this.data.clientAdvanceRequestDetails.length;
                return this.requestTotal;
            },
            route: function (indexNo) {
                var route;
                angular.forEach(this.routes, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        route = value;
                        return;
                    }
                });
                return route;
            },
            //return label for route
            routeLabel: function (indexNo) {
                var label;
                angular.forEach(this.routes, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return label;
            },
            //return lable for client
            clientLabel: function (indexNo) {
                var label;
                angular.forEach(this.clients, function (value) {
                    if (value.indexNo === indexNo) {
                        label = value.clientNumber + "-" + value.name;
                        return;
                    }
                });
                return label;
            },
            client: function (indexNo) {
                var client;
                angular.forEach(this.clients, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        client = value;
                        return;
                    }
                });
                return client;
            },
            //validation
            validateClient: function (clientNumber) {
                var c = null;
                angular.forEach(this.clients, function (value) {
                    if (value.clientNumber === parseInt(clientNumber)) {
                        c = value;
                        return;
                    }
                });
                if (c) {
                    this.tempData.client = c.indexNo;
                } else {
                    this.tempData.client = null;
                }
            },
            //save advance request and request details
            saveClientApproveRequest: function () {
                var defer = $q.defer();
                if (this.data.route && this.data.clientAdvanceRequestDetails.length !== 0) {
                    ClientAdvanceRequestService.saveAdvanceRequest(JSON.stringify(this.data))
                            .success(function (data) {
                                defer.resolve();
                            })
                            .error(function (data) {
                                defer.reject();
                            });
                    return defer.promise;
                }
            },
            requestDuplicateCheck: function (client, date) {
                var label;
                console.log(this.data.clientAdvanceRequestDetails);
                angular.forEach(this.data.clientAdvanceRequestDetails, function (value) {
                    if (value.client === parseInt(client) && angular.equals($filter('date')(value.asAtDate, 'yyyy-MM-dd'), $filter('date')(date, 'yyyy-MM-dd'))) {
                        label = true;
                        return;
                    }
                });
                return label;
            }
        };
        return ClientAdvanceRequestModel;
    };
    angular.module("appModule")
            .factory("ClientAdvanceRequestModel", factory);
}());