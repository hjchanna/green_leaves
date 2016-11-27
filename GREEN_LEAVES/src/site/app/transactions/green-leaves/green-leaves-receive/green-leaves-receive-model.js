(function () {
    angular.module("appModule")
            .factory("GreenLeavesReceiveModel", function (GreenLeavesReceiveService, GreenLeavesReceiveModelFactory, $q) {
                function GreenLeavesReceiveModel() {
                    this.constructor();
                }

                GreenLeavesReceiveModel.prototype = {
                    data: {},

                    tempData: {},

                    totalQuantity: [],

                    factoryQuantity: [],

                    differenceQuantity: [],

                    routes: [],

                    clients: [],

                    constructor: function () {
                        var that = this;
                        GreenLeavesReceiveService.loadRoutes()
                                .success(function (data) {
                                    that.routes = data;
                                });
                        GreenLeavesReceiveService.loadClients()
                                .success(function (data) {
                                    that.clients = data;
                                });

                        that.totalQuantity = [0, 0];
                        that.factoryQuantity = [0, 0];
                        that.differenceQuantity = [0, 0];
                    },
                    clear: function () {
                        this.data = GreenLeavesReceiveModelFactory.newData();
                        this.tempData = GreenLeavesReceiveModelFactory.newTempData();
                    },
                    addDetail: function () {
                        var defer = $q.defer();
                        console.log(this.data);
                        if (this.tempData.client
                                && parseInt(this.tempData.normalLeavesQuantity + this.tempData.superLeavesQuantity) > 0) {
                            this.data.greenLeavesReceiveDetails.push(this.tempData);

                            this.totalQuantity = [0, 0];
                            var that = this;
                            angular.forEach(this.data.greenLeavesReceiveDetails, function (value) {
                                that.totalQuantity[0] = that.totalQuantity[0] + value.normalLeavesQuantity;
                                that.totalQuantity[1] = that.totalQuantity[1] + value.superLeavesQuantity;
                            });
                            this.differenceQuantity = [
                                this.factoryQuantity[0] - this.totalQuantity[0],
                                this.factoryQuantity[1] - this.totalQuantity[1]
                            ];

                            this.tempData = GreenLeavesReceiveModelFactory.newTempData();
                            defer.resolve();
                        } else {
                            defer.reject();
                        }

                        return defer.promise;
                    },
                    editDetail: function (index) {
                        var receiveDetail = this.data.greenLeavesReceiveDetails[index];
                        this.data.greenLeavesReceiveDetails.splice(index, 1);
                        this.tempData = receiveDetail;
                    },
                    deleteDetail: function (index) {
                        this.data.greenLeavesReceiveDetails.splice(index, 1);
                    },
                    load: function () {
                        var number = this.data.number;
                        var that = this;
                        var defer = $q.defer();
                        GreenLeavesReceiveService.loadReceive(number)
                                .success(function (data) {
                                    that.data = {};
                                    angular.equals(that.data, data);
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    save: function () {
                        var defer = $q.defer();
                        GreenLeavesReceiveService.saveData(JSON.stringify(this.data))
                                .success(function (data) {
                                    defer.resolve();
                                })
                                .error(function (data) {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
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
                    clientLabel: function (indexNo) {
                        var label;
                        angular.forEach(this.clients, function (value) {
                            if (value.indexNo === indexNo) {
                                label = value.indexNo + "-" + value.name;
                                return;
                            }
                        });
                        return label;
                    }
                };

                return GreenLeavesReceiveModel;
                /*function GreenLeavesReceiveModel(data) {
                 if (!data) {
                 data = {
                 "indexNo": null,
                 "branch": null,
                 "route": null,
                 "number": null,
                 "date": null,
                 "transaction": null,
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
                 }
                 this.setData(data);
                 }
                 
                 GreenLeavesReceiveModel.prototype = {
                 setData: function (data) {
                 angular.extend(this, data);
                 },
                 //add receive detail
                 addReceiveDetail: function (data) {
                 this.greenLeavesReceiveDetails.push(data);
                 return true;
                 },
                 editRecieveDetail: function (index) {
                 
                 },
                 //delete receive detail
                 deleteReceiveDetail: function (index) {
                 this.greenLeavesReceiveDetails.splice(index, 1);
                 },
                 getSuperLeavesQuantityTotal: function () {
                 var total = 0;
                 for (var i = 0; i < this.greenLeavesReceiveDetails.length; i++) {
                 total += parseInt(this.greenLeavesReceiveDetails[i].superLeavesQuantity);
                 }
                 return total;
                 },
                 getNormalLeavesQuantityTotal: function () {
                 var total = 0;
                 for (var i = 0; i < this.greenLeavesReceiveDetails.length; i++) {
                 total += parseInt(this.greenLeavesReceiveDetails[i].normalLeavesQuantity);
                 }
                 return total;
                 },
                 checkGreenLeavesReseveDetailDuplicate:function (clientIndexNo){
                 for (var i = 0; i < this.greenLeavesReceiveDetails.length; i++) {
                 if(clientIndexNo ===this.greenLeavesReceiveDetails[i].client){
                 return true;
                 break;
                 }else{
                 return false;
                 break;
                 }
                 }
                 }
                 };
                 return GreenLeavesReceiveModel;*/
            });
}());