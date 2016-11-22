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
            .controller("fertilizerController", function ($scope, $timeout, fertilizerFactory) {
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
                    console.log($scope.model.tempData);
                    $scope.model.data.detail.push($scope.model.tempData);
                    $scope.model.tempData = {};
                    $scope.ui.getTotal();
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

                $scope.ui.init = function () {
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