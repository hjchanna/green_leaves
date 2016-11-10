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

                //load category
                factory.loadCategory = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/category";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load subcategory by selected category 
                factory.loadSubCategoryByCategory = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/sub-category/get-sub-category";
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
            .controller("productController", function ($scope, productFactory, Notification) {

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
                };

                $scope.ui.save = function () {
                    $scope.http.saveProduct();
                };

                $scope.ui.edit = function (product, index) {
                    $scope.model.data = product;
                    $scope.model.products.splice(index, 1);
                };

                $scope.ui.delete = function (indexNo) {
                    $scope.http.deleteProduct(indexNo);
                };

                $scope.ui.getSubCategory = function (model) {
                    var detailJSON = JSON.stringify(model);
                    productFactory.loadSubCategoryByCategory(
                            detailJSON,
                            function (data) {
                                $scope.model.subCategorys = data;
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                //------------------ http functions ------------------------------

                $scope.http.saveProduct = function () {
                    var detail = $scope.model.data;
                    console.log(detail);
                    var detailJSON = JSON.stringify(detail);
                    productFactory.saveProduct(
                            detailJSON,
                            function (data) {
                                Notification.success("success");
                                //reset model
                                $scope.model.products.push(data);
                                $scope.model.reset();
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
                    //loadUnit
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

