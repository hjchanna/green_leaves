(function () {
    angular.module("appModule")
            .directive("comment", function () {
                return {
                    restrict: 'M',
                    template: '<textarea class="comment"></textarea>'
                };
            });
//            .directive("limitTo", function (ValidationService) {
//                    return {
//                        restrict: "A",
//                        link: ValidationService.validation
//                    };
//                });

//    angular.module("appModule")
//            .service("ValidationService", function () {
//                this.validation = function(scope, element, attrs){
//                    console.log(scope);
//                    console.log(element);
//                    console.log(attrs);
//                };
//            });
});
