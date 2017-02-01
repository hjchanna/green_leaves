(function () {
    var factory = function (SidePanelService, sidePanelFactory) {
        function SidePanelFunctionModel() {
            this.constructor();
        }
        //protoType function
        SidePanelFunctionModel.prototype = {

            teaIssue: [],
//            employee: [],

            constructor: function () {
                var that = this;
                that.data = sidePanelFactory.newData();

                SidePanelService.loadTeaIssue()
                        .success(function (data) {
                            that.teaIssue = data;
                        });
//                SidePanelService.loadEmployee()
//                        .success(function (data){
//                            that.employee = data;
//                        });

            }
        };
        return SidePanelFunctionModel;
    };
    angular.module("sidePanelModule")
            .factory("SidePanelFunctionModel", factory);
}());