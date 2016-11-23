(function () {
    //module
    angular.module("fertilizerModule", []);
    angular.module("fertilizerModule")
            .factory("fertilizerFactory", function ($http, systemConfig) {
                var factory = {};

                factory.loadProduct = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/product";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                factory.loadCustomer = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/clients";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;

            });

    //controller
    angular.module("fertilizerModule")
            .controller("fertilizerController", function ($scope, $timeout, $filter, fertilizerFactory, Notification) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                //------------------ model functions ---------------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.data = {
                        "from": null,
                        "to": null,
                        "date": null,
                        "number": null,
                        "customer": null,
                        "detail": []
                    };

                    $scope.model.tempData = {
                        "item": null,
                        "account": null,
                        "price": null,
                        "qty": 0,
                        "discount": 0,
                        "amount": null
                    };
                };

                //focus
                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#category")[0].focus();
                    }, 10);
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.ui.focus();
                };

                //edit funtion
                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.ui.focus();
                };

                //insert funtion
                $scope.ui.insertData = function () {
                    if ($scope.validateInput()) {
                        $scope.model.data.detail.push($scope.model.tempData);
                        $scope.model.tempData = {};
                        $scope.ui.getTotal();
                    } else {
                        Notification.error("please input all");
                    }
                };

                //edit funtion
                $scope.ui.editData = function (detail, $index) {
                    $scope.model.tempData = detail;
                    $scope.model.data.detail.splice($index, 1);
                    $scope.ui.getTotal();
                };
                //edit funtion
                $scope.ui.deleteData = function ($index) {
                    $scope.model.data.detail.splice($index, 1);
                    $scope.ui.getTotal();
                };

                //get total
                $scope.ui.getTotal = function () {
                    var total = 0;
                    for (var i = 0; i < $scope.model.data.detail.length; i++) {
                        total += parseInt($scope.model.data.detail[i].amount);
                    }
                    return total;
                };

                //get total amount
                $scope.ui.getAmount = function () {
                    var qty = $scope.model.tempData.qty;
                    var price = $scope.model.tempData.price;
                    var discount = $scope.model.tempData.discount;
                    var amount = parseInt(price * qty * discount / 100);
                    $scope.model.tempData.amount = amount;
                };

                $scope.validateInput = function () {
                    if ($scope.model.tempData.item
                            && $scope.model.tempData.account
                            && $scope.model.tempData.price
                            && $scope.model.tempData.qty
                            && $scope.model.tempData.discount
                            && $scope.model.tempData.amount) {
                        return true;
                    } else {
                        return false;
                    }
                };

                $scope.ui.init = function () {

//                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
//                    console.log($scope.model.data.date);

                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    $scope.model.reset();

                    //loadProduct
                    fertilizerFactory.loadProduct(function (data) {
                        $scope.model.products = data;
                    });

                    //loadCustomer
                    fertilizerFactory.loadCustomer(function (data) {
                        $scope.model.clients = data;
                    });

                };

                $scope.ui.init();

            });
}());