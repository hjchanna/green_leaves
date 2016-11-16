(function () {
    angular.module("productModule", []);
    angular.module("productModule")
            .factory("productFactory", function ($http, systemConfig) {
                var factory = {};

                // ---------- data loding---------- 
                //load product
                factory.loadProduct = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/product";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load supplier
                factory.loadSupplier = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/supplier";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load subcategory by selected category 
                factory.loadSubCategory = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/sub-category";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load category by selected item department 
                factory.loadCategory = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/category";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load item department
                factory.loadItemDepartment = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/item-departments";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save product
                factory.saveProduct = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/product/save-product";
                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorCallback) {
                                    errorCallback(data);
                                }
                            });
                };

                //delete  product
                factory.deleteProduct = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/product/delete-product/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;
            });
    angular.module("productModule")
            .controller("productController", function ($scope, $timeout, productFactory, Notification) {

                //data model
                $scope.model = {};

                //ui model
                $scope.ui = {};

                //http modal
                $scope.http = {};

                //------------------ model functions ---------------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.data = {};
                };

                //------------------ ui functions ------------------------------

                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $timeout(function () {
                        document.querySelectorAll("#productNo")[0].focus();
                    }, 10);
                };

                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveProduct();
                    } else {
                        Notification.error("Please Input Details");
                    }
                };

                $scope.ui.edit = function (product, index) {
                    $scope.model.data = product;
                    $scope.model.products.splice(index, 1);
                };

                $scope.ui.checkProductsExists = function (text, type) {
                    for (var i = 0; i < $scope.model.products.length; i++) {
                        if (type === "productNo") {
                            if (text === $scope.model.products[i].productNo) {
                                $scope.selectedRow = $scope.model.products[i];
                                Notification.error("this product is alrady exists");
                            }
                        } else if (type === "name") {
                            console.log(text);
                            $scope.model.data.printDescription = text;
                            if (text === $scope.model.products[i].name) {
                                $scope.selectedRow = $scope.model.products[i];
                                Notification.error("this product is alrady exists");
                            }
                        }
                    }
                };

                $scope.ui.tabChnage = function (event) {
                    if (event.keyCode === 13) {
                        $scope.indextab = 1;
                        $timeout(function () {
                            document.querySelectorAll("#unit")[0].focus();
                        }, 10);
                    }
                };

                //validate model
                $scope.validateInput = function () {
                    if ($scope.model.data.name
                            && $scope.model.data.productNo
                            && $scope.model.data.printDescription
                            && $scope.model.data.unit
                            && $scope.model.data.costPrice
                            && $scope.model.data.salePrice
                            && $scope.model.data.itemDepartment
                            && $scope.model.data.category
                            && $scope.model.data.subCategory
                            && $scope.model.data.supplier
                            && $scope.model.data.brand !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };

                $scope.ui.delete = function (indexNo) {
                    $scope.http.deleteProduct(indexNo);
                };

                //------------------ http functions ------------------------------

                $scope.http.saveProduct = function () {
                    var detail = $scope.model.data;
                    console.log(detail);
                    var detailJSON = JSON.stringify(detail);
                    productFactory.saveProduct(
                            detailJSON,
                            function (data) {
                                Notification.success("success" + data.indexNo);
                                //reset model
                                $scope.model.products.push(data);
                                $scope.model.reset();
                                $timeout(function () {
                                    document.querySelectorAll("#productNo")[0].focus();
                                }, 10);
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.http.deleteProduct = function (indexNo) {
                    productFactory.deleteProduct(indexNo, function () {
                        var id = -1;
                        for (var i = 0; i < $scope.model.products.length; i++) {
                            if ($scope.model.products[i].indexNo === indexNo) {
                                id = i;
                            }
                        }
                        $scope.model.products.splice(id, 1);
                    });
                };

                //---------- inti fuctions ---------- 
                $scope.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //reset model
                    $scope.model.reset();
                    //loadProduct
                    productFactory.loadProduct(function (data) {
                        $scope.model.products = data;
                    });

                    //loadRoute
                    productFactory.loadSupplier(function (data) {
                        $scope.model.suppliers = data;
                    });

                    productFactory.loadSubCategory(function (data) {
                        $scope.model.subCategorys = data;
                    });

                    productFactory.loadCategory(function (data) {
                        $scope.model.categorys = data;
                    });

                    //loadItemDepartment
                    productFactory.loadItemDepartment(function (data) {
                        $scope.model.itemDepartments = data;
                    });

                };
                $scope.init();
            });
}());

