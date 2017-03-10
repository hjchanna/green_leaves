(function () {
    var factory = function (SecurityService, SupplierGreenLeavesWeighService, SupplierGreenLeavesWeighModelFactory, $q, $filter) {
        function SupplierGreenLeavesWeighModel() {
            this.constructor();
        }

        //prototype functions
        SupplierGreenLeavesWeighModel.prototype = {
            //weigh data
            data: {},
            //temp input
            tempData: {},
            //green leaves temp data
//            greenLeavesTempData: {},
            //current branch
            currentBranch: null,
            //route information
            routes: [],
            //branch information
            branchs: [],
            //weight information
            pendingGreenLeavesWeigh: [],
            //client information
            clients: [],
            //constructor
            constructor: function () {
                var that = this;
                that.data = SupplierGreenLeavesWeighModelFactory.newData();
                that.tempData = SupplierGreenLeavesWeighModelFactory.newTempData();

                //load current branch
                SecurityService.ping()
                        .success(function (data) {
                            that.currentBranch = data.branch;
                        });

                //load default values
                SupplierGreenLeavesWeighService.loadBranch()
                        .success(function (data) {
                            that.branchs = data;
                        });

                SupplierGreenLeavesWeighService.loadRoutes()
                        .success(function (data) {
                            that.routes = data;
                        });

                SupplierGreenLeavesWeighService.loadClient()
                        .success(function (data) {
                            that.clients = data;
                        });
            },
            //clear all data
            clear: function () {
                this.data = SupplierGreenLeavesWeighModelFactory.newData();
                this.tempData = SupplierGreenLeavesWeighModelFactory.newTempData();
            },

            //load from server by number
            load: function () {
                var defer = $q.defer();

                var that = this;
                var number = this.data.number;
                var type = "SUPPLIER";
                SupplierGreenLeavesWeighService.loadWeigh(number, type)
                        .success(function (data) {
                            that.data = {};
                            angular.extend(that.data, data);
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                            //reset
                            that.clear();
                        });

                return defer.promise;
            },
            insertNormalDetail: function () {
                this.tempData.indexNo = null;
                this.tempData.type = 'NORMAL';

                return this.checkSummaryAndInsertDetail();
            },
            insertSuperDetail: function () {
                this.tempData.indexNo = null;
                this.tempData.type = 'SUPER';

                return this.checkSummaryAndInsertDetail();
            },
            //delete green leaves weigh 
            deleteGreenLavesWeigh: function () {
                var that = this;
                var defer = $q.defer();
                SupplierGreenLeavesWeighService.deleteGreenLeavesWeigh(this.data.indexNo)
                        .success(function (data) {
                            that.clear();
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            deleteDetail: function (indexNo) {
                var that = this;
                var defer = $q.defer();
                SupplierGreenLeavesWeighService.deleteDetail(indexNo)
                        .success(function () {
                            var id = -1;
                            for (var i = 0; i < that.data.greenLeaveWeighDetails.length; i++) {
                                if (that.data.greenLeaveWeighDetails[i].indexNo === indexNo) {
                                    id = i;
                                }
                            }

                            that.data.greenLeaveWeighDetails.splice(id, 1);
                            that.validate();
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });

                return defer.promise;
            },
            //switch weight - basically used to switch to selected pending weight
            switchWeight: function (greenLeavesWeight) {
                this.data = {};
                angular.extend(this.data, greenLeavesWeight);
            },
            saveWeight: function () {
                var that = this;
                var defer = $q.defer();
                SupplierGreenLeavesWeighService.saveWeigh(JSON.stringify(that.data))
                        .success(function (data) {
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },
            checkSummaryAndInsertDetail: function () {
                var that = this;
                var defer = $q.defer();

                if (this.data.indexNo === null) {
                    SupplierGreenLeavesWeighService.saveWeigh(JSON.stringify(that.data))
                            .success(function (data) {
                                that.data.indexNo = data;

                                //insert detail
                                that.insertDetail()
                                        .then(function () {
                                            defer.resolve();
                                        }, function () {
                                            defer.reject();
                                        });
                            })
                            .error(function (data) {
                                defer.reject();
                            });
                } else {
                    this.insertDetail()
                            .then(function () {
                                defer.resolve();
                            }, function () {
                                defer.reject();
                            });
                }

                return defer.promise;
            },
            insertDetail: function () {
                var that = this;
                var defer = $q.defer();

                var quantity = this.tempData.quantity;
                var tareCount = this.tempData.crates
                        + this.tempData.bags
                        + this.tempData.polyBags;

                if (tareCount > 0 && quantity > 0) {
                    SupplierGreenLeavesWeighService.insertDetail(JSON.stringify(this.tempData), this.data.indexNo)
                            .success(function (data) {
                                that.tempData.indexNo = data;
                                that.data.greenLeaveWeighDetails.unshift(that.tempData);
                                that.tempData = SupplierGreenLeavesWeighModelFactory.newTempData();
                                that.validate();
                                defer.resolve();
                            })
                            .error(function (data) {
                                defer.reject();
                            });
                } else {
                    defer.reject();
                }

                return defer.promise;
            },
            validate: function () {
                var normalTotalWeight = 0.0;
                var superTotalWeight = 0.0;

                var normalCrates = 0;
                var normalBags = 0;
                var normalPolyBags = 0;

                var superCrates = 0;
                var superBags = 0;
                var superPolyBags = 0;
                angular.forEach(this.data.greenLeaveWeighDetails, function (value, key) {
                    if (value.type === 'NORMAL') {
                        normalTotalWeight = normalTotalWeight + parseFloat(value.quantity);

                        normalCrates = normalCrates + parseInt(value.crates);
                        normalBags = normalBags + parseInt(value.bags);
                        normalPolyBags = normalPolyBags + parseInt(value.polyBags);
                    } else if (value.type === 'SUPER') {
                        superTotalWeight = superTotalWeight + parseFloat(value.quantity);

                        superCrates = superCrates + parseInt(value.crates);
                        superBags = superBags + parseInt(value.bags);
                        superPolyBags = superPolyBags + parseInt(value.polyBags);
                    }
                });

                //general deduction
//                var normalGeneralDeductionPercent = parseFloat(this.data.normalGeneralDeductionPercent);
//                var normalGeneralDeduction = parseInt(normalGeneralDeductionPercent * normalTotalWeight / 100);
//                this.data.normalGeneralDeduction = normalGeneralDeduction;
//
//                var superGeneralDeductionPercent = parseFloat(this.data.superGeneralDeductionPercent);
//                var superGeneralDeduction = parseInt(superGeneralDeductionPercent * superTotalWeight / 100);
//                this.data.superGeneralDeduction = superGeneralDeduction;

                if (this.data.normalGeneralDeduction !== 0) {
                    var normalGeneralDeduction = parseFloat(this.data.normalGeneralDeduction);
                    var normalGeneralDeductionPercent = parseInt(normalGeneralDeduction * 100 / normalTotalWeight);
                    this.data.normalGeneralDeductionPercent = normalGeneralDeductionPercent;
                }

                if (this.data.superGeneralDeduction !== 0) {
                    var superGeneralDeduction = parseFloat(this.data.superGeneralDeduction);
                    var superGeneralDeductionPercent = parseInt(superGeneralDeduction * 100 / superTotalWeight);
                    this.data.superGeneralDeductionPercent = superGeneralDeductionPercent;
                }

                //net value
                var normalNetWeight = normalTotalWeight
                        - parseFloat(this.data.normalTareDeduction)
                        - parseFloat(this.data.normalGeneralDeduction)
                        - parseFloat(this.data.normalWaterDeduction)
                        - parseFloat(this.data.normalCoarseLeaves)
                        - parseFloat(this.data.normalBoiledLeaves);

                var superNetWeight = superTotalWeight
                        - parseFloat(this.data.superTareDeduction)
                        - parseFloat(this.data.superGeneralDeduction)
                        - parseFloat(this.data.superWaterDeduction)
                        - parseFloat(this.data.superCoarseLeaves)
                        - parseFloat(this.data.superBoiledLeaves);

                this.data.normalTotalWeight = normalTotalWeight;
                this.data.normalNetWeight = normalNetWeight;

                this.data.superTotalWeight = superTotalWeight;
                this.data.superNetWeight = superNetWeight;

                //tare count
                this.data.normalCrates = normalCrates;
                this.data.normalBags = normalBags;
                this.data.normalPolyBags = normalPolyBags;

                this.data.superCrates = superCrates;
                this.data.superBags = superBags;
                this.data.superPolyBags = superPolyBags;
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
            bracnhLable: function (indexNo) {
                var lable;
                angular.forEach(this.branchs, function (value) {
                    if (value.indexNo === indexNo) {
                        lable = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return lable;
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
            searchClientByClientNo: function (clientNumber) {
                var client;
                angular.forEach(this.clients, function (value) {
                    if (value.clientNumber === parseInt(clientNumber)) {
                        client = value;
                        return;
                    }
                });
                return client;
            },
            loadPendingWeigh: function () {
                var defer = $q.defer();
                var that = this;
                SupplierGreenLeavesWeighService.loadPendingWeigh()
                        .success(function (data) {
                            that.pendingGreenLeavesWeigh = data;
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });
            },
            defaultBranch: function () {
                return this.currentBranch;
            },
            confirmWeight: function (indexNo) {
                var that = this;
                SupplierGreenLeavesWeighService.confirmWeigh(indexNo)
                        .success(function () {
                            var id = -1;
                            for (var i = 0; i < that.data.greenLeaveWeighDetails.length; i++) {
                                if (that.data.greenLeaveWeighDetails[i].indexNo === indexNo) {
                                    id = i;
                                }
                            }
                            that.pendingGreenLeavesWeigh.splice(id, 1);
                            that.clear();
                        });
            },
            findByBranchAndDateAndClient: function () {
                var defer = $q.defer();
                var that = this;
                var date = $filter('date')(this.data.date, 'yyyy-MM-dd');
                var branch = this.data.branch;
                var client = this.data.client;
                SupplierGreenLeavesWeighService.findByBranchAndDateAndClient(branch, date, client)
                        .success(function (data) {
                            that.data = SupplierGreenLeavesWeighModelFactory.newData();
                            angular.extend(that.data, data);
                            that.data.route = that.client(data.client).route;
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                            //reset
                            that.data.indexNo = null;
                            that.data.number = null;
                            that.data.status = null;
                            that.data.type = "SUPPLIER";

                            //normal leaves summary
                            that.data.normalTotalWeight = 0.0;
                            that.data.normalTareCalculated = 0.0;
                            that.data.normalTareDeduction = 0.0;
                            that.data.normalGeneralDeductionPercent = 0.0;
                            that.data.normalGeneralDeduction = 0.0;
                            that.data.normalWaterDeduction = 0.0;
                            that.data.normalCoarseLeaves = 0.0;
                            that.data.normalBoiledLeaves = 0.0;
                            that.data.normalNetWeight = 0.0;
                            //normal tare summary
                            that.data.normalCrates = 0;
                            that.data.normalBags = 0;
                            that.data.normalPolyBags = 0;
                            //super leaves summary
                            that.data.superTotalWeight = 0.0;
                            that.data.superTareCalculated = 0.0;
                            that.data.superTareDeduction = 0.0;
                            that.data.superGeneralDeductionPercent = 0.0;
                            that.data.superGeneralDeduction = 0.0;
                            that.data.superWaterDeduction = 0.0;
                            that.data.superCoarseLeaves = 0.0;
                            that.data.superBoiledLeaves = 0.0;
                            that.data.superNetWeight = 0.0;
                            //super tare summary
                            that.data.superCrates = 0;
                            that.data.superBags = 0;
                            that.data.superPolyBags = 0;

                            that.data.greenLeaveWeighDetails = [];
                        });

                return defer.promise;
            },
            findByBranchAndDateAndClientForClientChange: function () {
                var defer = $q.defer();
                var date = $filter('date')(this.data.date, 'yyyy-MM-dd');
                var branch = this.data.branch;
                var client = this.data.client;
                SupplierGreenLeavesWeighService.findByBranchAndDateAndClient(branch, date, client)
                        .success(function (data) {
                            console.log(data);
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            }
        };

        return SupplierGreenLeavesWeighModel;
    };

    angular.module("appModule")
            .factory("SupplierGreenLeavesWeighModel", factory);
}());