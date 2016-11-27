(function () {
    //module
    angular.module("priceSettingModule", []);

    //controller
    angular.module("priceSettingModule")
            .controller("priceSettingController", function ($scope) {

                $scope.ui = {};
                $scope.leafList = [];
                $scope.totalNormalValue = 0.00;
                $scope.totalSuperValue = 0.00;

                $scope.insertNormal = function () {
                    if ($scope.leaf.normalRate & $scope.leaf.superRate) {
                        if ($scope.ui.mode === "EDIT") {
                            $scope.leaf = {};
                        } else {
                            $scope.leafList = [
                                {
                                    indexNo: "00001",
                                    route: "batuwana route",
                                    normalQty: "200",
                                    superQty: "100",
                                    normalRate: "0.00",
                                    superRate: "0.00",
                                    normalValue: "0.00",
                                    superValue: "0.00"

                                },
                                {
                                    indexNo: "00002",
                                    route: "batuwana route",
                                    normalQty: "300",
                                    superQty: "400",
                                    normalRate: "0.00",
                                    superRate: "0.00",
                                    normalValue: "0.00",
                                    superValue: "0.00"

                                },
                                {
                                    indexNo: "00003",
                                    route: "batuwana route",
                                    normalQty: "340",
                                    superQty: "190",
                                    normalRate: "0.00",
                                    superRate: "0.00",
                                    normalValue: "0.00",
                                    superValue: "0.00"

                                }
                            ];
                            for (i = 0; i < $scope.leafList.length; i++) {
                                $scope.leafList[i].normalRate = $scope.leaf.normalRate;
                                $scope.leafList[i].superRate = $scope.leaf.superRate;
                                $scope.leafList[i].normalValue = $scope.leaf.normalRate * $scope.leafList[i].normalQty;
                                $scope.leafList[i].superValue = $scope.leaf.superRate * $scope.leafList[i].superQty;
                            }
//                            
                        }
                    }
                    $scope.getTotalNormalValue();
                    $scope.getTotalSuperValue();
                    $scope.ui.mode = "IDEAL";
                    return $scope.leafList;
                };
                $scope.setTotalValue = function (index) {
                    for (var i = 0; i < $scope.leafList.length; i++) {
                        $scope.leafList[index].normalValue = $scope.leaf.normal;
                        $scope.leafList[index].superValue = $scope.leaf.super;
                    }
                };
                $scope.doEdit = function (list, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.leaf = list;
                };
                $scope.getTotalNormalQty = function () {
                    var totalNormal = 0;
                    for (var i = 0; i < $scope.leafList.length; i++) {
                        var route = $scope.leafList[i];
                        totalNormal += parseFloat(route.normalQty);
                    }
                    return totalNormal;
                };
                $scope.getTotalSuperQty = function () {
                    var totalSuper = 0;
                    for (var i = 0; i < $scope.leafList.length; i++) {
                        var route = $scope.leafList[i];
                        totalSuper += parseFloat(route.superQty);
                    }
                    return totalSuper;
                };
                $scope.getTotalNormalValue = function () {
                    var totalNormalValue = 0;
                    for (var i = 0; i < $scope.leafList.length; i++) {
                        var list = $scope.leafList[i];
                        totalNormalValue += parseFloat(list.normalValue);
                    }
                    $scope.totalNormalValue = totalNormalValue;
                };
                $scope.getTotalSuperValue = function () {
                    var totalSuperValue = 0;
                    for (var i = 0; i < $scope.leafList.length; i++) {
                        var list = $scope.leafList[i];
                        totalSuperValue += parseFloat(list.superValue);
                    }
                    $scope.totalSuperValue = totalSuperValue;
                };
                $scope.doChangeNormal = function (value,leaf) {
                    for (var i = 0; i < $scope.leafList.length; i++) {
                        if ($scope.leafList[i].indexNo === leaf.indexNo) {
                            $scope.leaf.normalValue=leaf.normalRate*leaf.normalQty;
                            
                            $scope.leafList[i]=leaf;
                        }
                    }
                    $scope.getTotalNormalValue();
                };
                $scope.doChangeSuper = function (value,leaf) {
                    for (var i = 0; i < $scope.leafList.length; i++) {
                        if ($scope.leafList[i].indexNo === leaf.indexNo) {
                            $scope.leaf.superValue=leaf.superRate*leaf.superQty;
                            
                            $scope.leafList[i]=leaf;
                        }
                    }
                    $scope.getTotalSuperValue();
                };
            });
}());