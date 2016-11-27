(function () {
    angular.module("appModule")
            .controller("GreenLeavesWeighController", function ($scope, $timeout, GreenLeavesWeighModel) {
                $scope.model = new GreenLeavesWeighModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.model.clear();

                    $timeout(function () {
                        document.querySelectorAll("#route")[0].focus();
                    }, 10);
                };

                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";

                    $timeout(function () {
                        document.querySelectorAll("#route")[0].focus();
                    }, 10);
                };

                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };

                $scope.ui.insertNormalDetail = function () {
                    $scope.model.insertNormalDetail()
                            .then(function () {
                                $scope.ui.toggleType("NORMAL");
                            });

                };

                $scope.ui.insertSuperDetail = function () {
                    $scope.model.insertSuperDetail()
                            .then(function () {
                                $scope.ui.toggleType("SUPER");
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
                    $scope.model.clear();
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
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";

                    $scope.model.clear();
                };
                $scope.ui.init();

            });
}());