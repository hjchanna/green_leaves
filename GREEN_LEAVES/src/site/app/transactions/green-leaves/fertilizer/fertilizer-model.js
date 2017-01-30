(function () {
    var factory = function (FertilizerService) {
        function FertilizerModel() {
            this.constructor();
        }

        //prototype functions
        FertilizerModel.prototype = {
            //fertilizer data
            data: {},
            //temp input
            tempData: {},
            //clients information
            clients: [],
            //products information
            produts: [],
            //constructor
            constructor: function () {
                var that = this;
                //load products
                FertilizerService.loadProducts()
                        .success(function (data) {
                            that.clients = data;
                        });
                //load clients
                FertilizerService.loadClients()
                        .success(function (data) {
                            that.produts = data;
                        });
            }
        };

        return FertilizerModel;
    };

    angular.module("appModule")
            .factory("FertilizerModel", factory);
}());