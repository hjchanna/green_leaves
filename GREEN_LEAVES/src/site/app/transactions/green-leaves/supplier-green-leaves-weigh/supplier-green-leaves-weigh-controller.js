(function () {
    angular.module("appModule")
            .controller("SupplierGreenLeavesWeighController", function ($scope, $filter, optionPane, $timeout, SupplierGreenLeavesWeighModel, Notification, ConfirmPane, InputPane) {
                $scope.model = new SupplierGreenLeavesWeighModel();
                $scope.ui = {};
                $scope.ui.insertProcessing = false;//Douple click duplicate bug fix
                $scope.ui.clientType = "CLIENT";

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.model.clear();

                    //set current date
                    var newDate = new Date();
                    newDate.setDate(newDate.getDate() - 1);
                    $scope.model.data.date = $filter('date')(newDate, 'yyyy-MM-dd');

                    //set default branch
                    $scope.model.data.branch = $scope.model.defaultBranch();
                    $timeout(function () {
                        document.querySelectorAll("#client")[0].focus();
                    }, 10);
                };

                //client search client number
                $scope.ui.searchClient = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        var searchClient = $scope.model.searchClientByClientNo($scope.model.data.searchClient);
                        if (angular.isUndefined(searchClient)) {
                            $scope.model.data.client = null;
                            Notification.error("Client cannot find by number. Please try by name instead.");
                        } else {
                            $scope.model.data.client = searchClient.indexNo;
                            $scope.model.data.route = searchClient.route;
                            $timeout(function () {
                                document.querySelectorAll("#normal-qty")[0].focus();
                            }, 10);
                        }
                        $scope.ui.clientType = "CLIENT";
                    }
                };

                //delete green weigh
                $scope.ui.delete = function () {
                    ConfirmPane.dangerConfirm("Do you sure want to delete current green leave weigh?")
                            .confirm(function () {
                                $scope.model.deleteGreenLavesWeigh();
                                $scope.ui.mode = "IDEAL";
                                $scope.ui.type = "NORMAL";
                            });
                };

                //check customer new customer or exists customer
                $scope.ui.checkCustomer = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        var client = $scope.model.client($scope.model.data.client);
                        if (angular.isUndefined(client)) {
                            ConfirmPane.primaryConfirm("You have selected an invalid client. Do you want to select a temporary client instead?")
                                    .confirm(function () {
                                        InputPane.primaryInput("Please enter a temporary client")
                                                .confirm(function (data) {
                                                    if (!angular.isUndefined(data)) {
                                                        $scope.ui.clientType = "TEMP_CLIENT";
                                                        $scope.model.data.tempClient = data;
                                                        $scope.model.data.client = null;

                                                        $timeout(function () {
                                                            document.querySelectorAll("#normal-qty")[0].focus();
                                                        }, 10);
                                                    }
                                                });
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

                $scope.ui.validateDetail = function () {
                    var result = {};
                    if (!$scope.model.data.date) {
                        result.message = "Please enter a valid date.";
                    } else if (!$scope.model.data.client && !$scope.model.data.tempClient) {
                        result.message = "Please select a valid client.";
                    } else if (!$scope.model.tempData.quantity && $scope.model.tempData.quantity <= 0) {
                        result.message = "Please enter a valid green leaves quantity.";
                    } else if ($scope.model.tempData.crates
                            + $scope.model.tempData.bags
                            + $scope.model.tempData.polyBags <= 0) {
                        result.message = "Please enter a valid tare count.";
                    } else {
                        result.valid = true;
                    }

                    if (!result.valid) {
                        result.valid = false;
                    }

                    return result;
                };

                $scope.ui.insertNormalDetail = function () {
                    var validationResult = $scope.ui.validateDetail();

                    if (!validationResult.valid) {
                        Notification.error(validationResult.message);
                    } else {
                        if (!$scope.ui.insertProcessing) {
                            $scope.ui.insertProcessing = true;
                            $scope.model.insertNormalDetail()
                                    .then(function () {
                                        $scope.ui.toggleType("NORMAL");
                                        $scope.ui.insertProcessing = false;
                                    }, function () {
                                        $scope.ui.insertProcessing = false;
                                    });
                        }
                    }
                };

                $scope.ui.insertSuperDetail = function () {
                    var validationResult = $scope.ui.validateDetail();

                    if (!validationResult.valid) {
                        Notification.error(validationResult.message);
                    } else {
                        if (!$scope.ui.insertProcessing) {
                            $scope.ui.insertProcessing = true;
                            $scope.model.insertSuperDetail()
                                    .then(function () {
                                        $scope.ui.toggleType("SUPER");
                                        $scope.ui.insertProcessing = false;
                                    }, function () {
                                        $scope.ui.insertProcessing = false;
                                    });
                        }
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
                        var number = $scope.model.data.number;
                        $scope.model.load()
                                .then(function () {
                                    $scope.ui.mode = "SELECTED";
                                    if ($scope.model.data.client) {
                                        $scope.ui.clientType = "CLIENT";
                                    } else {
                                        $scope.ui.clientType = "TEMP_CLIENT";
                                    }
                                }, function () {
                                    if (number) {
                                        Notification.error("Supplier weigh cannot be found at " + number + ".");
                                    } else {
                                        Notification.error("Please enter a valid number.");
                                    }
                                });
                    }
                };

//                var tempIndexSave = 0;

                //pending request  selected rows - load weight
                $scope.ui.switchPendingWeight = function (greenLeavesWeight) {
                    $scope.model.switchWeight(greenLeavesWeight);
                    $scope.ui.toggleType('NORMAL');
                    $scope.ui.mode = "SELECTED";
                };

                $scope.ui.confirm = function () {
                    $scope.model.confirmWeight($scope.model.data.indexNo);
                    optionPane.successMessage("Green leaves weigh successfully approved !");
                    //reset view to defauts
                    $scope.ui.discard();
                };

                //view pending weigh by branch
                $scope.ui.getPendingGreenLeavesWeigh = function () {
                    $scope.model.loadPendingWeigh($scope.model.data.branch);
                };

                $scope.ui.save = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                    $scope.ui.clientType = "CLIENT";
                };

                $scope.ui.toggleType = function (type) {
                    $scope.ui.type = type;
                    if (type === 'NORMAL') {
                        $timeout(function () {
                            $scope.indextab = 0;
                            document.querySelectorAll("#normal-qty")[0].focus();
                        }, 10);
                    } else if (type === 'SUPER') {
                        $timeout(function () {
                            $scope.indextab = 1;
                            document.querySelectorAll("#super-qty")[0].focus();
                        }, 10);
                    }
                };

                $scope.ui.init = function () {
                    $scope.ui.clientType = "CLIENT";
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";
                    $scope.model.clear();

                    $scope.$watch("[model.data.normalTareDeduction, model.data.normalGeneralDeduction, model.data.normalWaterDeduction, model.data.normalCoarseLeaves, model.data.normalBoiledLeaves]", function (newVal, oldVal) {
                        $scope.model.validate();
                    }, true);

                    $scope.$watch("[model.data.superTareDeduction, model.data.superGeneralDeduction, model.data.superWaterDeduction, model.data.superCoarseLeaves, model.data.superBoiledLeaves]", function (newVal, oldVal) {
                        $scope.model.validate();
                    }, true);

                    $scope.$watch("[model.data.normalTareDeduction, model.data.normalGeneralDeduction, model.data.normalWaterDeduction, model.data.normalCoarseLeaves, model.data.normalBoiledLeaves, model.data.superTareDeduction, model.data.superGeneralDeduction, model.data.superWaterDeduction, model.data.superCoarseLeaves, model.data.superBoiledLeaves,model.data.greenLeaveWeighDetails.length, model.data.date, model.data.client, model.data.tempClient]", function (newVal, oldVal) {
                        if ($scope.model.data.greenLeaveWeighDetails.length > 0) {
                            $scope.model.saveWeight();
                        }
                    }, true);

                    $scope.$watch("model.data.client", function (newValue, oldValue) {
                        if ($scope.model.data.client) {
                            var client = $scope.model.client($scope.model.data.client);
                            $scope.model.data.searchClient = client.clientNumber;
                            $scope.model.data.tempClient = null;
                        }
                    });
                };
                $scope.ui.init();

            });
}());