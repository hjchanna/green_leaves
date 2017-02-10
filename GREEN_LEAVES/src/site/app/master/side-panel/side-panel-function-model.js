(function () {
    var factory = function (SidePanelService, sidePanelFactory) {
        function SidePanelFunctionModel() {
            this.constructor();
        }
        //protoType function
        SidePanelFunctionModel.prototype = {

            teaIssue: [],
            routOfficers: [],
            routs: [],
            tempdata: [],
            glQty: [],

            constructor: function () {
                var that = this;
                that.data = sidePanelFactory.newData();
                that.tempdata = sidePanelFactory.tempData();

                SidePanelService.loadTeaIssue()
                        .success(function (data) {
                            that.teaIssue = data;
                        });
                SidePanelService.loadRoutOfficer()
                        .success(function (data) {   
                            that.routOfficers = data;
                        });
                SidePanelService.loadRout()
                        .success(function (data) { 
                            that.routs = data;
                        });
//                SidePanelService.loadGreenLeavesQty()
//                        .success(function (data) {
//                            console.log(data);
//                            that.glQty = data;
//                        });
            },
            lordRoutOfficerDetail : function (routeOfficer){
                var that=this;
                var selectedRoute =null;
                angular.forEach(this.routs,function (route){
                    if (route.routeOfficer.indexNo === routeOfficer.indexNo) {
                        selectedRoute=route;
                        return ;
                    }
                });
                
                that.tempdata.routeOfficer=routeOfficer;
                that.tempdata.route=selectedRoute;
//                that.tempdata.greenLeavesQty=this.loadGreenLeavesQty(routeOfficer,selectedRoute);
                
            }
//            loadGreenLeavesQty : function (routeOfficer,selectedRoute){
//                var glValue= 0;
//               angular.forEach(this.glQty,function (weight){
//                    if (weight.routeOfficer === routeOfficer.indexNo) {
//                        if (weight.route ===selectedRoute.indexNo) {
//                            glValue +=  weight.normalTotalWeight;
//                        }
//                        
//                    }
//                });
//                return glValue;
//            }

        };
        return SidePanelFunctionModel;
    };
    angular.module("sidePanelModule")
            .factory("SidePanelFunctionModel", factory);
}());