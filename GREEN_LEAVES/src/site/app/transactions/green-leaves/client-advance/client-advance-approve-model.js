(function () {
    angular.module("appModule")
            .factory("ClientAdvanceApproveModel", function () {
                function ClientAdvanceApproveModel(data) {
                    if (data) {

                    }
                }

                ClientAdvanceApproveModel.prototype = {
                    setData: function (data) {
                        angular.extend(this, data);
                    }
                };
            });
}());