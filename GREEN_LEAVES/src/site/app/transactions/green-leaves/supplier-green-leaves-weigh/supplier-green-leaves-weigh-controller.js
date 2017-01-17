(function () {
    angular.module("appModule")
            .controller("SupplierGreenLeavesWeighController", function ($scope, $filter, optionPane, $timeout, SupplierGreenLeavesWeighModel, Notification, ConfirmPane, InputPane) {
                $scope.model = new SupplierGreenLeavesWeighModel();
                $scope.ui = {};
                $scope.ui.insertProcessing = false;//Douple click duplicate bug fix

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.model.clear();

                    //set current date
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

                    //set default branch
                    $scope.model.data.branch = $scope.model.defaultBranch().indexNo;
                    $timeout(function () {
                        document.querySelectorAll("#branch")[0].focus();
                    }, 10);
                };

                //client search client number
                $scope.ui.searchClient = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        var searchClient = $scope.model.searchClientByClientNo($scope.model.data.searchClient);
                        if (angular.isUndefined(searchClient)) {
                            $scope.model.data.client = null;
                            Notification.error("client not found!");
                        } else {
                            var client = $scope.model.client(searchClient.indexNo);
                            $scope.model.data.client = client.indexNo;
                            $timeout(function () {
                                document.querySelectorAll("#normal-qty")[0].focus();
                            }, 10);
                        }
                    }
                };

                //delete green weigh
                $scope.ui.delete = function () {
                    ConfirmPane.dangerConfirm("Delete Green Leaves Weigh")
                            .confirm(function () {
                                $scope.model.deleteGreenLavesWeigh();
                                $scope.ui.mode = "IDEAL";
                                $scope.ui.type = "NORMAL";
                            })
                            .discard(function () {
                                console.log("REJECT");
                            });

                };

                //check customer new customer or exists customer
                $scope.ui.checkCustomer = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        var client = $scope.model.client($scope.model.data.client);
                        if (angular.isUndefined(client)) {
                            ConfirmPane.primaryConfirm("Client Not Found And Add New Client")
                                    .confirm(function () {
                                        InputPane.primaryInput("Input Client Name")
                                                .confirm(function (data) {
                                                    if (angular.isUndefined(data)) {
                                                    } else {
                                                        $scope.ui.existClient = false;
                                                        $scope.ui.newClient = true;
                                                        $scope.model.data.remark = data;
                                                        $scope.model.data.client = null;
                                                        $timeout(function () {
                                                            document.querySelectorAll("#normal-qty")[0].focus();
                                                        }, 10);
                                                    }
                                                })
                                                .discard(function () {
                                                    console.log("CANCEL");
                                                });
                                    })
                                    .discard(function () {
                                        console.log("REJECT");
                                    });
                        }
                    }
                };

                //edit 
                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";
                    $timeout(function () {
                        document.querySelectorAll("#branch")[0].focus();
                    }, 10);
                };

                //discard
                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };

                $scope.ui.insertNormalDetail = function () {
                    if (!$scope.ui.insertProcessing) {
                        $scope.ui.insertProcessing = true;
                        $scope.model.insertNormalDetail()
                                .then(function () {
                                    $scope.ui.toggleType("NORMAL");
                                    $scope.ui.insertProcessing = false;
                                });
                    }

                };

                $scope.ui.insertSuperDetail = function () {
                    if (!$scope.ui.insertProcessing) {
                        $scope.ui.insertProcessing = true;
                        $scope.model.insertSuperDetail()
                                .then(function () {
                                    $scope.ui.toggleType("SUPER");
                                    $scope.ui.insertProcessing = false;
                                });
                    }
                };


                //delete normal leaves or super leaves selected row tables
                $scope.ui.deleteDetail = function (indexNo) {
                    $scope.model.deleteDetail(indexNo);
                    $timeout(function () {
                        document.querySelectorAll("#normal-qty")[0].focus();
                    }, 10);
                };

                //find green leaves supplier weigh by branch and transaction number 
                $scope.ui.load = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.model.load()
                                .then(function () {
                                    $scope.ui.mode = "SELECTED";
                                });
                    }
                };
                var tempIndexSave = 0;

                //pending request  selected rows - load weight
                $scope.ui.loadWeight = function (greenLeavesWeight) {
                    tempIndexSave = greenLeavesWeight.indexNo;
                    $scope.model.data.number = greenLeavesWeight.number;
                    $scope.indextab = 0;
                    $scope.model.load()
                            .then(function () {
                                $scope.ui.mode = "SELECTED";
                            });
                };

                $scope.ui.confirm = function () {
                    var indexNo = tempIndexSave;
                    $scope.model.confirmWeight(indexNo);
                    optionPane.successMessage("APPROVE");
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";
                    $scope.model.clear();
                    $scope.indextab = 0;
                    tempIndexSave = 0;
                };

                //view pending weigh by branch
                $scope.ui.getPendingGreenLeavesWeigh = function () {
                    if ($scope.ui.mode === "IDEAL" || $scope.ui.model === "NORMAL") {
                        $scope.model.searchGreenLeavesWeight($scope.model.data.branch);
                    }
                };

                $scope.ui.save = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                    $scope.ui.existClient = true;
                    $scope.ui.newClient = false;
                };

                $scope.ui.toggleType = function (type) {
                    $scope.ui.type = type;
                    if (type === 'NORMAL') {
                        $timeout(function () {
                            document.querySelectorAll("#normal-qty")[0].focus();
                        }, 10);
                    } else if (type === 'SUPER') {
                        $timeout(function () {
                            document.querySelectorAll("#super-qty")[0].focus();
                        }, 10);
                    }
                };

                $scope.ui.init = function () {
                    $scope.ui.existClient = true;
                    $scope.ui.newClient = false;
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";
                    $scope.model.clear();

                    $scope.$watch("[model.data.normalTareDeduction, model.data.normalGeneralDeduction, model.data.normalWaterDeduction, model.data.normalCoarseLeaves, model.data.normalBoiledLeaves]", function (newVal, oldVal) {
                        $scope.model.validate();
                    }, true);

                    $scope.$watch("[model.data.superTareDeduction, model.data.superGeneralDeduction, model.data.superWaterDeduction, model.data.superCoarseLeaves, model.data.superBoiledLeaves]", function (newVal, oldVal) {
                        $scope.model.validate();
                    }, true);

                    $scope.$watch("[model.data.normalTareDeduction, model.data.normalGeneralDeduction, model.data.normalWaterDeduction, model.data.normalCoarseLeaves, model.data.normalBoiledLeaves,model.data.superTareDeduction, model.data.superGeneralDeduction, model.data.superWaterDeduction, model.data.superCoarseLeaves, model.data.superBoiledLeaves,model.data.greenLeaveWeighDetails.length]", function (newVal, oldVal) {
                        if ($scope.model.data.greenLeaveWeighDetails.length > 0) {
                            $scope.model.saveWeight();
                        }
                    }, true);

                    $scope.$watch("[model.data.branch,model.data.date,model.data.client,model.data.searchClient]", function (newVal, oldVal) {
                        $scope.model.findByBranchAndDateAndClient();
                    }, true);

                    $scope.$watch("[model.data.client,model.data.searchClient]", function (newVal, oldVal) {
                        var client = $scope.model.client($scope.model.data.client);
                        $scope.model.data.route = client.route;
                    }, true);
                };
                $scope.ui.init();

            });
}());