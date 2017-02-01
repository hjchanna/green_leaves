(function (){
    angular.module("sidePanelModule")
            .factory("sidePanelFactory",function (){
               var factory = {}; 
               factory.newData = function (){
                   var data={
                       "indexNo": null,
                       "branch": null,
                       "number": null,
                       "date": null,
                       "transaction": null,
                       "status": null,
                       "client": null,
                       "teaGrade": null,
                       "officer": null
                   }; 
                   return data;
               };
               factory.tempData = function (){
                   var data={
                       "routeOfficer": null,
                       "route": null,
                       "greenLeavesQty":null
                   }; 
                   return data;
               };
               return factory;
            });
}());