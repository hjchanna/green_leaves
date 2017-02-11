(function () {
    angular.module("appModule")
            .controller("ClientLoanRequestController", function ($scope, $timeout, $filter, LoanRequestModel) {
                $scope.model = new LoanRequestModel();
                $scope.model.tempClientNo = null;


                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.model.clear();

                    //set current date
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

                    $timeout(function () {
                        document.querySelectorAll("#number")[0].focus();
                    }, 10);
                };

                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";

                    $timeout(function () {
                        document.querySelectorAll("#number")[0].focus();
                    }, 10);
                };

                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };

                $scope.ui.validateClient = function (event) {
                    var key = event ? event.keyCode || event.which : 13;

                    if (key === 13) {
                        var client;

                        angular.forEach($scope.model.clients, function (value) {
                            if (value.clientNumber === $scope.model.tempClientNo) {
                                client = value;
                                return;
                            }
                        });

                        if (typeof client !== 'undefined') {
                            $scope.model.tempData.client = client.indexNo;
                        }

                        if ($scope.model.tempData.client) {
                            $timeout(function () {
                                angular.element(document.querySelectorAll("#amount"))[0].focus();
                            }, 10);
                        } else {
                            $timeout(function () {
                                angular.element(document.querySelectorAll("#client"))[0].focus();
                            }, 10);
                        }
                    }
                };

                $scope.ui.getClient = function (indexNo) {
                    var client;

                    angular.forEach($scope.model.clients, function (value) {
                        if (value.indexNo === indexNo) {
                            client = value;
                            return;
                        }
                    });

                    return client;
                };

                $scope.ui.requestSummary = function () {
                    var sum = 0.0;

                    angular.forEach($scope.model.data.loanRequestDetails, function (value) {
                        sum = sum + value.amount;
                    });

                    return sum;
                };

                $scope.ui.insertLoanRequest = function () {
                    $scope.model.insertLoanRequest()
                            .then(function () {
                                angular.element(document.querySelectorAll("#client-number"))[0].focus();
                            });
                };

                $scope.ui.deleteDetail = function (indexNo) {
                    $scope.model.deleteDetail(indexNo);
                };

                $scope.ui.load = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.model.load()
                                .then(function () {
                                    $scope.ui.mode = "SELECTED";
                                });
                    }
                };

                $scope.ui.save = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.saveRequest();
                    $scope.model.clear();
                };


                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();

                    $scope.$watch("model.tempData.client", function () {
                        var c = $scope.ui.getClient($scope.model.tempData.client);

                        if (c) {
                            $scope.model.tempClientNo = c.clientNumber;
                        } else {
                            $scope.model.tempClientNo = null;
                        }
                    });
                };
                $scope.ui.init();

            });
}());